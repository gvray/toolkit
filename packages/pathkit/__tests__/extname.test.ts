import { extname } from '../src'

describe('extname', () => {
  test('should return extension for basic file paths', () => {
    expect(extname('index.html')).toBe('.html')
    expect(extname('/path/to/index.js')).toBe('.js')
    expect(extname('file.txt')).toBe('.txt')
  })

  test('should handle multiple dots', () => {
    expect(extname('index.coffee.md')).toBe('.md')
    expect(extname('index.min.js')).toBe('.js')
    expect(extname('file.test.js')).toBe('.js')
  })

  test('should handle paths without extension', () => {
    expect(extname('index')).toBe('')
    expect(extname('/path/to/file')).toBe('')
    expect(extname('/path/to/')).toBe('')
  })

  test('should handle dotfiles', () => {
    expect(extname('.bashrc')).toBe('')
    expect(extname('.vimrc')).toBe('')
    expect(extname('.gitignore')).toBe('')
  })

  test('should handle dotfiles with extension', () => {
    expect(extname('.index.md')).toBe('.md')
    expect(extname('.config.json')).toBe('.json')
    expect(extname('.local.env')).toBe('.env')
  })

  test('should handle trailing dots', () => {
    expect(extname('index.')).toBe('.')
    expect(extname('/path/to/file.')).toBe('.')
    expect(extname('file..')).toBe('.')
  })

  test('should handle special characters', () => {
    expect(extname('file!@#.txt')).toBe('.txt')
    expect(extname('file spaces.doc')).toBe('.doc')
    expect(extname('文件.特殊')).toBe('.特殊')
  })

  test('should handle Windows-style paths', () => {
    expect(extname('C:\\path\\to\\file.txt')).toBe('.txt')
    expect(extname('\\\\server\\share\\file.doc')).toBe('.doc')
    expect(extname('folder\\file.js')).toBe('.js')
  })

  test('should handle empty paths', () => {
    expect(extname('')).toBe('')
    expect(extname('.')).toBe('')
    expect(extname('..')).toBe('')
  })

  test('should handle paths with dots in directory names', () => {
    expect(extname('/path.to/file.txt')).toBe('.txt')
    expect(extname('folder.name/file')).toBe('')
    expect(extname('./folder.test/file.js')).toBe('.js')
  })

  test('should throw for invalid inputs', () => {
    // @ts-ignore
    expect(() => extname(null)).toThrow(TypeError)
    // @ts-ignore
    expect(() => extname(undefined)).toThrow(TypeError)
    // @ts-ignore
    expect(() => extname(123)).toThrow(TypeError)
  })
})
