import preload from '../src/preload'
import type { PreloadType } from '../src/preload'

describe('preload', () => {
  beforeEach(() => {
    // 清理之前的预加载元素
    document.head.querySelectorAll('link[rel="preload"]').forEach((el) => el.remove())
  })

  test('should preload a style resource', () => {
    preload({ as: 'style', href: 'https://example.com/style.css' })
    const links = document.head.querySelectorAll('link[rel="preload"]')
    expect(links.length).toBe(1)
    expect(links[0].getAttribute('href')).toBe('https://example.com/style.css')
    expect(links[0].getAttribute('as')).toBe('style')
  })

  test('should preload a script resource', () => {
    preload({ as: 'script', href: 'https://example.com/script.js' })
    const links = document.head.querySelectorAll('link[rel="preload"]')
    expect(links.length).toBe(1)
    expect(links[0].getAttribute('href')).toBe('https://example.com/script.js')
    expect(links[0].getAttribute('as')).toBe('script')
  })

  test('should preload an image resource', () => {
    preload({ as: 'image', href: 'https://example.com/image.png' })
    const links = document.head.querySelectorAll('link[rel="preload"]')
    expect(links.length).toBe(1)
    expect(links[0].getAttribute('href')).toBe('https://example.com/image.png')
    expect(links[0].getAttribute('as')).toBe('image')
  })

  test('should preload an audio resource', () => {
    preload({ as: 'audio', href: 'https://example.com/audio.mp3' })
    const links = document.head.querySelectorAll('link[rel="preload"]')
    expect(links.length).toBe(1)
    expect(links[0].getAttribute('href')).toBe('https://example.com/audio.mp3')
    expect(links[0].getAttribute('as')).toBe('audio')
  })

  test('should preload a video resource', () => {
    preload({ as: 'video', href: 'https://example.com/video.mp4' })
    const links = document.head.querySelectorAll('link[rel="preload"]')
    expect(links.length).toBe(1)
    expect(links[0].getAttribute('href')).toBe('https://example.com/video.mp4')
    expect(links[0].getAttribute('as')).toBe('video')
  })

  test('should handle invalid URLs', () => {
    expect(() => {
      preload({ as: 'script', href: 'invalid-url' })
    }).not.toThrow()
  })

  test('should handle empty href', () => {
    expect(() => {
      preload({ as: 'script', href: '' })
    }).not.toThrow()
  })

  test('should handle multiple preloads', () => {
    const options1: { as: PreloadType; href: string } = { as: 'style', href: 'https://example.com/style1.css' }
    const options2: { as: PreloadType; href: string } = { as: 'style', href: 'https://example.com/style2.css' }
    preload(options1)
    preload(options2)
    const links = document.head.querySelectorAll('link[rel="preload"]')
    expect(links.length).toBe(2)
  })

  test('should handle duplicate preloads', () => {
    const options: { as: PreloadType; href: string } = { as: 'style', href: 'https://example.com/style.css' }
    preload(options)
    preload(options)
    const links = document.head.querySelectorAll('link[rel="preload"]')
    expect(links.length).toBe(2) // 预加载不会去重
  })
})
