import isNil from '../src/isNil'

describe('isNil', () => {
  test('should return true for null and undefined', () => {
    expect(isNil(null)).toBe(true)
    expect(isNil(undefined)).toBe(true)
    expect(isNil(void 0)).toBe(true)
  })

  test('should return false for falsy values', () => {
    expect(isNil(false)).toBe(false)
    expect(isNil(0)).toBe(false)
    expect(isNil('')).toBe(false)
    expect(isNil(NaN)).toBe(false)
  })

  test('should return false for truthy values', () => {
    expect(isNil(true)).toBe(false)
    expect(isNil(1)).toBe(false)
    expect(isNil('string')).toBe(false)
    expect(isNil([])).toBe(false)
    expect(isNil({})).toBe(false)
    expect(isNil(() => {})).toBe(false)
  })

  test('should return false for objects with null prototype', () => {
    const obj = Object.create(null)
    expect(isNil(obj)).toBe(false)
  })

  test('should return false for special values', () => {
    expect(isNil(Symbol())).toBe(false)
    expect(isNil(new Date())).toBe(false)
    expect(isNil(new Error())).toBe(false)
    expect(isNil(new Map())).toBe(false)
    expect(isNil(new Set())).toBe(false)
    expect(isNil(new WeakMap())).toBe(false)
    expect(isNil(new WeakSet())).toBe(false)
  })

  test('should handle null-like objects', () => {
    const nullLike = { valueOf: () => null }
    expect(isNil(nullLike)).toBe(false)
  })

  test('should handle undefined-like objects', () => {
    const undefinedLike = { valueOf: () => undefined }
    expect(isNil(undefinedLike)).toBe(false)
  })
})
