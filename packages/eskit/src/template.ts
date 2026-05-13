/**
 * Replaces `{key}` placeholders in a string with values from a data object.
 * 使用数据对象中的值替换字符串中的 `{key}` 占位符。
 *
 * @param value - The template string / 模板字符串
 * @param data - The interpolation data / 插值数据
 * @returns The interpolated string / 插值后的字符串
 * @example
 * template('Hi, {name}', { name: 'Tom' })
 * // -> 'Hi, Tom'
 */
const template = (value: string, data: Record<string, unknown>): string => {
  return value.replace(/\{([^}]+)\}/g, (_match: string, key: string) => {
    const replacement = data[key]
    return replacement === undefined ? '' : String(replacement)
  })
}

export default template
