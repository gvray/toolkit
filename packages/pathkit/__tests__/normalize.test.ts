import { normalize } from '../src'

describe('normalize', () => {
  test('should normalize simple paths', () => {
    expect(normalize('foo/bar')).toBe('foo/bar')
    expect(normalize('/foo/bar')).toBe('/foo/bar')
    expect(normalize('foo/bar/')).toBe('foo/bar')
  })

  test('should handle empty paths', () => {
    expect(normalize('')).toBe('.')
    expect(normalize('.')).toBe('.')
    expect(normalize('./')).toBe('.')
  })

  test('should handle current directory references', () => {
    expect(normalize('./foo')).toBe('foo')
    expect(normalize('foo/./bar')).toBe('foo/bar')
    expect(normalize('foo/./bar/./baz')).toBe('foo/bar/baz')
    expect(normalize('foo/.')).toBe('foo')
  })

  test('should handle parent directory references', () => {
    expect(normalize('../foo')).toBe('../foo')
    expect(normalize('foo/../bar')).toBe('bar')
    expect(normalize('foo/bar/../../baz')).toBe('baz')
    expect(normalize('foo/bar/../..')).toBe('.')
    expect(normalize('foo/../../bar')).toBe('../bar')
  })

  test('should handle multiple slashes', () => {
    expect(normalize('foo//bar')).toBe('foo/bar')
    expect(normalize('foo///bar')).toBe('foo/bar')
    expect(normalize('//foo//bar//')).toBe('/foo/bar')
  })

  test('should handle Windows-style paths', () => {
    expect(normalize('foo\\bar')).toBe('foo/bar')
    expect(normalize('C:\\foo\\bar')).toBe('C:/foo/bar')
    expect(normalize('foo\\..\\bar')).toBe('bar')
  })

  test('should handle absolute paths', () => {
    expect(normalize('/foo/bar')).toBe('/foo/bar')
    expect(normalize('/foo/../bar')).toBe('/bar')
    expect(normalize('/foo/./bar')).toBe('/foo/bar')
    expect(normalize('/.')).toBe('/')
    expect(normalize('/..')).toBe('/')
  })

  test('should handle complex paths', () => {
    expect(normalize('foo/bar/../baz/./qux')).toBe('foo/baz/qux')
    expect(normalize('./foo/../../bar')).toBe('../bar')
    expect(normalize('/foo/../bar/./baz/..')).toBe('/bar')
    expect(normalize('foo/bar/../../..')).toBe('..')
  })

  test('should handle paths with special characters', () => {
    expect(normalize('foo bar/baz')).toBe('foo bar/baz')
    expect(normalize('foo!@#/bar$%^')).toBe('foo!@#/bar$%^')
    expect(normalize('foo bar/../baz')).toBe('baz')
  })

  test('should handle UNC paths', () => {
    expect(normalize('//server/share')).toBe('//server/share')
    expect(normalize('\\\\server\\share')).toBe('//server/share')
    expect(normalize('//server/share/foo/../bar')).toBe('//server/share/bar')
  })

  test('should handle mixed forward and backward slashes', () => {
    expect(normalize('foo\\bar/baz')).toBe('foo/bar/baz')
    expect(normalize('foo/bar\\baz')).toBe('foo/bar/baz')
    expect(normalize('foo\\bar\\../baz')).toBe('foo/baz')
  })
})
