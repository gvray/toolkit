import { compact } from '../src'

describe('compact', () => {
  it('removes falsy values from an array', () => {
    expect(compact([0, 1, false, '', 2, null, undefined, NaN])).toEqual([1, 2])
  })

  it('returns an empty array when every item is falsy', () => {
    expect(compact([0, false, '', null, undefined])).toEqual([])
  })
})
