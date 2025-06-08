/**
 * 复制文本到剪贴板
 * @param text 要复制的文本
 * @returns Promise<boolean> 是否复制成功
 */
export async function copyText(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      // 优先使用 Clipboard API
      await navigator.clipboard.writeText(text)
      return true
    } else {
      // 降级使用 execCommand
      const textArea = document.createElement('textarea')
      textArea.value = text
      textArea.style.position = 'fixed'
      textArea.style.left = '-999999px'
      textArea.style.top = '-999999px'
      document.body.appendChild(textArea)
      textArea.focus()
      textArea.select()

      try {
        const success = document.execCommand('copy')
        textArea.remove()
        return success
      } catch (err) {
        textArea.remove()
        return false
      }
    }
  } catch (err) {
    return false
  }
}

/**
 * 复制链接（带标题）到剪贴板
 * @param url 要复制的 URL
 * @param title 可选的标题
 * @returns Promise<boolean> 是否复制成功
 */
export async function copyLink(url: string, title?: string): Promise<boolean> {
  const text = title ? `${title}\n${url}` : url
  return copyText(text)
}

/**
 * 复制富文本到剪贴板
 * @param html HTML 内容
 * @param fallbackText 降级的纯文本内容
 * @returns Promise<boolean> 是否复制成功
 */
export async function copyRichText(html: string, fallbackText: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      const clipboardItem = new ClipboardItem({
        'text/html': new Blob([html], { type: 'text/html' }),
        'text/plain': new Blob([fallbackText], { type: 'text/plain' })
      })
      await navigator.clipboard.write([clipboardItem])
      return true
    } else {
      // 降级使用 execCommand
      const div = document.createElement('div')
      div.innerHTML = html
      div.style.position = 'fixed'
      div.style.left = '-999999px'
      div.style.top = '-999999px'
      document.body.appendChild(div)

      const selection = window.getSelection()
      const range = document.createRange()
      range.selectNodeContents(div)
      selection?.removeAllRanges()
      selection?.addRange(range)

      try {
        const success = document.execCommand('copy')
        div.remove()
        return success
      } catch (err) {
        div.remove()
        // 如果富文本复制失败，尝试复制纯文本
        return copyText(fallbackText)
      }
    }
  } catch (err) {
    // 如果富文本复制失败，尝试复制纯文本
    return copyText(fallbackText)
  }
}

/**
 * 复制图片到剪贴板
 * @param imageUrl 图片 URL 或 Base64
 * @returns Promise<boolean> 是否复制成功
 */
export async function copyImage(imageUrl: string): Promise<boolean> {
  try {
    if (!navigator.clipboard || !window.isSecureContext) {
      return false
    }

    const response = await fetch(imageUrl)
    const blob = await response.blob()
    const clipboardItem = new ClipboardItem({
      [blob.type]: blob
    })

    await navigator.clipboard.write([clipboardItem])
    return true
  } catch (err) {
    return false
  }
}

/**
 * 复制代码到剪贴板（保留格式）
 * @param code 要复制的代码
 * @param language 可选的语言标识
 * @returns Promise<boolean> 是否复制成功
 */
export async function copyCode(code: string, language?: string): Promise<boolean> {
  const html = `<pre><code${language ? ` class="language-${language}"` : ''}>${code}</code></pre>`
  return copyRichText(html, code)
}

/**
 * 复制表格数据到剪贴板
 * @param data 表格数据
 * @param options 可选配置
 * @returns Promise<boolean> 是否复制成功
 */
export async function copyTable(
  data: (string | number)[][],
  options: {
    header?: boolean
    delimiter?: string
  } = {}
): Promise<boolean> {
  const { delimiter = '\t', header = true } = options

  // 创建 HTML 表格
  const table = document.createElement('table')
  data.forEach((row, rowIndex) => {
    const tr = document.createElement('tr')
    row.forEach((cell) => {
      const tag = header && rowIndex === 0 ? 'th' : 'td'
      const cellElement = document.createElement(tag)
      cellElement.textContent = String(cell)
      tr.appendChild(cellElement)
    })
    table.appendChild(tr)
  })

  // 创建纯文本版本（用于降级）
  const text = data.map((row) => row.join(delimiter)).join('\n')

  return copyRichText(table.outerHTML, text)
}
