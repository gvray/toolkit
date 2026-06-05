import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import type { FunctionMeta } from '../types';

interface Props {
  fn: FunctionMeta;
  isDark: boolean;
  lang: 'zh' | 'en';
  onTryIt: (fn: FunctionMeta) => void;
}

export default function FunctionCard({ fn, isDark, lang, onTryIt }: Props) {
  const [copied, setCopied] = useState(false);

  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        window.clearTimeout(timerRef.current);
      }
    };
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(fn.example);

      setCopied(true);

      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      timerRef.current = window.setTimeout(() => {
        setCopied(false);
      }, 1500);
    } catch (error) {
      console.error('Copy failed:', error);
    }
  };

  return (
    <div
      className={clsx(
        'rounded-xl border flex flex-col gap-2 p-4 transition-colors',
        isDark
          ? 'bg-gray-800 border-gray-700 hover:border-gray-500'
          : 'bg-white border-gray-200 hover:border-gray-400'
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <code
          className={clsx(
            'text-sm font-bold font-mono px-1.5 py-0.5 rounded',
            isDark ? 'bg-blue-900/40 text-blue-300' : 'bg-blue-50 text-blue-700'
          )}
        >
          {fn.name}
        </code>

        {fn.since && (
          <span className={clsx('text-xs shrink-0', isDark ? 'text-gray-500' : 'text-gray-400')}>
            v{fn.since}
          </span>
        )}
      </div>

      {fn.description && (
        <p
          className={clsx(
            'text-xs leading-relaxed line-clamp-2',
            isDark ? 'text-gray-400' : 'text-gray-600'
          )}
        >
          {lang === 'en' && fn.descriptionEn ? fn.descriptionEn : fn.description}
        </p>
      )}

      {fn.example && (
        <div className="relative mt-1 group">
          <pre
            className={clsx(
              'text-xs rounded-lg p-3 h-16 overflow-auto whitespace-pre font-mono leading-relaxed',
              isDark ? 'bg-gray-900 text-gray-300' : 'bg-gray-50 text-gray-700'
            )}
          >
            {fn.example}
          </pre>

          <button
            type="button"
            onClick={handleCopy}
            className={clsx(
              'absolute top-2 right-2 px-2 py-0.5 text-xs rounded opacity-0 transition-opacity group-hover:opacity-100',
              isDark
                ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
            )}
          >
            {copied ? '✓' : 'Copy'}
          </button>
        </div>
      )}

      <button
        type="button"
        onClick={() => onTryIt(fn)}
        className={clsx(
          'mt-auto rounded-lg py-1.5 text-xs font-medium transition-colors',
          isDark
            ? 'bg-blue-700/30 text-blue-300 hover:bg-blue-700/50'
            : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
        )}
      >
        Try it ▶
      </button>
    </div>
  );
}
