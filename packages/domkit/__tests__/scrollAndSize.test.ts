import {
  getDocumentSize,
  getElementSize,
  getScrollPercentage,
  getViewportSize,
  isInViewport,
  scrollToElement
} from '../src'

describe('scrollToElement', () => {
  test('scrolls to the element position with offset', () => {
    const element = document.createElement('div')
    const mockScrollTo = jest.spyOn(window, 'scrollTo').mockImplementation(() => undefined)

    Object.defineProperty(window, 'pageYOffset', { value: 120, writable: true, configurable: true })
    Object.defineProperty(window, 'pageXOffset', { value: 16, writable: true, configurable: true })
    element.getBoundingClientRect = jest.fn(() => ({
      top: 200,
      left: 0,
      bottom: 240,
      right: 100,
      width: 100,
      height: 40,
      x: 0,
      y: 200,
      toJSON: () => ({})
    }))

    expect(scrollToElement(element, { behavior: 'auto', offsetTop: 20 })).toBe(true)
    expect(mockScrollTo).toHaveBeenCalledWith({
      top: 300,
      left: 16,
      behavior: 'auto'
    })

    mockScrollTo.mockRestore()
  })

  test('returns false for empty targets', () => {
    expect(scrollToElement(null)).toBe(false)
  })
})

describe('getScrollPercentage', () => {
  test('calculates window scroll percentage', () => {
    Object.defineProperty(window, 'pageYOffset', { value: 250, writable: true, configurable: true })
    Object.defineProperty(window, 'innerHeight', { value: 500, writable: true, configurable: true })
    Object.defineProperty(document.documentElement, 'scrollHeight', { value: 1500, configurable: true })

    expect(getScrollPercentage()).toBe(25)
  })

  test('calculates element scroll percentage', () => {
    const element = document.createElement('div')
    Object.defineProperty(element, 'scrollHeight', { value: 1000, configurable: true })
    Object.defineProperty(element, 'clientHeight', { value: 400, configurable: true })
    Object.defineProperty(element, 'scrollTop', { value: 150, writable: true, configurable: true })

    expect(getScrollPercentage(element)).toBe(25)
  })

  test('returns 100 when there is no scrollable overflow', () => {
    const element = document.createElement('div')
    Object.defineProperty(element, 'scrollHeight', { value: 300, configurable: true })
    Object.defineProperty(element, 'clientHeight', { value: 300, configurable: true })

    expect(getScrollPercentage(element)).toBe(100)
  })
})

describe('size helpers', () => {
  test('returns viewport size', () => {
    Object.defineProperty(window, 'innerWidth', { value: 1440, writable: true, configurable: true })
    Object.defineProperty(window, 'innerHeight', { value: 900, writable: true, configurable: true })

    expect(getViewportSize()).toEqual({ width: 1440, height: 900 })
  })

  test('returns document size', () => {
    Object.defineProperty(document.body, 'scrollWidth', { value: 1000, configurable: true })
    Object.defineProperty(document.documentElement, 'scrollWidth', { value: 1200, configurable: true })
    Object.defineProperty(document.body, 'offsetWidth', { value: 900, configurable: true })
    Object.defineProperty(document.documentElement, 'offsetWidth', { value: 1100, configurable: true })
    Object.defineProperty(document.body, 'scrollHeight', { value: 2800, configurable: true })
    Object.defineProperty(document.documentElement, 'scrollHeight', { value: 3200, configurable: true })
    Object.defineProperty(document.body, 'offsetHeight', { value: 2600, configurable: true })
    Object.defineProperty(document.documentElement, 'offsetHeight', { value: 3000, configurable: true })

    expect(getDocumentSize()).toEqual({ width: 1200, height: 3200 })
  })

  test('returns border and padding sizes', () => {
    const element = document.createElement('div')
    document.body.appendChild(element)
    element.style.borderLeft = '2px solid black'
    element.style.borderRight = '3px solid black'
    element.style.borderTop = '4px solid black'
    element.style.borderBottom = '5px solid black'
    element.getBoundingClientRect = jest.fn(() => ({
      top: 0,
      left: 0,
      bottom: 60,
      right: 105,
      width: 105,
      height: 60,
      x: 0,
      y: 0,
      toJSON: () => ({})
    }))

    expect(getElementSize(element, 'border')).toEqual({ width: 105, height: 60 })
    expect(getElementSize(element, 'padding')).toEqual({ width: 100, height: 51 })

    document.body.removeChild(element)
  })
})

describe('isInViewport', () => {
  test('returns true when the element intersects the viewport', () => {
    const element = document.createElement('div')
    Object.defineProperty(window, 'innerWidth', { value: 800, writable: true, configurable: true })
    Object.defineProperty(window, 'innerHeight', { value: 600, writable: true, configurable: true })
    element.getBoundingClientRect = jest.fn(() => ({
      top: 100,
      left: 100,
      bottom: 200,
      right: 200,
      width: 100,
      height: 100,
      x: 100,
      y: 100,
      toJSON: () => ({})
    }))

    expect(isInViewport(element)).toBe(true)
  })

  test('returns false when the element is outside the viewport', () => {
    const element = document.createElement('div')
    Object.defineProperty(window, 'innerWidth', { value: 800, writable: true, configurable: true })
    Object.defineProperty(window, 'innerHeight', { value: 600, writable: true, configurable: true })
    element.getBoundingClientRect = jest.fn(() => ({
      top: 700,
      left: 100,
      bottom: 800,
      right: 200,
      width: 100,
      height: 100,
      x: 100,
      y: 700,
      toJSON: () => ({})
    }))

    expect(isInViewport(element)).toBe(false)
  })
})
