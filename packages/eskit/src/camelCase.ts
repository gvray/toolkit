import { splitWords } from './_internal/words'

/**
 * Converts a string to camelCase.
 * 将字符串转换为 camelCase。
 *
 * @param value - The source string / 源字符串
 * @returns The camel-cased string / 转换后的 camelCase 字符串
 * @example
 * camelCase('foo-bar')
 * // -> 'fooBar'
 */
const camelCase = (value: string): string => {
  const wordList = splitWords(value.toLowerCase())

  return wordList
    .map((word: string, index: number) => (index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)))
    .join('')
}

export default camelCase
