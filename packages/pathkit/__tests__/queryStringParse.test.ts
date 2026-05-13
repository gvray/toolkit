import { queryStringParse } from '../src'

describe('queryStringParse', () => {
  it('parses a query string with or without a leading question mark', () => {
    expect(queryStringParse('a=1&b=x')).toEqual({ a: '1', b: 'x' })
    expect(queryStringParse('?a=1&b=x')).toEqual({ a: '1', b: 'x' })
  })

  it('returns an empty object for an empty query string', () => {
    expect(queryStringParse('')).toEqual({})
  })
})
