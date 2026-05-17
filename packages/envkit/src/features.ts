import { isBrowser } from './runtime'

export async function supportsWebP(): Promise<boolean> {
  if (!isBrowser()) return false
  return new Promise((resolve) => {
    const image = new Image()
    image.onload = () => resolve(image.width === 1)
    image.onerror = () => resolve(false)
    image.src = 'data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEAAQAcJaQAA3AA/vuUAAA='
  })
}

export const supportsWorker = (): boolean => typeof Worker !== 'undefined'

export const supportsWebGL = (): boolean => {
  if (!isBrowser()) return false
  try {
    const canvas = document.createElement('canvas')
    return Boolean(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
  } catch {
    return false
  }
}

export const supportsServiceWorker = (): boolean => 'serviceWorker' in navigator
export const supportsIndexedDB = (): boolean => typeof indexedDB !== 'undefined'
