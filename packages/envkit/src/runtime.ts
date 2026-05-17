export const isBrowser = (): boolean => typeof window !== 'undefined' && typeof document !== 'undefined'

export const canUseDom = (): boolean => isBrowser() && typeof document.createElement === 'function'

export const isNode = (): boolean =>
  typeof process !== 'undefined' && Boolean(process.versions?.node)

export const isWorker = (): boolean =>
  typeof (globalThis as { importScripts?: () => void }).importScripts === 'function'

export const isSSR = (): boolean => !isBrowser()

export const isDeno = (): boolean => typeof (globalThis as { Deno?: unknown }).Deno !== 'undefined'

export const isBun = (): boolean => typeof (globalThis as { Bun?: unknown }).Bun !== 'undefined'
