import { flatten } from '../src'

describe('flatten', () => {
  it('flattens one level by default', () => {
    const arr = [1, [2, [3, 4]], 5]
    const result = flatten(arr)

    expect(result).toEqual([1, 2, [3, 4], 5])
  })

  it('flattens nested arrays up to the provided depth', () => {
    const arr = [1, [2, [], [3, [], 4]], [], 5]
    const result = flatten(arr, 2)

    expect(result).toEqual([1, 2, 3, [], 4, 5])
  })

  it('throws when depth is negative or not an integer', () => {
    expect(() => flatten([1, [2]], -1)).toThrow('depth must be a non-negative integer')
    expect(() => flatten([1, [2]], 1.5)).toThrow('depth must be a non-negative integer')
  })
})
