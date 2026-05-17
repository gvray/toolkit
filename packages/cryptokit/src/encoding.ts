export const base64Encode = (input: string): string => {
  if (typeof Buffer !== 'undefined') return Buffer.from(input, 'utf8').toString('base64')
  return btoa(input)
}

export const base64Decode = (input: string): string => {
  if (typeof Buffer !== 'undefined') return Buffer.from(input, 'base64').toString('utf8')
  return atob(input)
}

export const base64UrlEncode = (input: string): string => base64Encode(input).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '')
export const base64UrlDecode = (input: string): string => {
  const padded = input.replace(/-/g, '+').replace(/_/g, '/')
  const pad = padded.length % 4 === 0 ? padded : padded + '='.repeat(4 - (padded.length % 4))
  return base64Decode(pad)
}

export const hexEncode = (input: string): string =>
  [...new TextEncoder().encode(input)].map((b) => b.toString(16).padStart(2, '0')).join('')

export const hexDecode = (hex: string): string => {
  const bytes = hex.match(/.{1,2}/g)?.map((part) => parseInt(part, 16)) ?? []
  return new TextDecoder().decode(new Uint8Array(bytes))
}
