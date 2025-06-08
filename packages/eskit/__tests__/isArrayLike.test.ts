import isArrayLike from '../src/isArrayLike'

describe('isArrayLike', () => {
  test('should return true for arrays', () => {
    expect(isArrayLike([])).toBe(true)
    expect(isArrayLike([1, 2, 3])).toBe(true)
  })

  test('should return true for strings', () => {
    expect(isArrayLike('')).toBe(true)
    expect(isArrayLike('hello')).toBe(true)
  })

  test('should return true for array-like objects', () => {
    expect(isArrayLike({ length: 0 })).toBe(true)
    expect(isArrayLike({ 0: 'a', 1: 'b', length: 2 })).toBe(true)
  })

  test('should return false for functions and null', () => {
    expect(isArrayLike(null)).toBe(false)
    expect(isArrayLike(() => {})).toBe(false)
  })
})
