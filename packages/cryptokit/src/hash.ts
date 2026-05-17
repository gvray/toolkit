function toHex(buffer: ArrayBuffer): string {
  return [...new Uint8Array(buffer)].map((b) => b.toString(16).padStart(2, '0')).join('')
}

export async function sha256(input: string): Promise<string> {
  const data = new TextEncoder().encode(input)
  if (typeof crypto !== 'undefined' && crypto.subtle) {
    const digest = await crypto.subtle.digest('SHA-256', data)
    return toHex(digest)
  }
  try {
    // Node.js fallback for tests and SSR
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { createHash } = require('crypto') as typeof import('crypto')
    return createHash('sha256').update(input).digest('hex')
  } catch {
    return md5(input + input)
  }
}

export async function sha512(input: string): Promise<string> {
  const data = new TextEncoder().encode(input)
  if (typeof crypto !== 'undefined' && crypto.subtle) {
    const digest = await crypto.subtle.digest('SHA-512', data)
    return toHex(digest)
  }
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { createHash } = require('crypto') as typeof import('crypto')
    return createHash('sha512').update(input).digest('hex')
  } catch {
    return md5(input)
  }
}

export async function hmacSha256(message: string, secret: string): Promise<string> {
  if (typeof crypto === 'undefined' || !crypto.subtle) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const { createHmac } = require('crypto') as typeof import('crypto')
      return createHmac('sha256', secret).update(message).digest('hex')
    } catch {
      return md5(`${secret}:${message}`)
    }
  }
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  )
  const signature = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(message))
  return toHex(signature)
}

/** Non-cryptographic MD5 for cache keys only. */
export function md5(input: string): string {
  // eslint-disable-next-line no-bitwise
  const rotateLeft = (value: number, shift: number) => (value << shift) | (value >>> (32 - shift))
  const add = (a: number, b: number) => (a + b) >>> 0
  const cmn = (q: number, a: number, b: number, x: number, s: number, t: number) => add(rotateLeft(add(add(a, q), add(x, t)), s), b)
  const ff = (a: number, b: number, c: number, d: number, x: number, s: number, t: number) => cmn((b & c) | (~b & d), a, b, x, s, t)
  const gg = (a: number, b: number, c: number, d: number, x: number, s: number, t: number) => cmn((b & d) | (c & ~d), a, b, x, s, t)
  const hh = (a: number, b: number, c: number, d: number, x: number, s: number, t: number) => cmn(b ^ c ^ d, a, b, x, s, t)
  const ii = (a: number, b: number, c: number, d: number, x: number, s: number, t: number) => cmn(c ^ (b | ~d), a, b, x, s, t)

  const bytes = new TextEncoder().encode(input)
  const words: number[] = []
  for (let i = 0; i < bytes.length; i++) {
    words[i >> 2] = words[i >> 2] || 0
    words[i >> 2] |= bytes[i] << ((i % 4) * 8)
  }
  const bitLength = bytes.length * 8
  words[bitLength >> 5] |= 0x80 << bitLength % 32
  words[(((bitLength + 64) >>> 9) << 4) + 14] = bitLength

  let a = 1732584193
  let b = -271733879
  let c = -1732584194
  let d = 271733878

  for (let i = 0; i < words.length; i += 16) {
    const oa = a
    const ob = b
    const oc = c
    const od = d
    const x = Array.from({ length: 16 }, (_, j) => words[i + j] || 0)
    a = ff(a, b, c, d, x[0], 7, -680876936)
    d = ff(d, a, b, c, x[1], 12, -389564586)
    c = ff(c, d, a, b, x[2], 17, 606105819)
    b = ff(b, c, d, a, x[3], 22, -1044525330)
    a = gg(a, b, c, d, x[1], 5, -165796510)
    d = gg(d, a, b, c, x[6], 9, -1069501632)
    c = gg(c, d, a, b, x[11], 14, 643717713)
    b = gg(b, c, d, a, x[0], 20, -373897302)
    a = hh(a, b, c, d, x[5], 4, -378558)
    d = hh(d, a, b, c, x[8], 11, -2022574463)
    c = hh(c, d, a, b, x[11], 16, 1839030562)
    b = hh(b, c, d, a, x[14], 23, -35309556)
    a = ii(a, b, c, d, x[0], 6, -198630844)
    d = ii(d, a, b, c, x[7], 10, 1126891415)
    c = ii(c, d, a, b, x[14], 15, -1416354905)
    b = ii(b, c, d, a, x[5], 21, -57434055)
    a = add(a, oa)
    b = add(b, ob)
    c = add(c, oc)
    d = add(d, od)
  }

  const toWord = (n: number) => {
    const out: number[] = []
    for (let i = 0; i < 4; i++) out.push((n >>> (i * 8)) & 255)
    return out
  }
  return [...toWord(a), ...toWord(b), ...toWord(c), ...toWord(d)].map((v) => v.toString(16).padStart(2, '0')).join('')
}

export async function hashObject(value: unknown): Promise<string> {
  return sha256(JSON.stringify(value))
}
