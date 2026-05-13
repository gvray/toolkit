import { splitWords } from './_internal/words'

/**
 * Converts a string to Title Case.
 * 将字符串转换为 Title Case。
 *
 * @param value - The source string / 源字符串
 * @returns The title-cased string / 转换后的 Title Case 字符串
 * @example
 * titleCase('hello world')
 * // -> 'Hello World'
 */
const titleCase = (value: string): string => {
  return splitWords(value)
    .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')
}

export default titleCase
