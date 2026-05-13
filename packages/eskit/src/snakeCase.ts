import { splitWords } from './_internal/words'

/**
 * Converts a string to snake_case.
 * 将字符串转换为 snake_case。
 *
 * @param value - The source string / 源字符串
 * @returns The snake-cased string / 转换后的 snake_case 字符串
 * @example
 * snakeCase('fooBar')
 * // -> 'foo_bar'
 */
const snakeCase = (value: string): string => {
  return splitWords(value)
    .map((word: string) => word.toLowerCase())
    .join('_')
}

export default snakeCase
