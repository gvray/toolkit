import { addClass } from '../src'

describe('addClass', () => {
  let element: HTMLElement

  beforeEach(() => {
    element = document.createElement('div')
  })

  test('should add a single class to an element', () => {
    addClass(element, 'test-class')
    expect(element.className).toBe('test-class')
  })

  test('should add multiple classes to an element', () => {
    addClass(element, 'test-class-1 test-class-2')
    expect(element.className).toBe('test-class-1 test-class-2')
  })

  test('should not add duplicate classes', () => {
    element.className = 'existing-class'
    addClass(element, 'existing-class')
    expect(element.className).toBe('existing-class')
  })

  test('should handle multiple spaces between class names', () => {
    addClass(element, 'class1   class2     class3')
    expect(element.className).toBe('class1 class2 class3')
  })

  test('should handle leading and trailing spaces', () => {
    addClass(element, '  class1  class2  ')
    expect(element.className).toBe('class1 class2')
  })

  test('should add classes to element with existing classes', () => {
    element.className = 'existing-class'
    addClass(element, 'new-class')
    expect(element.className).toBe('existing-class new-class')
  })

  test('should handle empty class names', () => {
    addClass(element, '')
    expect(element.className).toBe('')
  })

  test('should handle null and undefined elements', () => {
    // @ts-ignore - 测试错误情况
    expect(() => addClass(null, 'test')).not.toThrow()
    // @ts-ignore - 测试错误情况
    expect(() => addClass(undefined, 'test')).not.toThrow()
  })

  test('should handle special characters in class names', () => {
    addClass(element, 'class:name class@name class#name')
    expect(element.className).toBe('class:name class@name class#name')
  })

  test('should handle numeric class names', () => {
    addClass(element, 'class1 2 class3')
    expect(element.className).toBe('class1 2 class3')
  })

  test('should handle SVG elements', () => {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    addClass(svg, 'svg-class')
    expect(svg.getAttribute('class')).toBe('svg-class')
  })
})
