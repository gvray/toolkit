import { nameWithoutExt } from '../src'

describe('nameWithoutExt', () => {
  it('returns a file name without the final extension', () => {
    expect(nameWithoutExt('foo.min.js')).toBe('foo.min')
  })

  it('returns the file name when there is no extension', () => {
    expect(nameWithoutExt('/a/b/foo')).toBe('foo')
  })
})
