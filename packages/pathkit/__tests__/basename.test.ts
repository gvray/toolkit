import { basename } from '../src'

describe('basename', () => {
  test('should return the last portion of a path', () => {
    expect(basename('/foo/bar/baz.html')).toBe('baz.html')
    expect(basename('/foo/bar/baz')).toBe('baz')
    expect(basename('/foo/bar/')).toBe('bar')
  })

  test('should handle paths with extension removal', () => {
    expect(basename('/foo/bar/baz.html', '.html')).toBe('baz')
    expect(basename('/foo/bar/baz.min.js', '.js')).toBe('baz.min')
    expect(basename('baz.html', '.html')).toBe('baz')
  })

  test('should handle different path separators', () => {
    expect(basename('foo\\bar\\baz')).toBe('baz')
    expect(basename('foo/bar/baz')).toBe('baz')
    expect(basename('foo\\bar/baz')).toBe('baz')
  })

  test('should handle empty paths', () => {
    expect(basename('')).toBe('')
    expect(basename('/')).toBe('/')
    expect(basename('//')).toBe('/')
  })

  test('should handle paths without separators', () => {
    expect(basename('foo')).toBe('foo')
    expect(basename('foo.txt')).toBe('foo.txt')
    expect(basename('foo.txt', '.txt')).toBe('foo')
  })

  test('should handle paths with multiple extensions', () => {
    expect(basename('/foo/bar.min.js', '.js')).toBe('bar.min')
    expect(basename('bar.min.js', '.min.js')).toBe('bar')
  })

  test('should handle special characters', () => {
    expect(basename('/foo/bar!@#$%/baz')).toBe('baz')
    expect(basename('/foo/bar spaces/baz')).toBe('baz')
    expect(basename('/foo/bar.特殊/baz')).toBe('baz')
  })

  test('should handle Windows-style paths', () => {
    expect(basename('C:\\foo\\bar\\baz')).toBe('baz')
    expect(basename('C:/foo/bar/baz')).toBe('baz')
    expect(basename('\\\\server\\share\\baz')).toBe('baz')
  })

  test('should handle dots in path', () => {
    expect(basename('/foo/bar/.')).toBe('.')
    expect(basename('/foo/bar/..')).toBe('..')
    expect(basename('/foo/.bar')).toBe('.bar')
  })

  test('should throw for invalid inputs', () => {
    // @ts-ignore
    expect(() => basename(null)).toThrow(TypeError)
    // @ts-ignore
    expect(() => basename(undefined)).toThrow(TypeError)
    // @ts-ignore
    expect(() => basename(123)).toThrow(TypeError)
  })
})
