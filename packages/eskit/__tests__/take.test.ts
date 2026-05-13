import { take } from '../src'

describe('take', () => {
  it('returns the first N items', () => {
    expect(take([1, 2, 3, 4], 2)).toEqual([1, 2])
  })

  it('returns the full array when count exceeds the array length', () => {
    expect(take([1, 2], 10)).toEqual([1, 2])
  })

  it('throws when count is negative or not an integer', () => {
    expect(() => take([1, 2], -1)).toThrow('count must be a non-negative integer')
    expect(() => take([1, 2], 1.5)).toThrow('count must be a non-negative integer')
  })
})
