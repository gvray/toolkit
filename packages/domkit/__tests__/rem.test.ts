import rem from '../src/rem'

describe('rem', () => {
  const originalDocumentElement = document.documentElement
  let mockDocumentElement: HTMLElement

  beforeEach(() => {
    mockDocumentElement = document.createElement('html')
    Object.defineProperty(document, 'documentElement', {
      value: mockDocumentElement,
      writable: true
    })
  })

  afterEach(() => {
    Object.defineProperty(document, 'documentElement', {
      value: originalDocumentElement,
      writable: true
    })
  })

  test('should set root font size based on device width', () => {
    // 模拟设备宽度为 375px
    Object.defineProperty(mockDocumentElement, 'clientWidth', {
      value: 375,
      writable: true
    })

    rem(750) // 设计稿宽度为 750px
    expect(mockDocumentElement.style.fontSize).toBe('50px')
  })

  test('should handle different device widths', () => {
    // iPhone SE (320px)
    Object.defineProperty(mockDocumentElement, 'clientWidth', {
      value: 320,
      writable: true
    })
    rem(750)
    expect(mockDocumentElement.style.fontSize).toBe('42.66666666666667px')

    // iPhone X (375px)
    Object.defineProperty(mockDocumentElement, 'clientWidth', {
      value: 375,
      writable: true
    })
    rem(750)
    expect(mockDocumentElement.style.fontSize).toBe('50px')

    // iPhone Plus (414px)
    Object.defineProperty(mockDocumentElement, 'clientWidth', {
      value: 414,
      writable: true
    })
    rem(750)
    expect(mockDocumentElement.style.fontSize).toBe('55.2px')
  })

  test('should handle minimum width', () => {
    Object.defineProperty(mockDocumentElement, 'clientWidth', {
      value: 100,
      writable: true
    })
    rem(750)
    expect(mockDocumentElement.style.fontSize).toBe('13.333333333333334px')
  })

  test('should handle maximum width', () => {
    Object.defineProperty(mockDocumentElement, 'clientWidth', {
      value: 1000,
      writable: true
    })
    rem(750)
    expect(parseFloat(mockDocumentElement.style.fontSize)).toBeCloseTo(133.33333333333334, 10)
  })

  test('should update on window resize', (done) => {
    Object.defineProperty(mockDocumentElement, 'clientWidth', {
      value: 375,
      writable: true
    })
    rem(750)
    expect(mockDocumentElement.style.fontSize).toBe('50px')

    // 模拟窗口调整大小
    Object.defineProperty(mockDocumentElement, 'clientWidth', {
      value: 414,
      writable: true
    })
    window.dispatchEvent(new Event('resize'))

    // 等待 requestAnimationFrame 执行
    requestAnimationFrame(() => {
      expect(mockDocumentElement.style.fontSize).toBe('55.2px')
      done()
    })
  })

  test('should handle zero width', () => {
    Object.defineProperty(mockDocumentElement, 'clientWidth', {
      value: 0,
      writable: true
    })
    rem(750)
    expect(mockDocumentElement.style.fontSize).toBe('0px')
  })

  test('should handle negative width', () => {
    Object.defineProperty(mockDocumentElement, 'clientWidth', {
      value: -100,
      writable: true
    })
    rem(750)
    expect(mockDocumentElement.style.fontSize).toBe('0px')
  })
})
