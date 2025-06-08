import isError from '../src/isError'

describe('isError', () => {
  test('should return true for Error instances', () => {
    expect(isError(new Error())).toBe(true)
    expect(isError(new TypeError())).toBe(true)
    expect(isError(new ReferenceError())).toBe(true)
    expect(isError(new SyntaxError())).toBe(true)
    expect(isError(new RangeError())).toBe(true)
    expect(isError(new URIError())).toBe(true)
    expect(isError(new EvalError())).toBe(true)
  })

  test('should return true for custom error classes', () => {
    class CustomError extends Error {
      constructor(message: string) {
        super(message)
        this.name = 'CustomError'
      }
    }
    expect(isError(new CustomError('test'))).toBe(true)
  })

  test('should return true for errors with custom properties', () => {
    const error = new Error('test')
    ;(error as any).customProp = 'custom'
    expect(isError(error)).toBe(true)
  })

  test('should return false for error-like objects', () => {
    const errorLike = {
      name: 'Error',
      message: 'test',
      stack: 'stack trace'
    }
    expect(isError(errorLike)).toBe(false)
  })

  test('should return false for non-errors', () => {
    expect(isError(null)).toBe(false)
    expect(isError(undefined)).toBe(false)
    expect(isError(42)).toBe(false)
    expect(isError('error')).toBe(false)
    expect(isError(true)).toBe(false)
    expect(isError({})).toBe(false)
    expect(isError([])).toBe(false)
    expect(isError(() => {})).toBe(false)
    expect(isError(new Date())).toBe(false)
  })

  test('should handle errors in promises', async () => {
    const error = new Error('async error')
    try {
      await Promise.reject(error)
    } catch (e) {
      expect(isError(e)).toBe(true)
    }
  })

  test('should handle errors with modified prototypes', () => {
    const error = new Error('test')
    Object.setPrototypeOf(error, null)
    expect(isError(error)).toBe(true)
  })
})
