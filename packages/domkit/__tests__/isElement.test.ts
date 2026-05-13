import { isElement } from '../src'

describe('isElement', () => {
  it('returns true for dom elements and false for non-elements', () => {
    expect(isElement(document.body)).toBe(true)
    expect(isElement(document)).toBe(true)
    expect(isElement(null)).toBe(false)
    expect(isElement({})).toBe(false)
  })
})
