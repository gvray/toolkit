const ALPHABET = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_'

/**
 * UUID v4.
 */
export function uuid(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID()
  }
  const bytes = randomBytes(16)
  bytes[6] = (bytes[6] & 0x0f) | 0x40
  bytes[8] = (bytes[8] & 0x3f) | 0x80
  const hex = [...bytes].map((b) => b.toString(16).padStart(2, '0')).join('')
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`
}

/**
 * UUID v7 time-ordered id (simplified).
 */
export function uuidV7(): string {
  const now = Date.now()
  const bytes = randomBytes(10)
  const time = now.toString(16).padStart(12, '0')
  const tail = [...bytes].map((b) => b.toString(16).padStart(2, '0')).join('')
  return `${time.slice(0, 8)}-${time.slice(8, 12)}-7${tail.slice(0, 3)}-${tail.slice(3, 7)}-${tail.slice(7, 19)}`
}

export function randomBytes(length: number): Uint8Array {
  const arr = new Uint8Array(length)
  if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
    crypto.getRandomValues(arr)
    return arr
  }
  for (let i = 0; i < length; i++) arr[i] = Math.floor(Math.random() * 256)
  return arr
}

export function nanoid(size = 21): string {
  const bytes = randomBytes(size)
  let id = ''
  for (let i = 0; i < size; i++) {
    id += ALPHABET[bytes[i] % ALPHABET.length]
  }
  return id
}

export function randomToken(bytes = 16): string {
  return [...randomBytes(bytes)].map((b) => b.toString(16).padStart(2, '0')).join('')
}
