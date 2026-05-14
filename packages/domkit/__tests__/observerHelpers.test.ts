import {
  createIntersectionObserver,
  createMutationObserver,
  createResizeObserver
} from '../src'

class MockIntersectionObserver {
  observe = jest.fn()
  disconnect = jest.fn()

  constructor(public callback: IntersectionObserverCallback, public options?: IntersectionObserverInit) {}
}

class MockResizeObserver {
  observe = jest.fn()
  disconnect = jest.fn()

  constructor(public callback: ResizeObserverCallback) {}
}

class MockMutationObserver {
  observe = jest.fn()
  disconnect = jest.fn()

  constructor(public callback: MutationCallback) {}
}

describe('observer helpers', () => {
  const originalIntersectionObserver = window.IntersectionObserver
  const originalResizeObserver = window.ResizeObserver
  const originalMutationObserver = window.MutationObserver

  beforeEach(() => {
    Object.defineProperty(window, 'IntersectionObserver', {
      value: MockIntersectionObserver,
      writable: true,
      configurable: true
    })
    Object.defineProperty(window, 'ResizeObserver', {
      value: MockResizeObserver,
      writable: true,
      configurable: true
    })
    Object.defineProperty(window, 'MutationObserver', {
      value: MockMutationObserver,
      writable: true,
      configurable: true
    })
    global.IntersectionObserver = MockIntersectionObserver as unknown as typeof IntersectionObserver
    global.ResizeObserver = MockResizeObserver as unknown as typeof ResizeObserver
    global.MutationObserver = MockMutationObserver as unknown as typeof MutationObserver
  })

  afterEach(() => {
    Object.defineProperty(window, 'IntersectionObserver', {
      value: originalIntersectionObserver,
      writable: true,
      configurable: true
    })
    Object.defineProperty(window, 'ResizeObserver', {
      value: originalResizeObserver,
      writable: true,
      configurable: true
    })
    Object.defineProperty(window, 'MutationObserver', {
      value: originalMutationObserver,
      writable: true,
      configurable: true
    })
    global.IntersectionObserver = originalIntersectionObserver
    global.ResizeObserver = originalResizeObserver
    global.MutationObserver = originalMutationObserver
  })

  test('creates an intersection observer for one or many targets', () => {
    const callback = jest.fn()
    const one = document.createElement('div')
    const two = document.createElement('div')

    const observer = createIntersectionObserver([one, two], callback, { threshold: 0.5 }) as unknown as MockIntersectionObserver

    expect(observer.callback).toBe(callback)
    expect(observer.options).toEqual({ threshold: 0.5 })
    expect(observer.observe).toHaveBeenCalledTimes(2)
    expect(observer.observe).toHaveBeenNthCalledWith(1, one)
    expect(observer.observe).toHaveBeenNthCalledWith(2, two)
  })

  test('creates a resize observer', () => {
    const callback = jest.fn()
    const one = document.createElement('div')
    const observer = createResizeObserver(one, callback) as unknown as MockResizeObserver

    expect(observer.callback).toBe(callback)
    expect(observer.observe).toHaveBeenCalledWith(one)
  })

  test('creates a mutation observer with default options', () => {
    const callback = jest.fn()
    const target = document.createElement('div')
    const observer = createMutationObserver(target, callback) as unknown as MockMutationObserver

    expect(observer.callback).toBe(callback)
    expect(observer.observe).toHaveBeenCalledWith(target, { childList: true, subtree: true })
  })

  test('creates a mutation observer with custom options', () => {
    const callback = jest.fn()
    const target = document.createElement('div')
    const options = { attributes: true }
    const observer = createMutationObserver(target, callback, options) as unknown as MockMutationObserver

    expect(observer.observe).toHaveBeenCalledWith(target, options)
  })
})
