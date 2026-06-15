export function formatList(
  items: string[],
  locale = 'zh-CN',
  options: Intl.ListFormatOptions = {}
): string {
  return new Intl.ListFormat(locale, options).format(items);
}

export function pluralize(count: number, singular: string, plural = `${singular}s`): string {
  return count === 1 ? singular : plural;
}

/**
 * Truncates text with ellipsis.
 * 截断文本并追加省略号。
 *
 * @example
 * truncateText('Hello World', 8) // => 'Hello...'
 * @since 1.0.0
 */
export function truncateText(text: string, maxLength: number, ellipsis = '...'): string {
  if (maxLength < 0) {
    throw new RangeError('maxLength must be non-negative');
  }
  if (text.length <= maxLength) {
    return text;
  }
  return text.slice(0, Math.max(0, maxLength - ellipsis.length)) + ellipsis;
}
