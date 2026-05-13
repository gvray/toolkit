import { splitWords } from './_internal/words'

/**
 * Converts a string to kebab-case.
 * 将字符串转换为 kebab-case。
 *
 * @param value - The source string / 源字符串
 * @returns The kebab-cased string / 转换后的 kebab-case 字符串
 * @example
 * kebabCase('fooBar')
 * // -> 'foo-bar'
 */
const kebabCase = (value: string): string => {
  return splitWords(value)
    .map((word: string) => word.toLowerCase())
    .join('-')
}

export default kebabCase
