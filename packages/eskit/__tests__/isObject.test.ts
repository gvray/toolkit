import isObject from '../src/is-object'

describe('isObject', () => {
  test('should return true for objects', () => {
    expect(isObject({})).toBe(true)
    expect(isObject({ a: 1 })).toBe(true)
    expect(isObject(Object.create(null))).toBe(true)
    expect(isObject(new Object())).toBe(true)
  })

  test('should return true for object instances', () => {
    expect(isObject(new Date())).toBe(true)
    expect(isObject(new RegExp(''))).toBe(true)
    expect(isObject(new Error())).toBe(true)
    expect(isObject(new Number(123))).toBe(true)
    expect(isObject(new String('test'))).toBe(true)
    expect(isObject(new Boolean(true))).toBe(true)
  })

  test('should return true for arrays and functions', () => {
    expect(isObject([])).toBe(true)
    expect(isObject(() => {})).toBe(true)
    expect(isObject(() => {})).toBe(true)
    expect(isObject([])).toBe(true)
  })

  test('should return false for primitives', () => {
    expect(isObject(null)).toBe(false)
    expect(isObject(undefined)).toBe(false)
    expect(isObject(42)).toBe(false)
    expect(isObject('string')).toBe(false)
    expect(isObject(true)).toBe(false)
    expect(isObject(false)).toBe(false)
    expect(isObject(Symbol('test'))).toBe(false)
    expect(isObject(123n)).toBe(false)
  })

  test('should handle special objects', () => {
    expect(isObject(new Map())).toBe(true)
    expect(isObject(new Set())).toBe(true)
    expect(isObject(new WeakMap())).toBe(true)
    expect(isObject(new WeakSet())).toBe(true)
    expect(isObject(new Int8Array())).toBe(true)
    expect(isObject(Promise.resolve())).toBe(true)
  })

  test('should handle proxy objects', () => {
    const obj = {}
    const proxy = new Proxy(obj, {})
    expect(isObject(proxy)).toBe(true)
  })
})
