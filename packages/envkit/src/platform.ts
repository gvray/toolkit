import { isBrowser } from './runtime'

export const getPlatform = (): string => {
  if (!isBrowser()) return 'Unknown'
  const ua = navigator.userAgent
  if (/iPhone|iPad|iPod/i.test(ua)) return 'iOS'
  if (/Android/i.test(ua)) return 'Android'
  if (/Mac OS X/i.test(ua)) return 'MacOS'
  if (/Windows/i.test(ua)) return 'Windows'
  if (/Linux/i.test(ua)) return 'Linux'
  return 'Unknown'
}

export const isMobile = (): boolean => /Mobi|Android|iPhone/i.test(navigator.userAgent)
export const isTablet = (): boolean => /iPad|Tablet/i.test(navigator.userAgent)
export const isDesktop = (): boolean => isBrowser() && !isMobile() && !isTablet()
export const isTouchDevice = (): boolean => isBrowser() && ('ontouchstart' in window || navigator.maxTouchPoints > 0)
export const isMac = (): boolean => getPlatform() === 'MacOS'
export const isWindows = (): boolean => getPlatform() === 'Windows'
export const isIOS = (): boolean => getPlatform() === 'iOS'
export const isAndroid = (): boolean => getPlatform() === 'Android'
