import { removeClass } from '../src'

describe('removeClass', () => {
  let element: HTMLElement

  beforeEach(() => {
    element = document.createElement('div')
  })

  test('should remove a single class from an element', () => {
    element.className = 'test-class'
    removeClass(element, 'test-class')
    expect(element.className).toBe('')
  })

  test('should remove multiple classes from an element', () => {
    element.className = 'test-class-1 test-class-2'
    removeClass(element, 'test-class-1 test-class-2')
    expect(element.className).toBe('')
  })

  test('should not affect other classes when removing a specific class', () => {
    element.className = 'class1 class2 class3'
    removeClass(element, 'class2')
    expect(element.className).toBe('class1 class3')
  })

  test('should handle non-existent classes', () => {
    element.className = 'existing-class'
    removeClass(element, 'non-existent-class')
    expect(element.className).toBe('existing-class')
  })

  test('should handle multiple spaces between class names', () => {
    element.className = 'class1   class2     class3'
    removeClass(element, 'class2')
    expect(element.className).toBe('class1 class3')
  })

  test('should handle leading and trailing spaces', () => {
    element.className = 'class1 class2'
    removeClass(element, '  class1  ')
    expect(element.className).toBe('class2')
  })

  test('should handle empty class names', () => {
    element.className = 'test-class'
    removeClass(element, '')
    expect(element.className).toBe('test-class')
  })

  test('should handle null and undefined elements', () => {
    // @ts-ignore - 测试错误情况
    expect(() => removeClass(null, 'test')).not.toThrow()
    // @ts-ignore - 测试错误情况
    expect(() => removeClass(undefined, 'test')).not.toThrow()
  })

  test('should handle special characters in class names', () => {
    element.className = 'class:name class@name class#name'
    removeClass(element, 'class@name')
    expect(element.className).toBe('class:name class#name')
  })

  test('should handle numeric class names', () => {
    element.className = 'class1 2 class3'
    removeClass(element, '2')
    expect(element.className).toBe('class1 class3')
  })

  test('should handle SVG elements', () => {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    svg.setAttribute('class', 'svg-class-1 svg-class-2')
    // @ts-ignore - SVG 元素类型兼容性
    removeClass(svg, 'svg-class-1')
    expect(svg.getAttribute('class')).toBe('svg-class-2')
  })

  test('should handle removing all classes', () => {
    element.className = 'class1 class2 class3'
    removeClass(element, 'class1 class2 class3')
    expect(element.className).toBe('')
  })
})
