import isString from '../src/is-string'

describe('isString', () => {
  test('should return true for strings', () => {
    expect(isString('')).toBe(true)
    expect(isString('hello')).toBe(true)
    expect(isString(String('world'))).toBe(true)
    expect(isString(new String('test'))).toBe(true)
  })

  test('should return false for non-strings', () => {
    expect(isString(null)).toBe(false)
    expect(isString(undefined)).toBe(false)
    expect(isString(123)).toBe(false)
    expect(isString(true)).toBe(false)
    expect(isString({})).toBe(false)
    expect(isString([])).toBe(false)
    expect(isString(() => {})).toBe(false)
    expect(isString(Symbol('test'))).toBe(false)
  })

  test('should handle edge cases', () => {
    expect(isString(`template literal`)).toBe(true)
    expect(isString(String.fromCharCode(0))).toBe(true)
    expect(isString('🎉')).toBe(true)
  })
})
