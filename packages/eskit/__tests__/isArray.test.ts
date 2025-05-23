import isArray from '../src/is-array'

describe('isArray', () => {
  test('should return true for arrays', () => {
    expect(isArray([])).toBe(true)
    expect(isArray([1, 2, 3])).toBe(true)
    expect(isArray(Array.from('hello'))).toBe(true)
    expect(isArray(new Array(3))).toBe(true)
    expect(isArray(['a', 1, true, null, undefined])).toBe(true)
  })

  test('should return false for array-like objects', () => {
    const arrayLike = { 0: 'a', 1: 'b', length: 2 }
    expect(isArray(arrayLike)).toBe(false)
    expect(isArray('hello')).toBe(false)
    expect(isArray(document.querySelectorAll('div'))).toBe(false)
    expect(isArray(new Int8Array([1, 2, 3]))).toBe(false)
  })

  test('should return false for non-arrays', () => {
    expect(isArray(null)).toBe(false)
    expect(isArray(undefined)).toBe(false)
    expect(isArray({})).toBe(false)
    expect(isArray(() => {})).toBe(false)
    expect(isArray(42)).toBe(false)
    expect(isArray(new Set())).toBe(false)
    expect(isArray(new Map())).toBe(false)
  })

  test('should return true for array subclasses', () => {
    class MyArray extends Array {}
    expect(isArray(new MyArray())).toBe(true)
    expect(isArray(Int16Array.from([1, 2, 3]))).toBe(false)
  })

  test('should handle sparse arrays', () => {
    const sparseArray = new Array(3)
    sparseArray[1] = 'test'
    expect(isArray(sparseArray)).toBe(true)

    const sparseArray2 = [1, undefined, 3]
    expect(isArray(sparseArray2)).toBe(true)
  })
})
