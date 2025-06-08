import isInteger from '../src/isInteger'

describe('isInteger', () => {
  test('should return true for integers', () => {
    expect(isInteger(0)).toBe(true)
    expect(isInteger(1)).toBe(true)
    expect(isInteger(-5)).toBe(true)
    expect(isInteger(100)).toBe(true)
    expect(isInteger(-100)).toBe(true)
    expect(isInteger(Number.MAX_SAFE_INTEGER)).toBe(true)
    expect(isInteger(Number.MIN_SAFE_INTEGER)).toBe(true)
  })

  test('should return false for decimal numbers', () => {
    expect(isInteger(3.14)).toBe(false)
    expect(isInteger(0.5)).toBe(false)
    expect(isInteger(-2.7)).toBe(false)
    expect(isInteger(123.456)).toBe(false)
    expect(isInteger(0.1)).toBe(false)
  })

  test('should return false for non-numbers', () => {
    expect(isInteger('3')).toBe(false)
    expect(isInteger('0')).toBe(false)
    expect(isInteger(null)).toBe(false)
    expect(isInteger(undefined)).toBe(false)
    expect(isInteger({})).toBe(false)
    expect(isInteger([])).toBe(false)
    expect(isInteger(true)).toBe(false)
    expect(isInteger(false)).toBe(false)
  })

  test('should return false for special number values', () => {
    expect(isInteger(NaN)).toBe(false)
    expect(isInteger(Infinity)).toBe(false)
    expect(isInteger(-Infinity)).toBe(false)
  })
})
