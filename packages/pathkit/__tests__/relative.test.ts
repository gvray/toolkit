import { relative } from '../src'

describe('relative', () => {
  test('应该正确计算相对路径', () => {
    expect(relative('/data/orandea/test/aaa', '/data/orandea/impl/bbb')).toBe('../../impl/bbb')
    expect(relative('/data/demo', '/data/demo/test')).toBe('test')
    expect(relative('/data/demo/test', '/data/demo')).toBe('..')
  })

  test('应该正确处理相同的路径', () => {
    expect(relative('/foo/bar/baz', '/foo/bar/baz')).toBe('')
    expect(relative('/foo/bar/baz/', '/foo/bar/baz')).toBe('')
    expect(relative('/foo/bar/baz', '/foo/bar/baz/')).toBe('')
  })

  test('应该正确处理 Windows 风格的路径', () => {
    expect(relative('C:\\temp\\foo', 'C:\\temp\\bar')).toBe('../bar')
    expect(relative('C:\\temp\\foo', 'C:\\temp\\foo\\bar')).toBe('bar')
    expect(relative('C:\\temp\\foo\\bar', 'C:\\temp\\foo')).toBe('..')
  })

  test('应该正确处理相对路径输入', () => {
    expect(relative('foo/bar', 'foo/baz')).toBe('../baz')
    expect(relative('./foo/bar', './foo/baz')).toBe('../baz')
    expect(relative('foo/bar/baz', 'foo/bar')).toBe('..')
  })

  test('应该正确处理不同驱动器或根的路径', () => {
    expect(relative('C:\\temp\\foo', 'D:\\temp\\bar')).toBe('D:/temp/bar')
    expect(relative('/foo/bar', 'C:\\temp\\baz')).toBe('C:/temp/baz')
  })

  test('应该正确处理复杂的相对路径', () => {
    expect(relative('/foo/bar/baz/qux', '/foo/quux/test')).toBe('../../../quux/test')
    expect(relative('/foo/bar/baz/qux/', '/foo/bar/test')).toBe('../../test')
  })

  test('应该正确处理空路径', () => {
    expect(relative('', '/foo/bar')).toBe('/foo/bar')
    expect(relative('/foo/bar', '')).toBe('../..')
  })

  test('应该抛出类型错误', () => {
    // @ts-expect-error: 测试非字符串输入
    expect(() => relative(123, '/foo')).toThrow(TypeError)
    // @ts-expect-error: 测试非字符串输入
    expect(() => relative('/foo', null)).toThrow(TypeError)
    // @ts-expect-error: 测试非字符串输入
    expect(() => relative(undefined, '/foo')).toThrow(TypeError)
  })
})
