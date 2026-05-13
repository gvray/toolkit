const unescapeMap: Record<string, string> = {
  '&amp;': '&',
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&#39;': "'"
}

/**
 * Unescapes common HTML entities in a string.
 * 反转义字符串中的常见 HTML 实体。
 *
 * @param value - The source string / 源字符串
 * @returns The unescaped string / 反转义后的字符串
 * @example
 * unescape('&lt;script&gt;')
 * // -> '<script>'
 */
const unescape = (value: string): string => {
  return value.replace(/&(amp|lt|gt|quot|#39);/g, (entity: string) => unescapeMap[entity])
}

export default unescape
