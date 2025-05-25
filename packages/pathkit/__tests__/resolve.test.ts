import { resolve } from '../src'

describe('resolve', () => {
  test('应该正确解析绝对路径', () => {
    expect(resolve('/foo/bar', './baz')).toBe('/foo/bar/baz')
    expect(resolve('/foo/bar', '/baz')).toBe('/baz')
    expect(resolve('/foo/bar', '../baz')).toBe('/foo/baz')
  })

  test('应该正确处理 Windows 风格的路径', () => {
    expect(resolve('C:\\temp', 'foo', 'bar')).toBe('C:/temp/foo/bar')
    expect(resolve('D:\\', 'projects', 'test')).toBe('D:/projects/test')
  })

  test('应该正确处理相对路径', () => {
    const cwd = process.cwd()
    expect(resolve('foo/bar')).toBe(`${cwd}/foo/bar`)
    expect(resolve('./foo/bar')).toBe(`${cwd}/foo/bar`)
    expect(resolve('foo', '../bar')).toBe(`${cwd}/bar`)
  })

  test('应该正确处理多个路径片段', () => {
    expect(resolve('/foo', 'bar', 'baz', './qux')).toBe('/foo/bar/baz/qux')
    expect(resolve('/foo', 'bar', '../baz', './qux')).toBe('/foo/baz/qux')
  })

  test('应该正确处理空路径片段', () => {
    expect(resolve('', 'foo')).toBe(`${process.cwd()}/foo`)
    expect(resolve('foo', '')).toBe(`${process.cwd()}/foo`)
    expect(resolve('', '')).toBe(process.cwd())
  })

  test('应该正确处理 .. 和 .', () => {
    expect(resolve('/foo/bar', '../baz')).toBe('/foo/baz')
    expect(resolve('/foo/bar', '../../baz')).toBe('/baz')
    expect(resolve('/foo/bar', './baz')).toBe('/foo/bar/baz')
    expect(resolve('/foo/bar', '.', 'baz')).toBe('/foo/bar/baz')
  })

  test('应该正确处理多个斜杠', () => {
    expect(resolve('/foo//bar')).toBe('/foo/bar')
    expect(resolve('//foo///bar')).toBe('/foo/bar')
  })

  test('应该抛出类型错误', () => {
    // @ts-expect-error: 测试非字符串输入
    expect(() => resolve(123)).toThrow(TypeError)
    // @ts-expect-error: 测试非字符串输入
    expect(() => resolve('/foo', null)).toThrow(TypeError)
    // @ts-expect-error: 测试非字符串输入
    expect(() => resolve('/foo', undefined)).toThrow(TypeError)
  })
})
