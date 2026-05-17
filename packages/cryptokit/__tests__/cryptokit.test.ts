import {
  base64Decode,
  base64Encode,
  base64UrlDecode,
  base64UrlEncode,
  hashObject,
  hexDecode,
  hexEncode,
  hmacSha256,
  md5,
  nanoid,
  randomBytes,
  randomToken,
  sha256,
  sha512,
  uuid,
  uuidV7
} from '../src'

describe('cryptokit', () => {
  it('generates ids', () => {
    expect(uuid()).toMatch(/^[0-9a-f-]{36}$/i)
    expect(uuidV7()).toMatch(/^[0-9a-f-]{36}$/i)
    expect(nanoid(8)).toHaveLength(8)
    expect(randomToken(4)).toHaveLength(8)
    expect(randomBytes(4)).toHaveLength(4)
  })

  it('hashes', async () => {
    expect(md5('hello')).toHaveLength(32)
    expect(await sha256('hello')).toHaveLength(64)
    expect(await sha512('hello')).toHaveLength(128)
    expect(await hmacSha256('msg', 'secret')).toHaveLength(64)
    expect(await hashObject({ a: 1 })).toHaveLength(64)
  })

  it('encodings', () => {
    const encoded = base64Encode('hello')
    expect(base64Decode(encoded)).toBe('hello')
    const url = base64UrlEncode('hello')
    expect(base64UrlDecode(url)).toBe('hello')
    expect(hexEncode('hi')).toBe('6869')
    expect(hexDecode('6869')).toBe('hi')
  })
})
