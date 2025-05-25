import { isWithin } from '../src'

describe('isWithin', () => {
  test('应该正确判断路径是否在目录内', () => {
    expect(isWithin('/foo/bar', '/foo/bar/baz')).toBe(true)
    expect(isWithin('/foo/bar', '/foo/bar')).toBe(true)
    expect(isWithin('/foo/bar', '/foo/baz')).toBe(false)
  })

  test('应该正确处理 Windows 风格的路径', () => {
    expect(isWithin('C:\\temp\\foo', 'C:\\temp\\foo\\bar')).toBe(true)
    expect(isWithin('C:\\temp\\foo', 'C:\\temp\\bar')).toBe(false)
    expect(isWithin('C:\\temp', 'D:\\temp\\foo')).toBe(false)
  })

  test('应该正确处理相对路径', () => {
    expect(isWithin('./foo/bar', './foo/bar/baz')).toBe(true)
    expect(isWithin('foo/bar', 'foo/bar/baz')).toBe(true)
    expect(isWithin('../foo/bar', '../foo/bar/baz')).toBe(true)
  })

  test('应该正确处理路径规范化', () => {
    expect(isWithin('/foo/bar', '/foo/bar/baz/../qux')).toBe(true)
    expect(isWithin('/foo/bar', '/foo/baz/../bar/qux')).toBe(true)
    expect(isWithin('/foo/bar', '/foo/bar/../baz')).toBe(false)
  })

  test('应该正确处理末尾斜杠', () => {
    expect(isWithin('/foo/bar/', '/foo/bar/baz')).toBe(true)
    expect(isWithin('/foo/bar', '/foo/bar/baz/')).toBe(true)
    expect(isWithin('/foo/bar/', '/foo/bar/baz/')).toBe(true)
  })

  test('应该正确处理空路径', () => {
    expect(isWithin('', '/foo/bar')).toBe(true)
    expect(isWithin('/foo/bar', '')).toBe(false)
  })

  test('应该抛出类型错误', () => {
    // @ts-expect-error: 测试非字符串输入
    expect(() => isWithin(123, '/foo')).toThrow(TypeError)
    // @ts-expect-error: 测试非字符串输入
    expect(() => isWithin('/foo', null)).toThrow(TypeError)
    // @ts-expect-error: 测试非字符串输入
    expect(() => isWithin(undefined, '/foo')).toThrow(TypeError)
  })
})
