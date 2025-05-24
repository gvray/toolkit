import { isObjectLike } from '../src'

describe('isObjectLike', () => {
  test('should return true for plain objects', () => {
    expect(isObjectLike({})).toBe(true)
    expect(isObjectLike({ a: 1 })).toBe(true)
    expect(isObjectLike(Object.create(null))).toBe(true)
  })

  test('should return true for arrays', () => {
    expect(isObjectLike([])).toBe(true)
    expect(isObjectLike([1, 2, 3])).toBe(true)
    expect(isObjectLike([])).toBe(true)
  })

  test('should return true for built-in objects', () => {
    expect(isObjectLike(new Date())).toBe(true)
    expect(isObjectLike(new RegExp(''))).toBe(true)
    expect(isObjectLike(new Error())).toBe(true)
    expect(isObjectLike(new Map())).toBe(true)
    expect(isObjectLike(new Set())).toBe(true)
    expect(isObjectLike(new WeakMap())).toBe(true)
    expect(isObjectLike(new WeakSet())).toBe(true)
  })

  test('should return true for wrapper objects', () => {
    expect(isObjectLike(new String('test'))).toBe(true)
    expect(isObjectLike(new Number(123))).toBe(true)
    expect(isObjectLike(new Boolean(true))).toBe(true)
  })

  test('should return true for class instances', () => {
    class TestClass {}
    expect(isObjectLike(new TestClass())).toBe(true)
  })

  test('should return true for array-like objects', () => {
    const arrayLike = { length: 0 }
    expect(isObjectLike(arrayLike)).toBe(true)
  })

  test('should return true for DOM elements', () => {
    const element = document.createElement('div')
    expect(isObjectLike(element)).toBe(true)
  })

  test('should return false for primitive values', () => {
    expect(isObjectLike(undefined)).toBe(false)
    expect(isObjectLike(null)).toBe(false)
    expect(isObjectLike(true)).toBe(false)
    expect(isObjectLike(false)).toBe(false)
    expect(isObjectLike(0)).toBe(false)
    expect(isObjectLike(42)).toBe(false)
    expect(isObjectLike(-1)).toBe(false)
    expect(isObjectLike(NaN)).toBe(false)
    expect(isObjectLike(Infinity)).toBe(false)
    expect(isObjectLike(-Infinity)).toBe(false)
    expect(isObjectLike('')).toBe(false)
    expect(isObjectLike('string')).toBe(false)
    expect(isObjectLike(Symbol())).toBe(false)
    expect(isObjectLike(Symbol.iterator)).toBe(false)
  })

  test('should return false for functions', () => {
    expect(isObjectLike(() => {})).toBe(false)
    expect(isObjectLike(() => {})).toBe(false)
    expect(isObjectLike(async () => {})).toBe(false)
    expect(isObjectLike(function* () {})).toBe(false)
  })

  test('should handle objects with null prototype', () => {
    const obj = Object.create(null)
    obj.test = 123
    expect(isObjectLike(obj)).toBe(true)
  })

  test('should handle objects with custom prototype', () => {
    const proto = { test: 123 }
    const obj = Object.create(proto)
    expect(isObjectLike(obj)).toBe(true)
  })
})
