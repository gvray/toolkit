import { memoizeWeak, once, partial, pipe } from '../src'

describe('function utilities', () => {
  it('pipe composes functions from left to right', () => {
    expect(pipe((value: number) => value + 1, (value: number) => value * 2)(3)).toBe(8)
  })

  it('partial pre-binds leading arguments', () => {
    expect(partial((a: number, b: number) => a + b, 1)(2)).toBe(3)
  })

  it('once only runs the underlying function once', () => {
    let counter = 0
    const fn = once(() => {
      counter += 1
      return counter
    })

    expect(fn()).toBe(1)
    expect(fn()).toBe(1)
    expect(counter).toBe(1)
  })

  it('memoizeWeak caches by object identity', () => {
    let counter = 0
    const fn = memoizeWeak((value: object) => {
      counter += 1
      return { value, counter }
    })
    const key = {}

    expect(fn(key)).toEqual({ value: key, counter: 1 })
    expect(fn(key)).toEqual({ value: key, counter: 1 })
    expect(counter).toBe(1)
  })
})
