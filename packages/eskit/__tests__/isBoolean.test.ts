import isBoolean from '../src/is-boolean'

describe('isBoolean', () => {
  test('should return true for boolean primitives', () => {
    expect(isBoolean(true)).toBe(true)
    expect(isBoolean(false)).toBe(true)
  })

  test('should return true for Boolean objects', () => {
    expect(isBoolean(new Boolean(true))).toBe(true)
    expect(isBoolean(new Boolean(false))).toBe(true)
    expect(isBoolean(Boolean(1))).toBe(true)
    expect(isBoolean(Boolean(0))).toBe(true)
  })

  test('should return false for truthy values', () => {
    expect(isBoolean(1)).toBe(false)
    expect(isBoolean('true')).toBe(false)
    expect(isBoolean([])).toBe(false)
    expect(isBoolean({})).toBe(false)
    expect(isBoolean(() => {})).toBe(false)
    expect(isBoolean(new Date())).toBe(false)
  })

  test('should return false for falsy values', () => {
    expect(isBoolean(0)).toBe(false)
    expect(isBoolean('')).toBe(false)
    expect(isBoolean(null)).toBe(false)
    expect(isBoolean(undefined)).toBe(false)
    expect(isBoolean(NaN)).toBe(false)
  })

  test('should handle boolean-like objects', () => {
    const booleanLike = {
      valueOf: () => true,
      toString: () => 'true'
    }
    expect(isBoolean(booleanLike)).toBe(false)
  })

  test('should handle objects with modified prototypes', () => {
    const bool = new Boolean(true)
    Object.setPrototypeOf(bool, null)
    expect(isBoolean(bool)).toBe(true)
  })
})
