import { join } from '../src'

describe('join', () => {
  test('should join path segments with forward slashes', () => {
    expect(join('foo', 'bar')).toBe('foo/bar')
    expect(join('/foo', 'bar')).toBe('/foo/bar')
    expect(join('foo', '/bar')).toBe('foo/bar')
    expect(join('foo', 'bar', 'baz')).toBe('foo/bar/baz')
  })

  test('should handle empty segments', () => {
    expect(join('', 'foo')).toBe('foo')
    expect(join('foo', '')).toBe('foo')
    expect(join('', '')).toBe('')
    expect(join('foo', '', 'bar')).toBe('foo/bar')
  })

  test('should handle absolute paths', () => {
    expect(join('/foo', 'bar')).toBe('/foo/bar')
    expect(join('/foo', '/bar')).toBe('/foo/bar')
    expect(join('/', 'foo', 'bar')).toBe('/foo/bar')
  })

  test('should handle relative paths', () => {
    expect(join('.', 'foo')).toBe('./foo')
    expect(join('..', 'foo')).toBe('../foo')
    expect(join('foo', '..', 'bar')).toBe('foo/../bar')
    expect(join('foo', '.', 'bar')).toBe('foo/./bar')
  })

  test('should handle multiple slashes', () => {
    expect(join('foo/', '/bar')).toBe('foo/bar')
    expect(join('foo//', '//bar')).toBe('foo/bar')
    expect(join('foo///', '///bar')).toBe('foo/bar')
  })

  test('should handle Windows-style paths', () => {
    expect(join('foo\\bar', 'baz')).toBe('foo/bar/baz')
    expect(join('foo', 'bar\\baz')).toBe('foo/bar/baz')
    expect(join('C:\\foo', 'bar')).toBe('C:/foo/bar')
    expect(join('C:\\', 'foo', 'bar')).toBe('C:/foo/bar')
  })

  test('should handle paths with special characters', () => {
    expect(join('foo bar', 'baz')).toBe('foo bar/baz')
    expect(join('foo', 'bar!@#$%', 'baz')).toBe('foo/bar!@#$%/baz')
    expect(join('foo', 'bar spaces', 'baz')).toBe('foo/bar spaces/baz')
  })

  test('should handle file extensions', () => {
    expect(join('foo', 'bar.txt')).toBe('foo/bar.txt')
    expect(join('foo', 'bar', '.gitignore')).toBe('foo/bar/.gitignore')
    expect(join('foo.min', 'bar.js')).toBe('foo.min/bar.js')
  })

  test('should handle no arguments', () => {
    expect(join()).toBe('.')
  })

  test('should handle single argument', () => {
    expect(join('foo')).toBe('foo')
    expect(join('/foo')).toBe('/foo')
    expect(join('.')).toBe('.')
    expect(join('..')).toBe('..')
  })

  test('should handle UNC paths', () => {
    expect(join('\\\\server', 'share')).toBe('//server/share')
    expect(join('//server', 'share', 'foo')).toBe('//server/share/foo')
  })

  test('should handle mixed forward and backward slashes', () => {
    expect(join('foo\\bar', '/baz')).toBe('foo/bar/baz')
    expect(join('foo/bar', '\\baz')).toBe('foo/bar/baz')
    expect(join('foo\\bar\\', '/baz/')).toBe('foo/bar/baz')
  })
})
