import { useState, useEffect, useRef } from 'react'
import Editor from '@monaco-editor/react'
import type { FunctionMeta } from '../types'

// Pre-import all kits so eval can access them
import * as eskit from '@gvray/eskit'
import * as domkit from '@gvray/domkit'
import * as mathkit from '@gvray/mathkit'
import * as datekit from '@gvray/datekit'
import * as pathkit from '@gvray/pathkit'
import * as validationkit from '@gvray/validationkit'
import * as colorkit from '@gvray/colorkit'
import * as formatkit from '@gvray/formatkit'
import * as requestkit from '@gvray/requestkit'
import * as adminkit from '@gvray/adminkit'

const JS_RESERVED = new Set([
  'abstract','arguments','await','boolean','break','byte','case','catch','char','class',
  'const','continue','debugger','default','delete','do','double','else','enum','eval',
  'export','extends','false','final','finally','float','for','from','function','goto',
  'if','implements','import','in','instanceof','int','interface','let','long','native',
  'new','null','of','package','private','protected','public','return','short','static',
  'super','switch','synchronized','this','throw','throws','transient','true','try',
  'typeof','undefined','var','void','volatile','while','with','yield',
])

const KIT_EXPORTS: Record<string, Record<string, unknown>> = {
  eskit, domkit, mathkit, datekit, pathkit, validationkit, colorkit, formatkit, requestkit, adminkit,
}

const ALL_FUNCTIONS: Record<string, unknown> = Object.fromEntries(
  Object.entries({
    ...eskit,
    ...domkit,
    ...mathkit,
    ...datekit,
    ...pathkit,
    ...validationkit,
    ...colorkit,
    ...formatkit,
    ...requestkit,
    ...adminkit,
  }).filter(([k]) => !JS_RESERVED.has(k) && /^[a-zA-Z_$][\w$]*$/.test(k))

)

function buildContext(kitId: string): Record<string, unknown> {
  const kitExports = KIT_EXPORTS[kitId]
  if (!kitExports) return ALL_FUNCTIONS
  // Merge all functions, then override with the current kit's exports last
  // so name conflicts (e.g. `invert` in eskit vs colorkit) resolve to the current kit
  return Object.fromEntries(
    Object.entries({ ...ALL_FUNCTIONS, ...kitExports })
      .filter(([k]) => !JS_RESERVED.has(k) && /^[a-zA-Z_$][\w$]*$/.test(k))
  )
}

interface LogLine {
  type: 'log' | 'error' | 'result'
  text: string
}

interface Props {
  fn: FunctionMeta
  kitId: string
  isDark: boolean
  onClose: () => void
}

function smartStringify(value: unknown): string {
  if (value instanceof Date) return `Date(${value.toISOString()})`
  if (value instanceof Map) {
    const entries = [...value.entries()].map(([k, v]) => `${smartStringify(k)} => ${smartStringify(v)}`).join(', ')
    return `Map { ${entries} }`
  }
  if (value instanceof Set) {
    const items = [...value].map(smartStringify).join(', ')
    return `Set { ${items} }`
  }
  if (value instanceof Error) return `${value.name}: ${value.message}`
  if (typeof value === 'function') return `[Function: ${value.name || 'anonymous'}]`
  if (typeof value === 'symbol') return value.toString()
  if (typeof value === 'bigint') return `${value}n`
  try {
    return JSON.stringify(value, null, 2)
  } catch {
    return String(value)
  }
}

