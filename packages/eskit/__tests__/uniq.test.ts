import { uniq } from '../src'

describe('uniq', () => {
  it('removes duplicate primitive values while preserving order', () => {
    expect(uniq([1, 2, 2, 3, 1])).toEqual([1, 2, 3])
  })

  it('returns an empty array when the input is empty', () => {
    expect(uniq([])).toEqual([])
  })
})
