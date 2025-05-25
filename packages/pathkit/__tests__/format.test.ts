import { format } from '../src'
import type { ParsedPath } from '../src'

describe('format', () => {
  test('应该正确格式化完整的路径对象', () => {
    const pathObject: ParsedPath = {
      root: '/',
      dir: '/home/user',
      base: 'file.txt',
      name: 'file',
      ext: '.txt'
    }
    expect(format(pathObject)).toBe('/home/user/file.txt')
  })

  test('应该正确处理 Windows 风格的路径对象', () => {
    const pathObject: ParsedPath = {
      root: 'C:/',
      dir: 'C:/Users/test',
      base: 'doc.pdf',
      name: 'doc',
      ext: '.pdf'
    }
    expect(format(pathObject)).toBe('C:/Users/test/doc.pdf')
  })

  test('应该正确处理只有部分属性的路径对象', () => {
    expect(format({ dir: '/home/user' })).toBe('/home/user')
    expect(format({ root: '/', base: 'file.txt' })).toBe('/file.txt')
    expect(format({ name: 'file', ext: '.txt' })).toBe('file.txt')
  })

  test('应该正确处理相对路径对象', () => {
    const pathObject: Partial<ParsedPath> = {
      dir: 'user/docs',
      base: 'readme.md'
    }
    expect(format(pathObject)).toBe('user/docs/readme.md')
  })

  test('应该正确处理没有扩展名的路径对象', () => {
    const pathObject: Partial<ParsedPath> = {
      dir: '/usr/bin',
      name: 'python',
      base: 'python'
    }
    expect(format(pathObject)).toBe('/usr/bin/python')
  })

  test('应该正确处理空路径对象', () => {
    expect(format({})).toBe('.')
  })

  test('应该优先使用 dir 而不是 root', () => {
    const pathObject: Partial<ParsedPath> = {
      root: '/root',
      dir: '/home/user',
      base: 'file.txt'
    }
    expect(format(pathObject)).toBe('/home/user/file.txt')
  })

  test('应该优先使用 base 而不是 name+ext', () => {
    const pathObject: Partial<ParsedPath> = {
      dir: '/home/user',
      base: 'file.txt',
      name: 'other',
      ext: '.md'
    }
    expect(format(pathObject)).toBe('/home/user/file.txt')
  })

  test('应该抛出类型错误', () => {
    // @ts-expect-error: 测试非对象输入
    expect(() => format(null)).toThrow(TypeError)
    // @ts-expect-error: 测试非对象输入
    expect(() => format(undefined)).toThrow(TypeError)
    // @ts-expect-error: 测试非对象输入
    expect(() => format('string')).toThrow(TypeError)
  })
})
