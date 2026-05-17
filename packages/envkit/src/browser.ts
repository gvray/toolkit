import { isBrowser } from './runtime'

export const getBrowser = (): string => {
  if (!isBrowser()) return 'Unknown'
  const ua = navigator.userAgent
  if (ua.includes('Edg/')) return 'Edge'
  if (ua.includes('Chrome/')) return 'Chrome'
  if (ua.includes('Firefox/')) return 'Firefox'
  if (ua.includes('Safari/') && !ua.includes('Chrome/')) return 'Safari'
  return 'Unknown'
}

export const getBrowserVersion = (): string => {
  if (!isBrowser()) return ''
  const match = navigator.userAgent.match(/(Chrome|Firefox|Version|Edg)\/([\d.]+)/)
  return match?.[2] ?? ''
}

export const isChrome = (): boolean => getBrowser() === 'Chrome'
export const isFirefox = (): boolean => getBrowser() === 'Firefox'
export const isSafari = (): boolean => getBrowser() === 'Safari'
export const isEdge = (): boolean => getBrowser() === 'Edge'
