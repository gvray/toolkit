import after from '../src/after'
import before from '../src/before'
import count from '../src/count'
import countBy from '../src/countBy'
import countTree from '../src/countTree'
import dropWhile from '../src/dropWhile'
import has from '../src/has'
import takeWhile from '../src/takeWhile'
import unzip from '../src/unzip'
import zip from '../src/zip'

describe('low-priority eskit utilities', () => {
  it('has', () => {
    expect(has({ a: { b: 1 } }, 'a.b')).toBe(true)
    expect(has({ a: {} }, 'a.b')).toBe(false)
  })

  it('zip / unzip', () => {
    expect(zip([1, 2], ['a', 'b'])).toEqual([
      [1, 'a'],
      [2, 'b']
    ])
    expect(unzip([[1, 'a'], [2, 'b']])).toEqual([
      [1, 2],
      ['a', 'b']
    ])
  })

  it('countBy', () => {
    expect(countBy([{ type: 'a' }, { type: 'b' }, { type: 'a' }], 'type')).toEqual({ a: 2, b: 1 })
  })

  it('takeWhile / dropWhile', () => {
    expect(takeWhile([1, 2, 3, 4], (n) => n < 3)).toEqual([1, 2])
    expect(dropWhile([1, 2, 3, 4], (n) => n < 3)).toEqual([3, 4])
  })

  it('before / after', () => {
    const limited = before(3, (x: number) => x)
    expect(limited(1)).toBe(1)
    expect(limited(2)).toBe(2)
    expect(limited(3)).toBeUndefined()

    const delayed = after(3, () => 'ok')
    expect(delayed()).toBeUndefined()
    expect(delayed()).toBeUndefined()
    expect(delayed()).toBe('ok')
  })

  it('count', () => {
    expect(count('abcabc', 'a')).toBe(2)
    expect(() => count('abc', '')).toThrow(RangeError)
  })

  it('countTree', () => {
    expect(countTree([{ id: 1, children: [{ id: 2 }] }])).toBe(2)
  })
})
