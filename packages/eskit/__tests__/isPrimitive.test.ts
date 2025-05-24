import { isPrimitive } from '../src'

describe('isPrimitive', () => {
  test('should return true for primitive values', () => {
    expect(isPrimitive(undefined)).toBe(true)
    expect(isPrimitive(null)).toBe(true)
    expect(isPrimitive(true)).toBe(true)
    expect(isPrimitive(false)).toBe(true)
    expect(isPrimitive(0)).toBe(true)
    expect(isPrimitive(42)).toBe(true)
    expect(isPrimitive(-1)).toBe(true)
    expect(isPrimitive(NaN)).toBe(true)
    expect(isPrimitive(Infinity)).toBe(true)
    expect(isPrimitive(-Infinity)).toBe(true)
    expect(isPrimitive('')).toBe(true)
    expect(isPrimitive('string')).toBe(true)
    expect(isPrimitive(Symbol())).toBe(true)
    expect(isPrimitive(Symbol.iterator)).toBe(true)
  })

  test('should return false for non-primitive values', () => {
    expect(isPrimitive({})).toBe(false)
    expect(isPrimitive([])).toBe(false)
    expect(isPrimitive(() => {})).toBe(false)
    expect(isPrimitive(new Date())).toBe(false)
    expect(isPrimitive(new RegExp(''))).toBe(false)
    expect(isPrimitive(new Error())).toBe(false)
    expect(isPrimitive(new Map())).toBe(false)
    expect(isPrimitive(new Set())).toBe(false)
    expect(isPrimitive(new WeakMap())).toBe(false)
    expect(isPrimitive(new WeakSet())).toBe(false)
  })

  test('should return false for wrapper objects', () => {
    expect(isPrimitive(new String(''))).toBe(false)
    expect(isPrimitive(new Number(0))).toBe(false)
    expect(isPrimitive(new Boolean(false))).toBe(false)
  })

  test('should return false for class instances', () => {
    class TestClass {}
    expect(isPrimitive(new TestClass())).toBe(false)
  })

  test('should return false for array-like objects', () => {
    const arrayLike = { length: 0 }
    expect(isPrimitive(arrayLike)).toBe(false)
  })

  test('should return false for DOM elements', () => {
    const element = document.createElement('div')
    expect(isPrimitive(element)).toBe(false)
  })

  test('should return false for functions', () => {
    expect(isPrimitive(() => {})).toBe(false)
    expect(isPrimitive(() => {})).toBe(false)
    expect(isPrimitive(async () => {})).toBe(false)
    expect(isPrimitive(function* () {})).toBe(false)
  })

  test('should return false for objects with primitive values', () => {
    expect(isPrimitive({ value: 42 })).toBe(false)
    expect(isPrimitive({ value: 'string' })).toBe(false)
    expect(isPrimitive({ value: true })).toBe(false)
    expect(isPrimitive({ value: null })).toBe(false)
  })
})
