import { chunk } from '../src'

describe('chunk', () => {
  it('splits an array into groups of the requested size', () => {
    expect(chunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]])
  })

  it('returns an empty array when the input array is empty', () => {
    expect(chunk([], 2)).toEqual([])
  })

  it('throws when size is not a positive integer', () => {
    expect(() => chunk([1, 2], 0)).toThrow('size must be a positive integer')
    expect(() => chunk([1, 2], 1.5)).toThrow('size must be a positive integer')
  })
})
