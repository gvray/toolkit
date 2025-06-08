import isDecimal from '../src/isDecimal'

describe('isDecimal', () => {
  test('should return true for decimal numbers', () => {
    expect(isDecimal(3.14)).toBe(true)
    expect(isDecimal(0.5)).toBe(true)
    expect(isDecimal(-2.7)).toBe(true)
    expect(isDecimal(123.456)).toBe(true)
    expect(isDecimal(0.1)).toBe(true)
  })

  test('should return false for integers', () => {
    expect(isDecimal(0)).toBe(false)
    expect(isDecimal(1)).toBe(false)
    expect(isDecimal(-5)).toBe(false)
    expect(isDecimal(100)).toBe(false)
    expect(isDecimal(-100)).toBe(false)
  })

  test('should return false for non-numbers', () => {
    expect(isDecimal('3.14')).toBe(false)
    expect(isDecimal('0.5')).toBe(false)
    expect(isDecimal(null)).toBe(false)
    expect(isDecimal(undefined)).toBe(false)
    expect(isDecimal({})).toBe(false)
    expect(isDecimal([])).toBe(false)
    expect(isDecimal(true)).toBe(false)
    expect(isDecimal(false)).toBe(false)
  })

  test('should return false for special number values', () => {
    expect(isDecimal(NaN)).toBe(false)
    expect(isDecimal(Infinity)).toBe(false)
    expect(isDecimal(-Infinity)).toBe(false)
  })

  test('should handle edge cases', () => {
    expect(isDecimal(0.0)).toBe(false) // 0.0 is effectively 0
    expect(isDecimal(-0.0)).toBe(false)
    expect(isDecimal(1.0)).toBe(false) // 1.0 is effectively 1
  })
})
