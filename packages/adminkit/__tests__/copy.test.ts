import { copyText, copyLink, copyRichText, copyImage, copyCode, copyTable } from '../src/copy'

// Mock navigator.clipboard
const mockClipboard = {
  writeText: jest.fn().mockResolvedValue(undefined),
  write: jest.fn().mockResolvedValue(undefined)
}

// Mock document.execCommand
const mockExecCommand = jest.fn().mockReturnValue(true)

// Mock DOM elements
const mockElement = {
  style: {},
  value: '',
  innerHTML: '',
  textContent: '',
  outerHTML: '<table><tr><th>标题1</th><th>标题2</th></tr><tr><td>内容1</td><td>内容2</td></tr></table>',
  focus: jest.fn(),
  select: jest.fn(),
  remove: jest.fn(),
  appendChild: jest.fn()
}

const mockCreateElement = jest.fn().mockReturnValue(mockElement)
const mockAppendChild = jest.fn()

// Mock Blob and ClipboardItem
global.Blob = jest.fn().mockImplementation((content, options) => ({
  type: options?.type || 'text/plain',
  content
}))

global.ClipboardItem = jest.fn().mockImplementation((data) => ({ data })) as any
;(global.ClipboardItem as any).supports = jest.fn().mockReturnValue(true)

describe('copy', () => {
  beforeEach(() => {
    jest.clearAllMocks()

    // Setup global mocks
    Object.defineProperty(global, 'navigator', {
      value: {
        clipboard: mockClipboard
      },
      writable: true,
      configurable: true
    })

    // Mock window.isSecureContext
    ;(global as any).isSecureContext = true

    // Mock document methods
    document.execCommand = mockExecCommand
    document.createElement = mockCreateElement
    document.createRange = jest.fn().mockReturnValue({
      selectNodeContents: jest.fn()
    })

    // Mock window.getSelection
    ;(global as any).getSelection = jest.fn().mockReturnValue({
      removeAllRanges: jest.fn(),
      addRange: jest.fn()
    })

    // Mock document.body
    if (!document.body) {
      ;(document as any).body = {}
    }
    document.body.appendChild = mockAppendChild
  })

  describe('copyText', () => {
    it('should use Clipboard API when available', async () => {
      const text = 'test text'
      const result = await copyText(text)

      expect(result).toBe(true)
      expect(mockClipboard.writeText).toHaveBeenCalledWith(text)
    })

    it('should use execCommand when Clipboard API is not available', async () => {
      // Disable secure context
      ;(global as any).isSecureContext = false

      const text = 'test text'
      const result = await copyText(text)

      expect(result).toBe(true)
      expect(mockExecCommand).toHaveBeenCalledWith('copy')
      expect(mockCreateElement).toHaveBeenCalledWith('textarea')
    })

    it('should return false when execCommand fails', async () => {
      ;(global as any).isSecureContext = false
      mockExecCommand.mockReturnValueOnce(false)

      const text = 'test text'
      const result = await copyText(text)

      expect(result).toBe(false)
    })
  })

  describe('copyLink', () => {
    it('should copy link with title', async () => {
      const url = 'https://example.com'
      const title = 'Example Site'

      const result = await copyLink(url, title)

      expect(result).toBe(true)
      expect(mockClipboard.writeText).toHaveBeenCalledWith(`${title}\n${url}`)
    })

    it('should copy link without title', async () => {
      const url = 'https://example.com'

      const result = await copyLink(url)

      expect(result).toBe(true)
      expect(mockClipboard.writeText).toHaveBeenCalledWith(url)
    })
  })

  describe('copyRichText', () => {
    it('应该使用 Clipboard API 复制富文本', async () => {
      const html = '<p>测试</p>'
      const fallbackText = '测试'

      const result = await copyRichText(html, fallbackText)

      expect(result).toBe(true)
      expect(mockClipboard.write).toHaveBeenCalled()
    })

    it('在 Clipboard API 不可用时应该使用 execCommand', async () => {
      Object.defineProperty(global, 'isSecureContext', {
        value: false
      })

      const html = '<p>测试</p>'
      const fallbackText = '测试'

      const result = await copyRichText(html, fallbackText)

      expect(result).toBe(true)
      expect(mockExecCommand).toHaveBeenCalledWith('copy')
    })
  })

  describe('copyImage', () => {
    it('应该正确复制图片', async () => {
      const imageUrl = 'https://example.com/image.png'
      const mockBlob = { type: 'image/png' }
      global.fetch = jest.fn().mockResolvedValueOnce({
        blob: () => Promise.resolve(mockBlob)
      })

      const result = await copyImage(imageUrl)

      expect(result).toBe(true)
      expect(mockClipboard.write).toHaveBeenCalled()
    })

    it('在不支持的环境下应该返回失败', async () => {
      Object.defineProperty(global, 'isSecureContext', {
        value: false
      })

      const imageUrl = 'https://example.com/image.png'
      const result = await copyImage(imageUrl)

      expect(result).toBe(false)
    })
  })

  describe('copyCode', () => {
    it('应该正确复制带语言标识的代码', async () => {
      const code = 'const x = 1;'
      const language = 'javascript'

      const result = await copyCode(code, language)

      expect(result).toBe(true)
      expect(mockClipboard.write).toHaveBeenCalled()
    })

    it('应该正确复制不带语言标识的代码', async () => {
      const code = 'const x = 1;'

      const result = await copyCode(code)

      expect(result).toBe(true)
      expect(mockClipboard.write).toHaveBeenCalled()
    })
  })

  describe('copyTable', () => {
    it('应该正确复制表格数据', async () => {
      const data = [
        ['标题1', '标题2'],
        ['内容1', '内容2']
      ]

      const result = await copyTable(data)

      expect(result).toBe(true)
      expect(mockClipboard.write).toHaveBeenCalled()
    })

    it('应该使用自定义分隔符', async () => {
      const data = [
        ['标题1', '标题2'],
        ['内容1', '内容2']
      ]
      const options = { delimiter: ',' }

      const result = await copyTable(data, options)

      expect(result).toBe(true)
      expect(mockClipboard.write).toHaveBeenCalled()
    })
  })
})
