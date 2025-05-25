import { fromFileUrl } from '../src'

describe('fromFileUrl', () => {
  test('应该正确处理普通路径', () => {
    expect(fromFileUrl('file:///foo/bar')).toBe('/foo/bar')
    expect(fromFileUrl('file:///foo/bar/')).toBe('/foo/bar')
  })

  test('应该正确处理 Windows 路径', () => {
    expect(fromFileUrl('file:///C:/temp/foo.txt')).toBe('C:/temp/foo.txt')
    expect(fromFileUrl('file:///D:/projects/test')).toBe('D:/projects/test')
  })

  test('应该正确处理 UNC 路径', () => {
    expect(fromFileUrl('file://host/share/file.txt')).toBe('//host/share/file.txt')
    expect(fromFileUrl('file://localhost/c$/file.txt')).toBe('//localhost/c$/file.txt')
  })

  test('应该正确处理包含编码字符的路径', () => {
    expect(fromFileUrl('file:///foo%20bar/baz')).toBe('/foo bar/baz')
    expect(fromFileUrl('file:///foo%3Fbar/baz')).toBe('/foo?bar/baz')
    expect(fromFileUrl('file:///foo%23bar/baz')).toBe('/foo#bar/baz')
  })

  test('应该正确处理空路径', () => {
    expect(fromFileUrl('file:///')).toBe('/')
  })

  test('应该抛出错误当 URL 格式无效时', () => {
    expect(() => fromFileUrl('http://example.com')).toThrow('URL must be a file URL')
    expect(() => fromFileUrl('ftp://example.com')).toThrow('URL must be a file URL')
  })

  test('应该抛出错误当 URL 编码无效时', () => {
    expect(() => fromFileUrl('file:///foo%2bar')).toThrow('Invalid URL encoding')
  })

  test('应该抛出类型错误', () => {
    // @ts-expect-error: 测试非字符串输入
    expect(() => fromFileUrl(123)).toThrow(TypeError)
    // @ts-expect-error: 测试非字符串输入
    expect(() => fromFileUrl(null)).toThrow(TypeError)
    // @ts-expect-error: 测试非字符串输入
    expect(() => fromFileUrl(undefined)).toThrow(TypeError)
  })
})
