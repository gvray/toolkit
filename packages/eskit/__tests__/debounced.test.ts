import debounce from '../src/debounced'

describe('debounce', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  test('should debounce function calls', () => {
    const mockFn = jest.fn()
    const debouncedFn = debounce(mockFn, 100)

    debouncedFn()
    debouncedFn()
    debouncedFn()

    expect(mockFn).not.toHaveBeenCalled()

    jest.advanceTimersByTime(100)
    expect(mockFn).toHaveBeenCalledTimes(1)
  })

  test('should pass arguments to debounced function', () => {
    const mockFn = jest.fn()
    const debouncedFn = debounce(mockFn, 100)

    debouncedFn('arg1', 'arg2')
    jest.advanceTimersByTime(100)

    expect(mockFn).toHaveBeenCalledWith('arg1', 'arg2')
  })

  test('should reset timer on subsequent calls', () => {
    const mockFn = jest.fn()
    const debouncedFn = debounce(mockFn, 100)

    debouncedFn()
    jest.advanceTimersByTime(50)
    debouncedFn()
    jest.advanceTimersByTime(50)

    expect(mockFn).not.toHaveBeenCalled()

    jest.advanceTimersByTime(50)
    expect(mockFn).toHaveBeenCalledTimes(1)
  })

  test('should handle immediate execution', () => {
    const mockFn = jest.fn()
    const debouncedFn = debounce(mockFn, 100, true)

    debouncedFn()
    expect(mockFn).toHaveBeenCalledTimes(1)

    debouncedFn()
    expect(mockFn).toHaveBeenCalledTimes(1)

    jest.advanceTimersByTime(100)
    debouncedFn()
    expect(mockFn).toHaveBeenCalledTimes(2)
  })

  test('should support cancel functionality', () => {
    const mockFn = jest.fn()
    const debouncedFn = debounce(mockFn, 100)

    debouncedFn()
    debouncedFn.cancel()

    jest.advanceTimersByTime(100)
    expect(mockFn).not.toHaveBeenCalled()
  })

  test('should support flush functionality', () => {
    const mockFn = jest.fn()
    const debouncedFn = debounce(mockFn, 100)

    debouncedFn('test')
    debouncedFn.flush()

    expect(mockFn).toHaveBeenCalledWith('test')
    expect(mockFn).toHaveBeenCalledTimes(1)
  })

  test('should support pending functionality', () => {
    const mockFn = jest.fn()
    const debouncedFn = debounce(mockFn, 100)

    expect(debouncedFn.pending()).toBe(false)

    debouncedFn()
    expect(debouncedFn.pending()).toBe(true)

    jest.advanceTimersByTime(100)
    expect(debouncedFn.pending()).toBe(false)
  })
})
