import {
  defaults,
  findKey,
  get,
  invert,
  mapKeys,
  mapValues,
  merge,
  omit,
  pick,
  set,
  unset
} from '../src'

describe('object utilities', () => {
  it('omit removes specified keys', () => {
    expect(omit({ a: 1, b: 2, c: 3 }, ['b'])).toEqual({ a: 1, c: 3 })
  })

  it('merge performs a shallow merge', () => {
    expect(merge({ a: 1, nested: { a: 1 } }, { b: 2, nested: { b: 2 } })).toEqual({
      a: 1,
      b: 2,
      nested: { b: 2 }
    })
  })

  it('defaults only fills undefined values', () => {
    expect(defaults({ a: 1, b: undefined }, { a: 9, b: 2, c: 3 })).toEqual({ a: 1, b: 2, c: 3 })
  })

  it('get reads nested values with fallback support', () => {
    expect(get({ a: { b: 2 } }, 'a.b')).toBe(2)
    expect(get({ a: { b: 2 } }, 'a.c', 'fallback')).toBe('fallback')
  })

  it('set writes nested values by path', () => {
    const value = { a: 1 }
    expect(set(value, 'b.c', 3)).toEqual({ a: 1, b: { c: 3 } })
  })

  it('unset removes nested values by path', () => {
    const value = { a: { b: 1 } }
    expect(unset(value, 'a.b')).toBe(true)
    expect(value).toEqual({ a: {} })
  })

  it('mapKeys transforms object keys', () => {
    expect(mapKeys({ a: 1, b: 2 }, (key) => String(key).toUpperCase())).toEqual({ A: 1, B: 2 })
  })

  it('mapValues transforms object values', () => {
    expect(mapValues({ a: 1, b: 2 }, (value) => value * 2)).toEqual({ a: 2, b: 4 })
  })

  it('invert swaps keys and values', () => {
    expect(invert({ a: 'x', b: 'y' })).toEqual({ x: 'a', y: 'b' })
  })

  it('findKey returns the first matching key', () => {
    expect(findKey({ a: 1, b: 2, c: 3 }, (value) => value > 1)).toBe('b')
  })

  it('pick supports array-based keys from the design', () => {
    expect(pick({ a: 1, b: 2, c: 3 }, ['a', 'c'])).toEqual({ a: 1, c: 3 })
  })
})
