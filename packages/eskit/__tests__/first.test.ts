import { first } from '../src'

describe('first', () => {
  it('returns the first item in an array', () => {
    expect(first([1, 2, 3])).toBe(1)
  })

  it('returns the fallback value for an empty array', () => {
    expect(first([], 'fallback')).toBe('fallback')
  })

  it('returns undefined when the array is empty and no fallback is provided', () => {
    expect(first([])).toBeUndefined()
  })
})
