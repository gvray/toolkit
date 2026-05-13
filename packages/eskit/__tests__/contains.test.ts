import { includesValue } from '../src'

describe('includesValue', () => {
  it('should return true if an array contains the value', () => {
    const input = [1, 2, 3, 4]
    const value = 3
    expect(includesValue(input, value)).toBe(true)
  })

  it('should return false if an array does not contain the value', () => {
    const input = [1, 2, 3, 4]
    const value = 5
    expect(includesValue(input, value)).toBe(false)
  })

  it('should return true if a string contains the value', () => {
    const input = 'hello world'
    const value = 'worl'
    expect(includesValue(input, value)).toBe(true)
  })

  it('should return false if a string does not contain the value', () => {
    const input = 'hello world'
    const value = 'foo'
    expect(includesValue(input, value)).toBe(false)
  })

  it('supports a start position', () => {
    expect(includesValue([1, 2, 3], 1, 1)).toBe(false)
    expect(includesValue('hello', 'h', 1)).toBe(false)
  })
})
