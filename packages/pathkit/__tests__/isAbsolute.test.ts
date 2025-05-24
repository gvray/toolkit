import { isAbsolute } from '../src'

// Use Jest to run unit tests
describe('isAbsolute', () => {
  test('should return true for absolute paths on Unix-like systems', () => {
    expect(isAbsolute('/foo/bar')).toBe(true)
    expect(isAbsolute('/foo')).toBe(true)
    expect(isAbsolute('/')).toBe(true)
    expect(isAbsolute('/foo/bar/baz.txt')).toBe(true)
  })

  test('should return true for absolute paths on Windows', () => {
    expect(isAbsolute('C:\\')).toBe(true)
    expect(isAbsolute('C:/foo')).toBe(true)
    expect(isAbsolute('C:\\foo\\bar')).toBe(true)
    expect(isAbsolute('\\\\server\\share')).toBe(true)
    expect(isAbsolute('//server/share')).toBe(true)
  })

  test('should return false for relative paths on Unix-like systems', () => {
    expect(isAbsolute('foo/bar')).toBe(false)
    expect(isAbsolute('foo')).toBe(false)
    expect(isAbsolute('.')).toBe(false)
    expect(isAbsolute('..')).toBe(false)
    expect(isAbsolute('./foo')).toBe(false)
    expect(isAbsolute('../foo')).toBe(false)
  })

  test('should return false for relative paths on Windows', () => {
    expect(isAbsolute('foo\\bar')).toBe(false)
    expect(isAbsolute('foo')).toBe(false)
    expect(isAbsolute('.')).toBe(false)
    expect(isAbsolute('..')).toBe(false)
    expect(isAbsolute('.\\foo')).toBe(false)
    expect(isAbsolute('..\\foo')).toBe(false)
  })

  test('should handle empty paths', () => {
    expect(isAbsolute('')).toBe(false)
  })

  test('should handle paths with special characters', () => {
    expect(isAbsolute('/foo/bar!')).toBe(true)
    expect(isAbsolute('/foo/bar@#$%')).toBe(true)
    expect(isAbsolute('/foo/bar spaces')).toBe(true)
    expect(isAbsolute('C:\\foo\\bar!')).toBe(true)
    expect(isAbsolute('C:\\foo\\bar@#$%')).toBe(true)
    expect(isAbsolute('C:\\foo\\bar spaces')).toBe(true)
  })

  test('should handle paths with multiple slashes', () => {
    expect(isAbsolute('//foo')).toBe(true)
    expect(isAbsolute('///foo')).toBe(true)
    expect(isAbsolute('\\\\foo')).toBe(true)
    expect(isAbsolute('\\\\\\foo')).toBe(true)
  })

  test('should handle URL-like paths', () => {
    expect(isAbsolute('http://example.com')).toBe(false)
    expect(isAbsolute('https://example.com')).toBe(false)
    expect(isAbsolute('file:///foo/bar')).toBe(false)
  })
})
