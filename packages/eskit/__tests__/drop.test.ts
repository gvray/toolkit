import { drop } from '../src'

describe('drop', () => {
  it('drops the first N items', () => {
    expect(drop([1, 2, 3, 4], 2)).toEqual([3, 4])
  })

  it('returns an empty array when count exceeds the array length', () => {
    expect(drop([1, 2], 10)).toEqual([])
  })

  it('throws when count is negative or not an integer', () => {
    expect(() => drop([1, 2], -1)).toThrow('count must be a non-negative integer')
    expect(() => drop([1, 2], 1.5)).toThrow('count must be a non-negative integer')
  })
})
