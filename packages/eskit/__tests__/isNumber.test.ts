import isNumber from '../src/isNumber'

describe('isNumber', () => {
  test('should return true for numbers', () => {
    expect(isNumber(0)).toBe(true)
    expect(isNumber(42)).toBe(true)
    expect(isNumber(-1)).toBe(true)
    expect(isNumber(3.14)).toBe(true)
    expect(isNumber(Number.MAX_VALUE)).toBe(true)
    expect(isNumber(Number.MIN_VALUE)).toBe(true)
    expect(isNumber(new Number(123))).toBe(true)
  })

  test('should return true for special number values', () => {
    expect(isNumber(Infinity)).toBe(true)
    expect(isNumber(-Infinity)).toBe(true)
    expect(isNumber(NaN)).toBe(true)
  })

  test('should return false for non-numbers', () => {
    expect(isNumber(null)).toBe(false)
    expect(isNumber(undefined)).toBe(false)
    expect(isNumber('123')).toBe(false)
    expect(isNumber(true)).toBe(false)
    expect(isNumber({})).toBe(false)
    expect(isNumber([])).toBe(false)
    expect(isNumber(() => {})).toBe(false)
    expect(isNumber(Symbol('123'))).toBe(false)
  })

  test('should handle edge cases', () => {
    expect(isNumber(0.0)).toBe(true)
    expect(isNumber(-0)).toBe(true)
    expect(isNumber(1e10)).toBe(true)
    expect(isNumber(0b1010)).toBe(true)
    expect(isNumber(0o777)).toBe(true)
    expect(isNumber(0xfff)).toBe(true)
  })
})