function prepareCode(raw: string): string {
  let code = raw
    // Remove code fences
    .replace(/^```[a-z]*\n?/gm, '')
    .replace(/^```\n?/gm, '')
    // `as Type` casts — unambiguously TS, not valid JS
    .replace(/\s+as\s+(?:const|readonly|\w[\w.<>[\]]*)/g, '')
    // new Foo<T>() generics — safe, always followed by (
    .replace(/\bnew\s+(\w+)<[^>()]+>\s*\(/g, 'new $1(')
    // Arrow function param type annotations: (x: string, y: number) => ...
    // Only strip when params look like typed identifiers (no quotes, braces, brackets)
    .replace(/\(([^)]*)\)\s*(=>)/g, (match, params, arrow) => {
      if (!params.includes(':')) return match
      if (/['"`{[]/.test(params)) return match // object/array/string literals — skip
      const cleaned = params.replace(/(\w+)\s*:\s*[\w<>[\]|& ,.]+/g, '$1')
      return `(${cleaned}) ${arrow}`
    })
    // Named function param type annotations: function foo(data: unknown, n: number) {
    .replace(/\b(function\s+\w+\s*)\(([^)]*)\)/g, (match, prefix, params) => {
      if (!params.includes(':')) return match
      const cleaned = params.replace(/(\w+)\??:\s*[\w<>[\]|& ,.]+/g, '$1')
      return `${prefix}(${cleaned})`
    })
    // Variable type annotations: const x: Type = ...
    .replace(/\b(const|let|var)\s+(\w+)\s*:\s*[\w<>[\]|& ,.]+\s*(?==)/g, '$1 $2 ')
    .trim()

  // Auto-wrap bare expression lines in console.log so JSDoc examples produce visible output.
  // e.g. `add(0.1, 0.2) // returns 0.3` → `console.log(add(0.1, 0.2))`
  const lines = code.split('\n')
  code = lines.map((line) => {
    const trimmed = line.trim()
    if (
      !trimmed ||
      trimmed.startsWith('//') ||
      trimmed.startsWith('/*') ||
      trimmed.startsWith('*') ||
      // declarations / control flow / already-logged
      /^(?:const|let|var|function|class|if\b|else\b|for\b|while\b|do\b|switch\b|try\b|catch\b|finally\b|return\b|throw\b|import\b|export\b|console\.|await\s)/.test(trimmed) ||
      // block delimiters or continuations
      /^[{}()[\].?+\-*\/&|,=]/.test(trimmed) ||
      // assignments: x = ..., x.y = ..., x += ...
      /^\w[\w.]*\s*[+\-*/%]?=/.test(trimmed) ||
      // method / function definitions: walk() { or async foo(x) {
      /^(?:async\s+)?\w[\w$]*\s*\([^)]*\)\s*\{/.test(trimmed) ||
      // calls with a block-body callback: each(arr, (v) => { or foo(x, function() {
      /\)\s*(?:=>)?\s*\{/.test(trimmed)
    ) {
      return line
    }
    // Strip trailing line comment and any semicolons before wrapping
    const expr = trimmed.replace(/\s+\/\/.*$/, '').trim().replace(/;$/, '')
    if (!expr || expr.includes(';')) return line // skip multi-statement lines
    const indent = line.match(/^(\s*)/)?.[1] ?? ''
    return `${indent}console.log(${expr})`
  }).join('\n')

  return code
}

export default function Playground({ fn, kitId, isDark, onClose }: Props) {
  const [code, setCode] = useState(fn.example || `// Try ${fn.name} here\n`)
  const [logs, setLogs] = useState<LogLine[]>([])
  const [running, setRunning] = useState(false)
  const runRef = useRef<() => void>(() => {})

  useEffect(() => {
    setCode(fn.example || `// Try ${fn.name} here\n`)
    setLogs([])
  }, [fn])

  const run = async () => {
    setRunning(true)
    const captured: LogLine[] = []
    const fakeConsole = {
      log: (...args: unknown[]) =>
        captured.push({ type: 'log', text: args.map(smartStringify).join(' ') }),
      error: (...args: unknown[]) =>
        captured.push({ type: 'error', text: args.map(String).join(' ') }),
      warn: (...args: unknown[]) =>
        captured.push({ type: 'log', text: args.map(smartStringify).join(' ') }),
      info: (...args: unknown[]) =>
        captured.push({ type: 'log', text: args.map(smartStringify).join(' ') }),
    }

    try {
      const stripped = prepareCode(code)
      const ctx = buildContext(kitId)
      const keys = Object.keys(ctx)
      const vals = Object.values(ctx)
      // Wrap in async IIFE to support await
      // eslint-disable-next-line no-new-func
      const fn = new Function(...keys, 'console', `return (async () => {\n${stripped}\n})()`)
      const result = await fn(...vals, fakeConsole)
      if (result !== undefined) {
        captured.push({ type: 'result', text: smartStringify(result) })
      }
    } catch (err) {
      captured.push({ type: 'error', text: String(err) })
    }

    setLogs(captured)
    setRunning(false)
  }

  // Keep ref in sync so Monaco's onMount command always calls latest run
  runRef.current = run

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-50 flex flex-col border-t shadow-2xl transition-colors ${
        isDark ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-300'
      }`}
      style={{ height: '45vh' }}
    >
      {/* Header */}
      <div
        className={`flex items-center justify-between px-4 py-2 border-b shrink-0 ${
          isDark ? 'border-gray-700' : 'border-gray-200'
        }`}
      >
        <div className="flex items-center gap-2">
          <span className={`text-sm font-medium ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
            Playground —{' '}
            <code className={`font-mono text-xs ${isDark ? 'text-blue-300' : 'text-blue-600'}`}>{fn.name}</code>
          </span>
          <span className={`text-xs ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>⌘↵ to run</span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={run}
            disabled={running}
            className="px-3 py-1 text-xs font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            {running ? '…' : '▶ Run'}
          </button>
          <button
            onClick={() => setLogs([])}
            className={`px-3 py-1 text-xs rounded-lg transition-colors ${
              isDark ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Clear
          </button>
          <button
            onClick={onClose}
            className={`px-3 py-1 text-xs rounded-lg transition-colors ${
              isDark ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            ✕
          </button>
        </div>
      </div>

      {/* Editor + output side by side */}
      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1 overflow-hidden">
          <Editor
            height="100%"
            defaultLanguage="typescript"
            value={code}
            onChange={(v) => setCode(v ?? '')}
            theme={isDark ? 'vs-dark' : 'light'}
            options={{
              minimap: { enabled: false },
              fontSize: 13,
              lineNumbers: 'off',
              scrollBeyondLastLine: false,
              padding: { top: 12, bottom: 12 },
              renderLineHighlight: 'none',
              overviewRulerLanes: 0,
              hideCursorInOverviewRuler: true,
              scrollbar: { vertical: 'hidden', horizontal: 'auto' },
              wordWrap: 'on',
              tabSize: 2,
            }}
            onMount={(editor, monaco) => {
              const globalDecls = Object.keys(buildContext(kitId))
                .map((k) => `declare const ${k}: any;`)
                .join('\n')
              monaco.languages.typescript.typescriptDefaults.addExtraLib(
                globalDecls,
                'ts:globals.d.ts'
              )
              editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
                runRef.current()
              })
            }}
          />
        </div>

        {/* Output panel */}
        <div
          className={`w-96 shrink-0 overflow-y-auto p-3 font-mono text-xs border-l ${
            isDark ? 'bg-gray-950 border-gray-700' : 'bg-gray-50 border-gray-200'
          }`}
        >
          {logs.length === 0 ? (
            <span className={isDark ? 'text-gray-600' : 'text-gray-400'}>Press ▶ Run or ⌘↵ to execute…</span>
          ) : (
            logs.map((line, i) => (
              <div
                key={i}
                className={`mb-1.5 whitespace-pre-wrap break-all leading-relaxed ${
                  line.type === 'error'
                    ? 'text-red-400'
                    : line.type === 'result'
                    ? isDark
                      ? 'text-green-400'
                      : 'text-green-700'
                    : isDark
                    ? 'text-gray-300'
                    : 'text-gray-700'
                }`}
              >
                {line.type === 'result' ? `→ ${line.text}` : line.text}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
