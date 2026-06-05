import fs from 'fs'
import path from 'path'
import type { Plugin } from 'vite'

export interface FunctionMeta {
  name: string
  description: string
  descriptionEn?: string
  example: string
  since: string
  category: string
}

export interface KitMeta {
  id: string
  packageName: string
  functions: FunctionMeta[]
}

// Find the raw JSDoc content for a specific named export within a file.
// Handles both single-function files and multi-function files (e.g. color.ts).
function extractRawJSDoc(content: string, fnName: string): string | null {
  // Match JSDoc blocks immediately before any named declaration.
  // `export` is optional so this covers:
  //   export const foo = ...          (named export)
  //   export function foo() {}        (named export)
  //   export default function foo()   (default export with name)
  //   const foo = ...                 (const later default-exported)
  const pairs = [
    ...content.matchAll(
      /\/\*\*([\s\S]*?)\*\/\s*(?:export\s+(?:default\s+)?)?(?:async\s+)?(?:const|function|class)\s+(\w+)/gm,
    ),
  ]
  const match = pairs.find((m) => m[2] === fnName)
  if (match) return match[1]

  // Fallback: if there's only one JSDoc block in the file use it (true single-function files)
  const all = [...content.matchAll(/\/\*\*([\s\S]*?)\*\//gm)]
  if (all.length === 1) return all[0][1]
  return null
}

const CJK_RE = /[一-鿿㐀-䶿]/

function parseRawJSDoc(raw: string): Omit<FunctionMeta, 'name' | 'category'> {
  const lines = raw.split('\n').map((l) => l.replace(/^\s*\*\s?/, '').trimEnd())

  const descLines: string[] = []
  for (const line of lines) {
    if (line.startsWith('@')) break
    descLines.push(line)
  }

  // Split description lines by language: lines with CJK → zh, pure-ASCII → en
  const zhLines = descLines.filter((l) => CJK_RE.test(l))
  const enLines = descLines.filter((l) => l.trim() && !CJK_RE.test(l))

  const description = (zhLines.length ? zhLines : descLines).join(' ').replace(/\s+/g, ' ').trim()
  const descriptionEn: string | undefined = enLines.length
    ? enLines.join(' ').replace(/\s+/g, ' ').trim()
    : undefined

  // Stop only at a @tag that begins a new JSDoc line (` * @word`), not at @ inside strings/emails
  const exampleMatch = raw.match(/@example\s*([\s\S]*?)(?=\n\s*\*\s*@\w|\s*$)/)
  let example = ''
  if (exampleMatch) {
    example = exampleMatch[1]
      .split('\n')
      .map((l) => l.replace(/^\s*\*\s?/, ''))
      .join('\n')
      .trim()
    example = example.replace(/^```(?:typescript|ts)?\n?/, '').replace(/\n?```$/, '').trim()
  }

  const sinceMatch = raw.match(/@since\s+([\d.]+)/)
  const since = sinceMatch ? sinceMatch[1] : ''

  return { description, descriptionEn, example, since }
}

function parseJSDoc(srcFilePath: string, fnName: string): Omit<FunctionMeta, 'name' | 'category'> {
  if (!fs.existsSync(srcFilePath)) return { description: '', example: '', since: '' }
  const content = fs.readFileSync(srcFilePath, 'utf-8')
  const raw = extractRawJSDoc(content, fnName)
  if (!raw) return { description: '', example: '', since: '' }
  return parseRawJSDoc(raw)
}

// Extract exports from a module file (export function X / export const X)
function extractNamedExports(filePath: string): string[] {
  if (!fs.existsSync(filePath)) return []
  const content = fs.readFileSync(filePath, 'utf-8')
  const names: string[] = []
  for (const m of content.matchAll(/^export\s+(?:async\s+)?(?:function|const|class)\s+(\w+)/gm)) {
    // Skip type-only and internal
    if (!m[1].startsWith('_')) names.push(m[1])
  }
  return names
}

// Parse src/index.ts to get { exportName -> sourceFile } map
function parseIndexTs(indexPath: string): Map<string, string> {
  const content = fs.readFileSync(indexPath, 'utf-8')
  const srcDir = path.dirname(indexPath)
  const result = new Map<string, string>()

  for (const line of content.split('\n')) {
    const trimmed = line.trim()
    if (!trimmed.startsWith('export') || trimmed.startsWith('export type')) continue

    // export { default as funcName } from './funcName'
    const defaultAs = trimmed.match(/export\s*\{\s*default\s+as\s+(\w+)\s*\}\s*from\s*['"]\.\/(\S+?)['"]/)
    if (defaultAs) {
      result.set(defaultAs[1], path.join(srcDir, defaultAs[2]))
      continue
    }

    // export * from './module'
    const starFrom = trimmed.match(/export\s*\*\s*from\s*['"]\.\/([\w/]+)['"]/)
    if (starFrom) {
      const modulePath = path.join(srcDir, starFrom[1] + '.ts')
      const names = extractNamedExports(modulePath)
      for (const name of names) {
        result.set(name, path.join(srcDir, starFrom[1]))
      }
    }
  }

  return result
}

// Infer a category from the section comment above the export line
function inferCategory(indexContent: string, fnName: string): string {
  const lines = indexContent.split('\n')
  let currentCategory = 'misc'
  for (const line of lines) {
    const commentMatch = line.match(/\/\/\s*(.+?)\s*\/\s*/)
    if (commentMatch) {
      currentCategory = commentMatch[1].replace(/utilities?/i, '').trim() || currentCategory
    }
    if (line.includes(`as ${fnName}`)) return currentCategory
  }
  return currentCategory
}

function buildManifest(packagesDir: string): KitMeta[] {
  const kits: KitMeta[] = []

  const entries = fs.readdirSync(packagesDir, { withFileTypes: true })
  for (const entry of entries) {
    if (!entry.isDirectory()) continue

    const pkgDir = path.join(packagesDir, entry.name)
    const pkgJsonPath = path.join(pkgDir, 'package.json')
    const indexPath = path.join(pkgDir, 'src', 'index.ts')

    if (!fs.existsSync(pkgJsonPath) || !fs.existsSync(indexPath)) continue

    const pkgJson = JSON.parse(fs.readFileSync(pkgJsonPath, 'utf-8'))
    const packageName: string = pkgJson.name
    const id = entry.name

    const indexContent = fs.readFileSync(indexPath, 'utf-8')
    const exportMap = parseIndexTs(indexPath)

    const functions: FunctionMeta[] = []
    for (const [fnName, srcFileBase] of exportMap) {
      const srcFilePath = srcFileBase + '.ts'
      const jsdoc = parseJSDoc(srcFilePath, fnName)
      const category = inferCategory(indexContent, fnName)
      functions.push({ name: fnName, category, ...jsdoc })
    }

    if (functions.length > 0) {
      kits.push({ id, packageName, functions })
    }
  }

  // Sort kits alphabetically, eskit first
  kits.sort((a, b) => (a.id === 'eskit' ? -1 : b.id === 'eskit' ? 1 : a.id.localeCompare(b.id)))

  return kits
}

const VIRTUAL_ID = 'virtual:kit-manifest'
const RESOLVED = '\0' + VIRTUAL_ID

export function kitManifestPlugin(packagesDir: string): Plugin {
  return {
    name: 'kit-manifest',

    resolveId(id) {
      if (id === VIRTUAL_ID) return RESOLVED
    },

    load(id) {
      if (id !== RESOLVED) return
      const manifest = buildManifest(packagesDir)
      return `export default ${JSON.stringify(manifest)}`
    },

    configureServer(server) {
      // Invalidate on any source change inside packages/
      server.watcher.add(path.resolve(packagesDir, '*/src/**/*.ts'))
      server.watcher.on('change', (file) => {
        if (file.includes(path.sep + 'packages' + path.sep)) {
          const mod = server.moduleGraph.getModuleById(RESOLVED)
          if (mod) server.moduleGraph.invalidateModule(mod)
          server.ws.send({ type: 'full-reload' })
        }
      })
    },
  }
}
