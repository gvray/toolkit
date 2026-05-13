import { changeExt } from '../src'

describe('changeExt', () => {
  it('replaces an existing extension', () => {
    expect(changeExt('foo.ts', '.js')).toBe('foo.js')
  })

  it('adds an extension when none exists', () => {
    expect(changeExt('foo', 'js')).toBe('foo.js')
  })

  it('throws for invalid input', () => {
    expect(() => changeExt(null as unknown as string, '.js')).toThrow('path and extension must be strings')
  })
})
