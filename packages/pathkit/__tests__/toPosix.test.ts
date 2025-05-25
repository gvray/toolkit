import { toPosix } from '../src'

describe('toPosix', () => {
  test('应该正确处理 Windows 路径', () => {
    expect(toPosix('C:\\temp\\foo\\bar')).toBe('/c/temp/foo/bar')
    expect(toPosix('D:\\projects\\test')).toBe('/d/projects/test')
  })

  test('应该正确处理 UNC 路径', () => {
    expect(toPosix('\\\\server\\share\\foo')).toBe('//server/share/foo')
    expect(toPosix('\\\\localhost\\c$\\file.txt')).toBe('//localhost/c$/file.txt')
  })

  test('应该正确处理相对路径', () => {
    expect(toPosix('foo\\bar\\baz')).toBe('foo/bar/baz')
    expect(toPosix('.\\foo\\bar')).toBe('./foo/bar')
    expect(toPosix('..\\foo\\bar')).toBe('../foo/bar')
  })

  test('应该正确处理已经是 POSIX 格式的路径', () => {
    expect(toPosix('/foo/bar')).toBe('/foo/bar')
    expect(toPosix('foo/bar')).toBe('foo/bar')
    expect(toPosix('./foo/bar')).toBe('./foo/bar')
  })

  test('应该正确处理多个连续的分隔符', () => {
    expect(toPosix('foo\\\\bar\\\\\\baz')).toBe('foo/bar/baz')
    expect(toPosix('\\\\\\foo\\\\bar')).toBe('//foo/bar')
  })

  test('应该正确处理空路径', () => {
    expect(toPosix('')).toBe('.')
  })

  test('应该正确处理根路径', () => {
    expect(toPosix('\\')).toBe('/')
    expect(toPosix('/')).toBe('/')
  })

  test('应该移除末尾的斜杠（除非是根路径）', () => {
    expect(toPosix('foo\\bar\\')).toBe('foo/bar')
    expect(toPosix('C:\\foo\\bar\\')).toBe('/c/foo/bar')
    expect(toPosix('/')).toBe('/')
  })

  test('应该抛出类型错误', () => {
    // @ts-expect-error: 测试非字符串输入
    expect(() => toPosix(123)).toThrow(TypeError)
    // @ts-expect-error: 测试非字符串输入
    expect(() => toPosix(null)).toThrow(TypeError)
    // @ts-expect-error: 测试非字符串输入
    expect(() => toPosix(undefined)).toThrow(TypeError)
  })
})
