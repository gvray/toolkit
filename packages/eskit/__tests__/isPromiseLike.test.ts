import { isPromiseLike } from '../src'

describe('isPromiseLike', () => {
  test('should return true for Promise instances', () => {
    expect(isPromiseLike(Promise.resolve())).toBe(true)
    expect(isPromiseLike(Promise.reject().catch(() => {}))).toBe(true)
    expect(isPromiseLike(new Promise(() => {}))).toBe(true)
  })

  test('should return true for Promise-like objects', () => {
    const promiseLike = {
      then: () => {}
    }
    expect(isPromiseLike(promiseLike)).toBe(true)
  })

  test('should return true for async function results', async () => {
    const asyncFn = async () => 'result'
    expect(isPromiseLike(asyncFn())).toBe(true)
  })

  test('should return false for non-promise values', () => {
    expect(isPromiseLike(null)).toBe(false)
    expect(isPromiseLike(undefined)).toBe(false)
    expect(isPromiseLike(42)).toBe(false)
    expect(isPromiseLike('promise')).toBe(false)
    expect(isPromiseLike(true)).toBe(false)
    expect(isPromiseLike({})).toBe(false)
    expect(isPromiseLike([])).toBe(false)
    expect(isPromiseLike(() => {})).toBe(false)
  })

  test('should return false for objects without then method', () => {
    expect(isPromiseLike({ catch: () => {} })).toBe(false)
    expect(isPromiseLike({ finally: () => {} })).toBe(false)
  })

  test('should handle Promise subclasses', () => {
    class CustomPromise extends Promise<any> {}
    expect(isPromiseLike(new CustomPromise(() => {}))).toBe(true)
  })

  test('should handle Promise.all results', () => {
    expect(isPromiseLike(Promise.all([]))).toBe(true)
    expect(isPromiseLike(Promise.all([Promise.resolve(1)]))).toBe(true)
  })

  test('should handle Promise.race results', () => {
    expect(isPromiseLike(Promise.race([]))).toBe(true)
    expect(isPromiseLike(Promise.race([Promise.resolve(1)]))).toBe(true)
  })

  test('should handle Promise.allSettled results', () => {
    expect(isPromiseLike(Promise.allSettled([]))).toBe(true)
    expect(isPromiseLike(Promise.allSettled([Promise.resolve(1)]))).toBe(true)
  })

  test('should handle Promise.any results', () => {
    expect(isPromiseLike(Promise.any([]))).toBe(true)
    expect(isPromiseLike(Promise.any([Promise.resolve(1)]))).toBe(true)
  })

  test('should handle async generators', async () => {
    async function* asyncGenerator() {
      yield 1
      yield 2
    }
    expect(isPromiseLike(asyncGenerator().next())).toBe(true)
  })
})
