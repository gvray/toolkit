import isScrollEnd from '../src/isScrollEnd'

describe('isScrollEnd', () => {
  let container: HTMLDivElement
  let content: HTMLDivElement

  beforeEach(() => {
    container = document.createElement('div')
    container.style.height = '100px'
    container.style.width = '100px'
    container.style.overflow = 'auto'

    content = document.createElement('div')
    content.style.height = '500px'
    content.style.width = '500px'

    container.appendChild(content)
    document.body.appendChild(container)

    // Mock scrollHeight and clientHeight for JSDOM
    Object.defineProperty(container, 'scrollHeight', {
      value: 500,
      writable: true
    })
    Object.defineProperty(container, 'clientHeight', {
      value: 100,
      writable: true
    })
  })

  afterEach(() => {
    document.body.removeChild(container)
  })

  test('should return true when scrolled to bottom', () => {
    container.scrollTop = 400 // scrollHeight (500) - clientHeight (100) = 400
    expect(isScrollEnd(container)).toBe(true)
  })

  test('should return false when not scrolled to bottom', () => {
    container.scrollTop = 200
    expect(isScrollEnd(container)).toBe(false)
  })

  test('should return true when scrolled to bottom with horizontal scroll', () => {
    container.scrollTop = 400
    container.scrollLeft = 400
    expect(isScrollEnd(container)).toBe(true)
  })

  test('should handle document scroll', () => {
    const longContent = document.createElement('div')
    longContent.style.height = '2000px'
    document.body.appendChild(longContent)

    // Mock document.documentElement properties
    Object.defineProperty(document.documentElement, 'scrollHeight', {
      value: 2000,
      writable: true,
      configurable: true
    })
    Object.defineProperty(document.documentElement, 'clientHeight', {
      value: 800,
      writable: true,
      configurable: true
    })

    document.documentElement.scrollTop = 0
    expect(isScrollEnd()).toBe(false)

    document.documentElement.scrollTop = 1200 // scrollHeight (2000) - clientHeight (800) = 1200
    expect(isScrollEnd()).toBe(true)

    document.body.removeChild(longContent)
  })

  test('should handle elements with no scroll', () => {
    const noScrollContainer = document.createElement('div')
    noScrollContainer.style.height = '100px'
    noScrollContainer.style.overflow = 'auto'

    const smallContent = document.createElement('div')
    smallContent.style.height = '50px'
    noScrollContainer.appendChild(smallContent)
    document.body.appendChild(noScrollContainer)

    // Mock properties for no scroll case
    Object.defineProperty(noScrollContainer, 'scrollHeight', {
      value: 50,
      writable: true
    })
    Object.defineProperty(noScrollContainer, 'clientHeight', {
      value: 100,
      writable: true
    })

    expect(isScrollEnd(noScrollContainer)).toBe(true)
    document.body.removeChild(noScrollContainer)
  })

  test('should handle elements with padding and margin', () => {
    container.style.padding = '10px'
    content.style.margin = '10px'

    // Update mock values for padding/margin case
    Object.defineProperty(container, 'scrollHeight', {
      value: 520, // content height + margins
      writable: true
    })
    Object.defineProperty(container, 'clientHeight', {
      value: 80, // container height - padding
      writable: true
    })

    container.scrollTop = 440 // scrollHeight (520) - clientHeight (80) = 440
    expect(isScrollEnd(container)).toBe(true)
  })

  test('should handle elements with border', () => {
    container.style.border = '10px solid black'

    // Update mock values for border case
    Object.defineProperty(container, 'scrollHeight', {
      value: 500,
      writable: true
    })
    Object.defineProperty(container, 'clientHeight', {
      value: 80, // container height - border
      writable: true
    })

    container.scrollTop = 420 // scrollHeight (500) - clientHeight (80) = 420
    expect(isScrollEnd(container)).toBe(true)
  })

  test('should handle undefined element', () => {
    // When element is undefined, it should behave the same as isScrollEnd() without parameters
    // and use document.documentElement as the target element

    // Mock document.documentElement properties for this test
    Object.defineProperty(document.documentElement, 'scrollHeight', {
      value: 100,
      writable: true,
      configurable: true
    })
    Object.defineProperty(document.documentElement, 'clientHeight', {
      value: 100,
      writable: true,
      configurable: true
    })
    Object.defineProperty(document.documentElement, 'scrollTop', {
      value: 0,
      writable: true,
      configurable: true
    })

    // Since scrollHeight === clientHeight, it should return true (no scrollable content)
    expect(isScrollEnd(undefined)).toBe(true)
  })
})
