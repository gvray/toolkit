import { removeEvent } from '../src'

describe('removeEvent', () => {
  let element: HTMLElement
  let handler: jest.Mock

  beforeEach(() => {
    element = document.createElement('div')
    handler = jest.fn()
  })

  afterEach(() => {
    handler.mockClear()
  })

  test('should remove click event listener', () => {
    element.addEventListener('click', handler)
    removeEvent(element, 'click', handler)
    element.click()
    expect(handler).not.toHaveBeenCalled()
  })

  test('should remove multiple event listeners for different events', () => {
    element.addEventListener('mousedown', handler)
    element.addEventListener('mouseup', handler)

    removeEvent(element, 'mousedown', handler)
    removeEvent(element, 'mouseup', handler)

    const mouseDownEvent = new MouseEvent('mousedown')
    const mouseUpEvent = new MouseEvent('mouseup')

    element.dispatchEvent(mouseDownEvent)
    element.dispatchEvent(mouseUpEvent)

    expect(handler).not.toHaveBeenCalled()
  })

  test('should handle event with options', () => {
    const options = { useCapture: true }
    element.addEventListener('click', handler, true)
    removeEvent(element, 'click', handler, options)

    element.click()
    expect(handler).not.toHaveBeenCalled()
  })

  test('should not affect other handlers', () => {
    const otherHandler = jest.fn()
    element.addEventListener('click', handler)
    element.addEventListener('click', otherHandler)

    removeEvent(element, 'click', handler)
    element.click()

    expect(handler).not.toHaveBeenCalled()
    expect(otherHandler).toHaveBeenCalledTimes(1)
  })

  test('should handle null and undefined elements', () => {
    // @ts-ignore - 测试错误情况
    expect(() => removeEvent(null, 'click', handler)).not.toThrow()
    // @ts-ignore - 测试错误情况
    expect(() => removeEvent(undefined, 'click', handler)).not.toThrow()
  })

  test('should handle event bubbling', () => {
    const parent = document.createElement('div')
    const child = document.createElement('div')
    parent.appendChild(child)

    const parentHandler = jest.fn()
    const childHandler = jest.fn()

    parent.addEventListener('click', parentHandler)
    child.addEventListener('click', childHandler)

    removeEvent(parent, 'click', parentHandler)
    removeEvent(child, 'click', childHandler)

    child.click()

    expect(childHandler).not.toHaveBeenCalled()
    expect(parentHandler).not.toHaveBeenCalled()
  })

  test('should handle event capturing', () => {
    const parent = document.createElement('div')
    const child = document.createElement('div')
    parent.appendChild(child)

    const captureHandler = jest.fn()
    parent.addEventListener('click', captureHandler, true)

    removeEvent(parent, 'click', captureHandler, { useCapture: true })
    child.click()

    expect(captureHandler).not.toHaveBeenCalled()
  })

  test('should handle HTMLElement events', () => {
    const input = document.createElement('input')
    input.addEventListener('input', handler)
    removeEvent(input, 'input', handler)
    input.dispatchEvent(new Event('input'))
    expect(handler).not.toHaveBeenCalled()
  })

  test('should handle SVGElement events', () => {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    svg.addEventListener('click', handler)
    removeEvent(svg, 'click', handler)
    svg.dispatchEvent(new MouseEvent('click'))
    expect(handler).not.toHaveBeenCalled()
  })

  test('should handle removing non-existent handler', () => {
    const nonExistentHandler = () => {}
    expect(() => {
      removeEvent(element, 'click', nonExistentHandler)
    }).not.toThrow()
  })
})
