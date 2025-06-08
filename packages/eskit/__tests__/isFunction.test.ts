import isFunction from '../src/isFunction'

describe('isFunction', () => {
  test('should return true for functions', () => {
    expect(isFunction(() => {})).toBe(true)
    expect(isFunction(() => {})).toBe(true)
    expect(isFunction(async () => {})).toBe(true)
    expect(isFunction(function* () {})).toBe(true)
    expect(isFunction(async function* () {})).toBe(true)
    expect(isFunction(Date)).toBe(true)
    expect(isFunction(String)).toBe(true)
  })

  test('should return true for class constructors', () => {
    class TestClass {}
    expect(isFunction(TestClass)).toBe(true)
    expect(isFunction(class {})).toBe(true)
  })

  test('should return true for built-in methods', () => {
    expect(isFunction(Array.prototype.map)).toBe(true)
    expect(isFunction(Object.keys)).toBe(true)
    expect(isFunction(console.log)).toBe(true)
    expect(isFunction(Math.max)).toBe(true)
  })

  test('should return false for non-functions', () => {
    expect(isFunction(null)).toBe(false)
    expect(isFunction(undefined)).toBe(false)
    expect(isFunction(42)).toBe(false)
    expect(isFunction('function')).toBe(false)
    expect(isFunction(true)).toBe(false)
    expect(isFunction({})).toBe(false)
    expect(isFunction([])).toBe(false)
    expect(isFunction(/regex/)).toBe(false)
    expect(isFunction(new Date())).toBe(false)
    expect(isFunction(Symbol('test'))).toBe(false)
  })

  test('should handle bound functions', () => {
    const fn = function () {}
    const boundFn = fn.bind(null)
    expect(isFunction(boundFn)).toBe(true)
  })

  test('should handle proxy functions', () => {
    const fn = () => {}
    const proxy = new Proxy(fn, {})
    expect(isFunction(proxy)).toBe(true)
  })
})
