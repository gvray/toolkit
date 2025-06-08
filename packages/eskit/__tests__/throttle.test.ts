import throttle from '../src/throttle'

describe('throttle', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it('should throttle function calls', () => {
    const fn = jest.fn()
    const throttled = throttle(fn, 1000)

    throttled()
    throttled()
    throttled()

    expect(fn).toHaveBeenCalledTimes(0)

    jest.advanceTimersByTime(1000)
    expect(fn).toHaveBeenCalledTimes(1)
  })

  it('should support leading edge execution', () => {
    const fn = jest.fn()
    const throttled = throttle(fn, 1000, { leading: true, trailing: false })

    throttled()
    expect(fn).toHaveBeenCalledTimes(1)

    throttled()
    throttled()
    expect(fn).toHaveBeenCalledTimes(1)

    jest.advanceTimersByTime(1000)
    expect(fn).toHaveBeenCalledTimes(1)
  })

  it('should support trailing edge execution (default)', () => {
    const fn = jest.fn()
    const throttled = throttle(fn, 1000)

    throttled()
    throttled()
    throttled()

    expect(fn).toHaveBeenCalledTimes(0)

    jest.advanceTimersByTime(1000)
    expect(fn).toHaveBeenCalledTimes(1)
  })

  it('should support both leading and trailing', () => {
    const fn = jest.fn()
    const throttled = throttle(fn, 1000, { leading: true, trailing: true })

    throttled()
    expect(fn).toHaveBeenCalledTimes(1)

    throttled()
    throttled()
    expect(fn).toHaveBeenCalledTimes(1)

    jest.advanceTimersByTime(1000)
    expect(fn).toHaveBeenCalledTimes(2)
  })

  it('should pass arguments correctly', () => {
    const fn = jest.fn()
    const throttled = throttle(fn, 1000)

    throttled('arg1', 'arg2')
    jest.advanceTimersByTime(1000)

    expect(fn).toHaveBeenCalledWith('arg1', 'arg2')
  })

  it('should use latest arguments for trailing call', () => {
    const fn = jest.fn()
    const throttled = throttle(fn, 1000)

    throttled('first')
    throttled('second')
    throttled('third')

    jest.advanceTimersByTime(1000)

    expect(fn).toHaveBeenCalledTimes(1)
    expect(fn).toHaveBeenCalledWith('third')
  })
})
