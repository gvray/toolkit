import toString from './toString'
/**
 * Converts the first character of a string to lowercase.
 * 将字符串的第一个字符转换为小写。
 *
 * @param value - The string to convert / 要转换的字符串
 * @returns The string with the first character in lowercase / 第一个字符为小写的字符串
 *
 * @example
 * ```typescript
 * lowerFirst('Apple') // "apple"
 * lowerFirst('HELLO WORLD') // "hELLO WORLD"
 * lowerFirst('Hello') // "hello"
 * lowerFirst('') // ""
 * lowerFirst('A') // "a"
 * lowerFirst('123ABC') // "123ABC"
 * lowerFirst('Åpple') // "åpple" (works with Unicode)
 * ```
 *
 * @since 1.0.0
 */
const lowerFirst = (value: string): string => {
  const str = toString(value)
  return str.charAt(0).toLowerCase() + str.substring(1)
}

export default lowerFirst
