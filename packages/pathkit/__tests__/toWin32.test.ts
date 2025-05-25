import { toWin32 } from '../src'

describe('toWin32', () => {
  test('应该正确处理 POSIX 路径', () => {
    expect(toWin32('/c/temp/foo/bar')).toBe('C:\\temp\\foo\\bar')
    expect(toWin32('/d/projects/test')).toBe('D:\\projects\\test')
  })

  test('应该正确处理 UNC 路径', () => {
    expect(toWin32('//server/share/foo')).toBe('\\\\server\\share\\foo')
    expect(toWin32('//localhost/c$/file.txt')).toBe('\\\\localhost\\c$\\file.txt')
  })

  test('应该正确处理相对路径', () => {
    expect(toWin32('foo/bar/baz')).toBe('foo\\bar\\baz')
    expect(toWin32('./foo/bar')).toBe('.\\foo\\bar')
    expect(toWin32('../foo/bar')).toBe('..\\foo\\bar')
  })

  test('应该正确处理已经是 Windows 格式的路径', () => {
    expect(toWin32('C:\\temp\\foo')).toBe('C:\\temp\\foo')
    expect(toWin32('foo\\bar')).toBe('foo\\bar')
    expect(toWin32('.\\foo\\bar')).toBe('.\\foo\\bar')
  })

  test('应该正确处理多个连续的分隔符', () => {
    expect(toWin32('foo//bar///baz')).toBe('foo\\bar\\baz')
    expect(toWin32('///foo//bar')).toBe('\\foo\\bar')
  })

  test('应该正确处理空路径', () => {
    expect(toWin32('')).toBe('.')
  })

  test('应该正确处理根路径', () => {
    expect(toWin32('/')).toBe('\\')
    expect(toWin32('\\')).toBe('\\')
  })

  test('应该移除末尾的反斜杠（除非是根路径或驱动器根路径）', () => {
    expect(toWin32('foo/bar/')).toBe('foo\\bar')
    expect(toWin32('/c/foo/bar/')).toBe('C:\\foo\\bar')
    expect(toWin32('C:\\')).toBe('C:\\')
    expect(toWin32('\\')).toBe('\\')
  })

  test('应该抛出类型错误', () => {
    // @ts-expect-error: 测试非字符串输入
    expect(() => toWin32(123)).toThrow(TypeError)
    // @ts-expect-error: 测试非字符串输入
    expect(() => toWin32(null)).toThrow(TypeError)
    // @ts-expect-error: 测试非字符串输入
    expect(() => toWin32(undefined)).toThrow(TypeError)
  })
})
