const escapeMap: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;'
}

/**
 * Escapes HTML-sensitive characters in a string.
 * 转义字符串中的 HTML 敏感字符。
 *
 * @param value - The source string / 源字符串
 * @returns The escaped string / 转义后的字符串
 * @example
 * escape('<script>')
 * // -> '&lt;script&gt;'
 */
const escape = (value: string): string => {
  return value.replace(/[&<>"']/g, (character: string) => escapeMap[character])
}

export default escape
