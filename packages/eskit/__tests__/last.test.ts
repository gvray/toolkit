import { last } from '../src'

describe('last', () => {
  it('returns the last item in an array', () => {
    expect(last([1, 2, 3])).toBe(3)
  })

  it('returns the fallback value for an empty array', () => {
    expect(last([], 'fallback')).toBe('fallback')
  })

  it('returns undefined when the array is empty and no fallback is provided', () => {
    expect(last([])).toBeUndefined()
  })
})
