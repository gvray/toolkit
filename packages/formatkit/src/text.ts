/**
 * Truncates text with ellipsis.
 * 截断文本并追加省略号。
 */
export function truncateText(text: string, maxLength: number, ellipsis = '...'): string {
  if (maxLength < 0) {
    throw new RangeError('maxLength must be non-negative')
  }
  if (text.length <= maxLength) {
    return text
  }
  return text.slice(0, Math.max(0, maxLength - ellipsis.length)) + ellipsis
}

/**
 * English list formatting.
 * 英文列表格式化。
 */
export function formatList(items: string[], locale = 'en'): string {
  return new Intl.ListFormat(locale, { style: 'long', type: 'conjunction' }).format(items)
}

/**
 * English pluralization helper.
 * 英文复数格式化。
 */
export function pluralize(count: number, singular: string, plural?: string): string {
  const word = count === 1 ? singular : plural ?? `${singular}s`
  return `${count} ${word}`
}
