import { dirname } from '../src'

describe('dirname', () => {
  test('should return directory path for basic paths', () => {
    expect(dirname('/foo/bar/baz')).toBe('/foo/bar')
    expect(dirname('/foo/bar')).toBe('/foo')
    expect(dirname('/foo')).toBe('/')
  })

  test('should handle trailing slashes', () => {
    expect(dirname('/foo/bar/')).toBe('/foo')
    expect(dirname('/foo/')).toBe('/')
    expect(dirname('/')).toBe('/')
  })

  test('should handle relative paths', () => {
    expect(dirname('foo/bar')).toBe('foo')
    expect(dirname('foo')).toBe('.')
    expect(dirname('.')).toBe('.')
    expect(dirname('..')).toBe('.')
  })

  test('should handle Windows-style paths', () => {
    expect(dirname('C:\\foo\\bar')).toBe('C:/foo')
    expect(dirname('C:/foo/bar')).toBe('C:/foo')
    expect(dirname('\\\\server\\share\\file')).toBe('//server/share')
  })

  test('should handle empty paths', () => {
    expect(dirname('')).toBe('.')
    expect(dirname('//')).toBe('/')
    expect(dirname('///')).toBe('/')
  })

  test('should handle paths with dots', () => {
    expect(dirname('/foo/./bar')).toBe('/foo')
    expect(dirname('/foo/../bar')).toBe('/foo/..')
    expect(dirname('./foo')).toBe('.')
    expect(dirname('../foo')).toBe('..')
  })

  test('should handle paths with special characters', () => {
    expect(dirname('/foo/bar!@#$%')).toBe('/foo')
    expect(dirname('/foo/bar spaces')).toBe('/foo')
    expect(dirname('/foo/bar.特殊')).toBe('/foo')
  })

  test('should handle file paths', () => {
    expect(dirname('/foo/bar/file.txt')).toBe('/foo/bar')
    expect(dirname('foo/bar/file.txt')).toBe('foo/bar')
    expect(dirname('file.txt')).toBe('.')
  })

  test('should handle multiple slashes', () => {
    expect(dirname('/foo//bar')).toBe('/foo')
    expect(dirname('foo///bar')).toBe('foo')
    expect(dirname('///foo')).toBe('/')
  })

  test('should throw for invalid inputs', () => {
    // @ts-ignore
    expect(() => dirname(null)).toThrow(TypeError)
    // @ts-ignore
    expect(() => dirname(undefined)).toThrow(TypeError)
    // @ts-ignore
    expect(() => dirname(123)).toThrow(TypeError)
  })
})
