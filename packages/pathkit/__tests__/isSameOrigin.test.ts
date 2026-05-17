import isSameOrigin from '../src/isSameOrigin'

describe('isSameOrigin', () => {
  it('returns true for same host different paths', () => {
    expect(isSameOrigin('https://a.com/x', 'https://a.com/y')).toBe(true)
  })

  it('returns false for different hosts', () => {
    expect(isSameOrigin('https://a.com', 'https://b.com')).toBe(false)
  })
})
