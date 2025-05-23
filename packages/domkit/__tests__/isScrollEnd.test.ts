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
  })

  afterEach(() => {
    document.body.removeChild(container)
  })

  test('should return true when scrolled to bottom', () => {
    container.scrollTop = 400 // container height (100) + content height (500) - container height (100)
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

    document.documentElement.scrollTop = 0
    expect(isScrollEnd()).toBe(false)

    document.documentElement.scrollTop = document.documentElement.scrollHeight - document.documentElement.clientHeight
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

    expect(isScrollEnd(noScrollContainer)).toBe(true)
    document.body.removeChild(noScrollContainer)
  })

  test('should handle elements with padding and margin', () => {
    container.style.padding = '10px'
    content.style.margin = '10px'

    container.scrollTop = container.scrollHeight - container.clientHeight
    expect(isScrollEnd(container)).toBe(true)
  })

  test('should handle elements with border', () => {
    container.style.border = '10px solid black'
    container.scrollTop = container.scrollHeight - container.clientHeight
    expect(isScrollEnd(container)).toBe(true)
  })

  test('should handle undefined element', () => {
    expect(isScrollEnd(undefined)).toBe(false)
  })
})
