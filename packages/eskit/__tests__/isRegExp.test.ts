import isRegExp from '../src/is-reg-exp'

describe('isRegExp', () => {
  test('should return true for RegExp literals', () => {
    expect(isRegExp(/test/)).toBe(true)
    expect(isRegExp(/test/g)).toBe(true)
    expect(isRegExp(/test/i)).toBe(true)
    expect(isRegExp(/test/m)).toBe(true)
    expect(isRegExp(/test/u)).toBe(true)
    expect(isRegExp(/test/y)).toBe(true)
    expect(isRegExp(/test/s)).toBe(true)
  })

  test('should return true for RegExp constructors', () => {
    expect(isRegExp(new RegExp('test'))).toBe(true)
    expect(isRegExp(new RegExp('test', 'g'))).toBe(true)
    expect(isRegExp(RegExp('test'))).toBe(true)
    expect(isRegExp(RegExp('test', 'i'))).toBe(true)
  })

  test('should return true for complex patterns', () => {
    expect(isRegExp(/^[a-z]+$/)).toBe(true)
    expect(isRegExp(/\d{3}-\d{2}-\d{4}/)).toBe(true)
    expect(isRegExp(new RegExp('\\w+@\\w+\\.\\w+'))).toBe(true)
    expect(isRegExp(/(?<=\$)\d+(\.\d{2})?/)).toBe(true)
  })

  test('should return false for regexp-like objects', () => {
    const regExpLike = {
      source: 'test',
      flags: 'g',
      test: () => true,
      exec: () => null
    }
    expect(isRegExp(regExpLike)).toBe(false)
  })

  test('should return false for non-regexp values', () => {
    expect(isRegExp(null)).toBe(false)
    expect(isRegExp(undefined)).toBe(false)
    expect(isRegExp('test')).toBe(false)
    expect(isRegExp('/test/')).toBe(false)
    expect(isRegExp(42)).toBe(false)
    expect(isRegExp(true)).toBe(false)
    expect(isRegExp({})).toBe(false)
    expect(isRegExp([])).toBe(false)
    expect(isRegExp(() => {})).toBe(false)
  })

  test('should handle regexp with modified prototypes', () => {
    const regexp = new RegExp('test')
    Object.setPrototypeOf(regexp, null)
    expect(isRegExp(regexp)).toBe(true)
  })

  test('should handle invalid regexp patterns', () => {
    expect(() => {
      isRegExp(new RegExp('[', 'g'))
    }).not.toThrow()
  })
})
