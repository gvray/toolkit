import { flattenDeep } from '../src'

describe('flattenDeep', () => {
  it('fully flattens nested arrays', () => {
    expect(flattenDeep([1, [2, [3, [4]]], 5])).toEqual([1, 2, 3, 4, 5])
  })

  it('preserves non-array values and skips empty arrays naturally', () => {
    expect(flattenDeep([1, [], [2, [3]], null])).toEqual([1, 2, 3, null])
  })
})
