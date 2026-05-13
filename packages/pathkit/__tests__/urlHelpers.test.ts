import { addQueryParam, buildUrl, getQueryParam, removeQueryParam, replaceQueryParam } from '../src'

describe('url helpers', () => {
  it('buildUrl combines base, path and query', () => {
    expect(buildUrl('https://api.com', '/users', { page: 1 })).toBe('https://api.com/users?page=1')
  })

  it('getQueryParam reads a query parameter', () => {
    expect(getQueryParam('https://example.com?id=5', 'id')).toBe('5')
  })

  it('addQueryParam appends a query parameter', () => {
    expect(addQueryParam('https://example.com', 'token', 'abc')).toBe('https://example.com/?token=abc')
  })

  it('removeQueryParam removes a query parameter', () => {
    expect(removeQueryParam('https://example.com?a=1&b=2', 'a')).toBe('https://example.com/?b=2')
  })

  it('replaceQueryParam replaces a query parameter', () => {
    expect(replaceQueryParam('https://example.com?page=1', 'page', '2')).toBe('https://example.com/?page=2')
  })
})
