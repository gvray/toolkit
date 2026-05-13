import { partition } from '../src'

describe('partition', () => {
  it('splits items into matched and unmatched groups', () => {
    expect(partition([1, 2, 3, 4], (value) => value % 2 === 0)).toEqual([[2, 4], [1, 3]])
  })

  it('returns two empty arrays for an empty input', () => {
    expect(partition([], () => true)).toEqual([[], []])
  })
})
