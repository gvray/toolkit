import toString from './toString'
/**
 * Converts the first character of a string to uppercase.
 * 将字符串的第一个字符转换为大写。
 *
 * @param value - The string to modify / 要修改的字符串
 * @returns The string with the first character in uppercase / 第一个字符为大写的字符串
 *
 * @example
 * ```typescript
 * upperFirst('hello world') // "Hello world"
 * upperFirst('HELLO WORLD') // "HELLO WORLD"
 * upperFirst('hello') // "Hello"
 * upperFirst('') // ""
 * upperFirst('a') // "A"
 * upperFirst('123abc') // "123abc"
 * upperFirst('åpple') // "Åpple" (works with Unicode)
 * ```
 *
 * @since 1.0.0
 */
const upperFirst = (value: string): string => {
  const str = toString(value)
  return str.charAt(0).toUpperCase() + str.substring(1)
}

export default upperFirst
