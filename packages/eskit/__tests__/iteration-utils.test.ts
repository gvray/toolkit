import { every, find, map, reduce, some } from '../src'

describe('iteration utilities', () => {
  it('map works with arrays and objects', () => {
    expect(map([1, 2], (value) => value * 2)).toEqual([2, 4])
    expect(map({ a: 1, b: 2 }, (value) => value * 2)).toEqual({ a: 2, b: 4 })
  })

  it('reduce works with arrays and objects', () => {
    expect(reduce([1, 2, 3], (acc, value) => acc + value, 0)).toBe(6)
    expect(reduce({ a: 1, b: 2 }, (acc, value) => acc + value, 0)).toBe(3)
  })

  it('some and every work with objects', () => {
    expect(some({ a: 1, b: 2 }, (value) => value > 1)).toBe(true)
    expect(every({ a: 1, b: 2 }, (value) => value > 0)).toBe(true)
  })

  it('find returns the first matching value', () => {
    expect(find({ a: 1, b: 2 }, (value) => value > 1)).toBe(2)
    expect(find([1, 2, 3], (value) => value > 1)).toBe(2)
  })
})
