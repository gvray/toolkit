import scrollTo from '../src/scrollTo'

describe('scrollTo', () => {
  let element: HTMLDivElement

  beforeEach(() => {
    element = document.createElement('div')
    element.style.height = '200px'
    element.style.overflow = 'auto'

    const content = document.createElement('div')
    content.style.height = '1000px'
    element.appendChild(content)

    document.body.appendChild(element)
  })

  afterEach(() => {
    document.body.removeChild(element)
  })

  test('should scroll to specific position', (done) => {
    scrollTo({ x: 0, y: 100, target: element, behavior: 'auto' })

    setTimeout(() => {
      expect(element.scrollTop).toBe(100)
      done()
    }, 0)
  })

  test('should scroll with smooth behavior', (done) => {
    const startPosition = element.scrollTop
    scrollTo({ x: 0, y: 200, target: element, behavior: 'smooth' })

    setTimeout(() => {
      const currentPosition = element.scrollTop
      expect(currentPosition).toBeGreaterThan(startPosition)
      done()
    }, 100)
  })

  test('should handle horizontal scroll', (done) => {
    element.style.width = '200px'
    const content = element.firstChild as HTMLDivElement
    content.style.width = '1000px'

    scrollTo({ x: 100, y: 0, target: element, behavior: 'auto' })

    setTimeout(() => {
      expect(element.scrollLeft).toBe(100)
      done()
    }, 0)
  })

  test('should handle both vertical and horizontal scroll', (done) => {
    element.style.width = '200px'
    const content = element.firstChild as HTMLDivElement
    content.style.width = '1000px'

    scrollTo({ x: 150, y: 150, target: element, behavior: 'auto' })

    setTimeout(() => {
      expect(element.scrollTop).toBe(150)
      expect(element.scrollLeft).toBe(150)
      done()
    }, 0)
  })

  test('should handle invalid scroll positions', () => {
    scrollTo({ x: 0, y: -100, target: element, behavior: 'auto' })
    expect(element.scrollTop).toBe(0)
  })

  test('should handle window scroll', () => {
    // Mock window.scrollTo since JSDOM doesn't implement it
    const mockScrollTo = jest.fn()
    Object.defineProperty(window, 'scrollTo', {
      value: mockScrollTo,
      writable: true
    })

    scrollTo({ x: 0, y: 100, behavior: 'auto' })
    expect(mockScrollTo).toHaveBeenCalledWith({
      top: 100,
      left: 0,
      behavior: 'auto'
    })
  })

  test('should use default values for target and behavior', () => {
    // Mock window.scrollTo since JSDOM doesn't implement it
    const mockScrollTo = jest.fn()
    Object.defineProperty(window, 'scrollTo', {
      value: mockScrollTo,
      writable: true
    })

    scrollTo({ x: 0, y: 0 })
    expect(mockScrollTo).toHaveBeenCalledWith({
      top: 0,
      left: 0,
      behavior: 'auto'
    })
  })
})
