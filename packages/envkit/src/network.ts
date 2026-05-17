import { isBrowser } from './runtime'

export const isOnline = (): boolean => (isBrowser() ? navigator.onLine : true)

export const onOnline = (callback: () => void): (() => void) => {
  if (!isBrowser()) return () => undefined
  window.addEventListener('online', callback)
  return () => window.removeEventListener('online', callback)
}

export const onOffline = (callback: () => void): (() => void) => {
  if (!isBrowser()) return () => undefined
  window.addEventListener('offline', callback)
  return () => window.removeEventListener('offline', callback)
}

export const getConnectionType = (): string => {
  if (!isBrowser()) return 'unknown'
  const connection = (navigator as Navigator & { connection?: { effectiveType?: string } }).connection
  return connection?.effectiveType ?? 'unknown'
}

export const getLanguage = (): string => (isBrowser() ? navigator.language : '')
export const getTimezone = (): string =>
  typeof Intl !== 'undefined' ? Intl.DateTimeFormat().resolvedOptions().timeZone : 'UTC'
export const getDevicePixelRatio = (): number => (isBrowser() ? window.devicePixelRatio : 1)
export const getScreenSize = (): { width: number; height: number } =>
  isBrowser() ? { width: window.screen.width, height: window.screen.height } : { width: 0, height: 0 }
