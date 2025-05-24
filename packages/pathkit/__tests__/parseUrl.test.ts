import { parseUrl } from '../src'

describe('parseUrl', () => {
  test('should parse basic URLs', () => {
    expect(parseUrl('https://example.com')).toEqual({
      protocol: 'https:',
      hostname: 'example.com',
      pathname: '/',
      search: '',
      hash: ''
    })
  })

  test('should parse URLs with paths', () => {
    expect(parseUrl('https://example.com/path/to/resource')).toEqual({
      protocol: 'https:',
      hostname: 'example.com',
      pathname: '/path/to/resource',
      search: '',
      hash: ''
    })
  })

  test('should parse URLs with query parameters', () => {
    expect(parseUrl('https://example.com/search?q=test&page=1')).toEqual({
      protocol: 'https:',
      hostname: 'example.com',
      pathname: '/search',
      search: '?q=test&page=1',
      hash: ''
    })
  })

  test('should parse URLs with hash fragments', () => {
    expect(parseUrl('https://example.com/page#section')).toEqual({
      protocol: 'https:',
      hostname: 'example.com',
      pathname: '/page',
      search: '',
      hash: '#section'
    })
  })

  test('should parse URLs with ports', () => {
    expect(parseUrl('https://example.com:8080/api')).toEqual({
      protocol: 'https:',
      hostname: 'example.com',
      port: '8080',
      pathname: '/api',
      search: '',
      hash: ''
    })
  })

  test('should parse URLs with authentication', () => {
    expect(parseUrl('https://user:pass@example.com')).toEqual({
      protocol: 'https:',
      username: 'user',
      password: 'pass',
      hostname: 'example.com',
      pathname: '/',
      search: '',
      hash: ''
    })
  })

  test('should parse URLs with subdomains', () => {
    expect(parseUrl('https://api.example.com/v1')).toEqual({
      protocol: 'https:',
      hostname: 'api.example.com',
      pathname: '/v1',
      search: '',
      hash: ''
    })
  })

  test('should parse URLs with all components', () => {
    expect(parseUrl('https://user:pass@api.example.com:8080/path?q=test#section')).toEqual({
      protocol: 'https:',
      username: 'user',
      password: 'pass',
      hostname: 'api.example.com',
      port: '8080',
      pathname: '/path',
      search: '?q=test',
      hash: '#section'
    })
  })

  test('should handle different protocols', () => {
    expect(parseUrl('http://example.com')).toEqual({
      protocol: 'http:',
      hostname: 'example.com',
      pathname: '/',
      search: '',
      hash: ''
    })

    expect(parseUrl('ftp://example.com')).toEqual({
      protocol: 'ftp:',
      hostname: 'example.com',
      pathname: '/',
      search: '',
      hash: ''
    })
  })

  test('should handle special characters in URLs', () => {
    expect(parseUrl('https://example.com/path with spaces?q=test value')).toEqual({
      protocol: 'https:',
      hostname: 'example.com',
      pathname: '/path with spaces',
      search: '?q=test value',
      hash: ''
    })
  })

  test('should handle empty components', () => {
    expect(parseUrl('https://example.com?')).toEqual({
      protocol: 'https:',
      hostname: 'example.com',
      pathname: '/',
      search: '',
      hash: ''
    })

    expect(parseUrl('https://example.com#')).toEqual({
      protocol: 'https:',
      hostname: 'example.com',
      pathname: '/',
      search: '',
      hash: ''
    })
  })

  test('should handle invalid URLs', () => {
    expect(() => parseUrl('')).toThrow()
    expect(() => parseUrl('not a url')).toThrow()
    expect(() => parseUrl('http://')).toThrow()
  })
})
