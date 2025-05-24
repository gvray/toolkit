import { queryString } from '../src'

describe('queryString', () => {
  test('should generate query string from basic object', () => {
    expect(queryString({ a: '1', b: '2' })).toBe('?a=1&b=2')
  })

  test('should handle empty object', () => {
    expect(queryString({})).toBe('')
  })

  test('should handle numeric values', () => {
    expect(queryString({ age: 25, score: 98.6 })).toBe('?age=25&score=98.6')
  })

  test('should handle string values', () => {
    expect(queryString({ name: 'John Doe', title: 'Software Engineer' })).toBe(
      '?name=John%20Doe&title=Software%20Engineer'
    )
  })

  test('should handle special characters', () => {
    expect(queryString({ email: 'john@example.com', url: 'https://example.com' })).toBe(
      '?email=john%40example.com&url=https%3A%2F%2Fexample.com'
    )
  })

  test('should handle custom separator', () => {
    expect(queryString({ a: '1', b: '2' }, '&')).toBe('&a=1&b=2')
    expect(queryString({ a: '1', b: '2' }, '#')).toBe('#a=1&b=2')
  })

  test('should handle mixed string and number values', () => {
    expect(queryString({ name: 'John', age: 30 })).toBe('?name=John&age=30')
  })

  test('should handle error cases', () => {
    // @ts-ignore - 测试错误情况
    expect(queryString(null)).toBe('')
    // @ts-ignore - 测试错误情况
    expect(queryString(undefined)).toBe('')
  })

  test('should handle empty values', () => {
    expect(queryString({ a: '', b: 0 })).toBe('?a=&b=0')
  })

  test('should handle special characters in keys', () => {
    expect(queryString({ 'user.name': 'John', 'user-age': 25 })).toBe('?user.name=John&user-age=25')
  })
})
