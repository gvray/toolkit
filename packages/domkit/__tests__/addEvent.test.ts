import { addEvent } from '../src'

describe('addEvent', () => {
  let element: HTMLElement
  let handler: jest.Mock

  beforeEach(() => {
    element = document.createElement('div')
    handler = jest.fn()
  })

  afterEach(() => {
    handler.mockClear()
  })

  test('should add click event listener', () => {
    addEvent(element, 'click', handler)
    element.click()
    expect(handler).toHaveBeenCalledTimes(1)
  })

  test('should add multiple event listeners for different events', () => {
    addEvent(element, 'mousedown', handler)
    addEvent(element, 'mouseup', handler)

    const mouseDownEvent = new MouseEvent('mousedown')
    const mouseUpEvent = new MouseEvent('mouseup')

    element.dispatchEvent(mouseDownEvent)
    element.dispatchEvent(mouseUpEvent)

    expect(handler).toHaveBeenCalledTimes(2)
  })

  test('should handle event with options', () => {
    const options = { useCapture: true }
    addEvent(element, 'click', handler, options)

    element.click()
    expect(handler).toHaveBeenCalledTimes(1)
  })

  test('should handle event with throttle', () => {
    const options = { useThrottle: true }
    addEvent(element, 'click', handler, options)

    element.click()
    element.click()
    element.click()

    expect(handler).toHaveBeenCalledTimes(1)
  })

  test('should handle event with debounce', () => {
    const options = { useDebounce: true }
    addEvent(element, 'click', handler, options)

    element.click()
    element.click()
    element.click()

    // 等待防抖结束
    jest.runAllTimers()
    expect(handler).toHaveBeenCalledTimes(1)
  })

  test('should handle null and undefined elements', () => {
    // @ts-ignore - 测试错误情况
    expect(() => addEvent(null, 'click', handler)).not.toThrow()
    // @ts-ignore - 测试错误情况
    expect(() => addEvent(undefined, 'click', handler)).not.toThrow()
  })

  test('should handle event bubbling', () => {
    const parent = document.createElement('div')
    const child = document.createElement('div')
    parent.appendChild(child)

    const parentHandler = jest.fn()
    const childHandler = jest.fn()

    addEvent(parent, 'click', parentHandler)
    addEvent(child, 'click', childHandler)

    child.click()

    expect(childHandler).toHaveBeenCalledTimes(1)
    expect(parentHandler).toHaveBeenCalledTimes(1)
  })

  test('should handle event capturing', () => {
    const parent = document.createElement('div')
    const child = document.createElement('div')
    parent.appendChild(child)

    const captureHandler = jest.fn((e) => e.stopPropagation())
    const bubbleHandler = jest.fn()

    addEvent(parent, 'click', captureHandler, { useCapture: true })
    addEvent(child, 'click', bubbleHandler)

    child.click()

    expect(captureHandler).toHaveBeenCalledTimes(1)
    expect(bubbleHandler).not.toHaveBeenCalled()
  })

  test('should handle HTMLElement events', () => {
    const input = document.createElement('input')
    addEvent(input, 'input', handler)
    input.dispatchEvent(new Event('input'))
    expect(handler).toHaveBeenCalledTimes(1)
  })

  test('should handle SVGElement events', () => {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    addEvent(svg, 'click', handler)
    svg.dispatchEvent(new MouseEvent('click'))
    expect(handler).toHaveBeenCalledTimes(1)
  })
})
