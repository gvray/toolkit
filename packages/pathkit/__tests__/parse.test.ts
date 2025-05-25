import { parse } from '../src'

describe('parse', () => {
  test('should parse basic Unix-style paths', () => {
    expect(parse('/home/user/file.txt')).toEqual({
      root: '/',
      dir: '/home/user',
      base: 'file.txt',
      name: 'file',
      ext: '.txt'
    })
  })

  test('should parse Windows-style paths', () => {
    expect(parse('C:\\Users\\user\\file.txt')).toEqual({
      root: 'C:/',
      dir: 'C:/Users/user',
      base: 'file.txt',
      name: 'file',
      ext: '.txt'
    })
  })

  test('should parse paths without extension', () => {
    expect(parse('/usr/local/bin/node')).toEqual({
      root: '/',
      dir: '/usr/local/bin',
      base: 'node',
      name: 'node',
      ext: ''
    })
  })

  test('should parse paths with multiple dots', () => {
    expect(parse('/home/user/file.min.js')).toEqual({
      root: '/',
      dir: '/home/user',
      base: 'file.min.js',
      name: 'file.min',
      ext: '.js'
    })
  })

  test('should parse relative paths', () => {
    expect(parse('user/docs/file.pdf')).toEqual({
      root: '',
      dir: 'user/docs',
      base: 'file.pdf',
      name: 'file',
      ext: '.pdf'
    })
  })

  test('should parse paths with dots', () => {
    expect(parse('./config/.env')).toEqual({
      root: '',
      dir: './config',
      base: '.env',
      name: '.env',
      ext: ''
    })
  })

  test('should parse empty paths', () => {
    expect(parse('')).toEqual({
      root: '',
      dir: '',
      base: '',
      name: '',
      ext: ''
    })
  })

  test('should parse root paths', () => {
    expect(parse('/')).toEqual({
      root: '/',
      dir: '/',
      base: '',
      name: '',
      ext: ''
    })
  })

  test('should parse UNC paths', () => {
    expect(parse('\\\\server\\share\\file.txt')).toEqual({
      root: '//',
      dir: '//server/share',
      base: 'file.txt',
      name: 'file',
      ext: '.txt'
    })
  })

  test('should parse paths with special characters', () => {
    expect(parse('/path/to/file!@#$%.txt')).toEqual({
      root: '/',
      dir: '/path/to',
      base: 'file!@#$%.txt',
      name: 'file!@#$%',
      ext: '.txt'
    })
  })

  test('should throw for invalid inputs', () => {
    // @ts-ignore
    expect(() => parse(null)).toThrow(TypeError)
    // @ts-ignore
    expect(() => parse(undefined)).toThrow(TypeError)
    // @ts-ignore
    expect(() => parse(123)).toThrow(TypeError)
  })
})
