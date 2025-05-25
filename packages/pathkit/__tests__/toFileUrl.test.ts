import { toFileUrl } from '../src'

describe('toFileUrl', () => {
  test('应该正确处理普通路径', () => {
    expect(toFileUrl('/foo/bar')).toBe('file:///foo/bar')
    expect(toFileUrl('foo/bar')).toBe('file:///foo/bar')
    expect(toFileUrl('./foo/bar')).toBe('file:///foo/bar')
  })

  test('应该正确处理 Windows 路径', () => {
    expect(toFileUrl('C:\\temp\\foo.txt')).toBe('file:///C:/temp/foo.txt')
    expect(toFileUrl('D:\\projects\\test')).toBe('file:///D:/projects/test')
  })

  test('应该正确处理 UNC 路径', () => {
    expect(toFileUrl('//host/share/file.txt')).toBe('file://host/share/file.txt')
    expect(toFileUrl('\\\\host\\share\\file.txt')).toBe('file://host/share/file.txt')
  })

  test('应该正确处理包含特殊字符的路径', () => {
    expect(toFileUrl('/foo bar/baz')).toBe('file:///foo%20bar/baz')
    expect(toFileUrl('/foo?bar/baz')).toBe('file:///foo%3Fbar/baz')
    expect(toFileUrl('/foo#bar/baz')).toBe('file:///foo%23bar/baz')
  })

  test('应该正确处理空路径', () => {
    expect(toFileUrl('')).toBe('file:///')
  })

  test('应该正确处理根路径', () => {
    expect(toFileUrl('/')).toBe('file:///')
  })

  test('应该抛出类型错误', () => {
    // @ts-expect-error: 测试非字符串输入
    expect(() => toFileUrl(123)).toThrow(TypeError)
    // @ts-expect-error: 测试非字符串输入
    expect(() => toFileUrl(null)).toThrow(TypeError)
    // @ts-expect-error: 测试非字符串输入
    expect(() => toFileUrl(undefined)).toThrow(TypeError)
  })
})
