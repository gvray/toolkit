import { loadScript } from '../src'

describe('loadScript', () => {
  beforeEach(() => {
    // 清理之前添加的脚本
    document.head.querySelectorAll('script').forEach((script) => {
      if (script.src.includes('unpkg.com') || script.src.includes('example.com')) {
        script.remove()
      }
    })
  })

  test('should create script element and add to head', () => {
    const callback = jest.fn()
    loadScript('https://www.unpkg.com/react@16.7.0/umd/react.production.min.js', callback)

    const scripts = document.head.querySelectorAll('script')
    const addedScript = Array.from(scripts).find((script) => script.src.includes('react.production.min.js'))

    expect(addedScript).toBeTruthy()
    expect(addedScript?.src).toContain('react.production.min.js')
  })

  test('should create script with options', () => {
    const callback = jest.fn()
    const options = {
      url: 'https://www.unpkg.com/react@16.7.0/umd/react.production.min.js',
      async: true,
      cache: true,
      crossorigin: 'anonymous',
      defer: false
    }

    loadScript(options, callback)

    const scripts = document.head.querySelectorAll('script')
    const addedScript = Array.from(scripts).find((script) => script.src.includes('react.production.min.js'))

    expect(addedScript).toBeTruthy()
    expect(addedScript?.async).toBe(true)
    expect(addedScript?.crossOrigin).toBe('anonymous')
    expect(addedScript?.defer).toBe(false)
  })

  test('should handle cache=false by adding timestamp', () => {
    const callback = jest.fn()
    const options = {
      url: 'https://example.com/script.js',
      cache: false
    }

    loadScript(options, callback)

    const scripts = document.head.querySelectorAll('script')
    const addedScript = Array.from(scripts).find((script) => script.src.includes('script.js'))

    expect(addedScript?.src).toMatch(/script\.js\?_=\d+/)
  })
})
