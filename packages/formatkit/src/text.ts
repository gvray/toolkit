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

/**
 * Formats a JSON string or object with indentation.
 * 将 JSON 字符串或对象格式化为带缩进的字符串。
 *
 * @example
 * formatJson({ a: 1 }) // => '{\n  "a": 1\n}'
 * formatJson('{"a":1}') // => '{\n  "a": 1\n}'
 * @since 1.3.0
 */
export function formatJson(value: unknown, indent = 2): string {
  if (typeof value === 'string') {
    try {
      return JSON.stringify(JSON.parse(value), null, indent);
    } catch {
      return value;
    }
  }
  try {
    return JSON.stringify(value, null, indent);
  } catch {
    return String(value);
  }
}

/**
 * Gets the initial character of a name for avatar placeholders.
 * 取昵称/用户名首字母作为头像占位文本。
 *
 * @example
 * getAvatarInitial('张三') // => '张'
 * getAvatarInitial('') // => '?'
 * @since 1.3.0
 */
export function getAvatarInitial(name?: string | null, fallback = '?'): string {
  const initial = name?.trim()?.[0];
  return initial ? initial.toUpperCase() : fallback;
}

/**
 * Case-insensitive string inclusion check.
 * 大小写不敏感包含判断。
 *
 * @example
 * caseInsensitiveIncludes('Hello', 'ell') // => true
 * @since 1.3.0
 */
export function caseInsensitiveIncludes(haystack: string, needle: string): boolean {
  return haystack.toLowerCase().includes(needle.toLowerCase());
}
