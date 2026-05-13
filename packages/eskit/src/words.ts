import { splitWords } from './_internal/words'

/**
 * Splits a string into normalized words.
 * 将字符串拆分为标准化单词数组。
 *
 * @param value - The source string / 源字符串
 * @returns The split words / 拆分后的单词数组
 * @example
 * words('fooBar baz')
 * // -> ['foo', 'Bar', 'baz']
 */
const words = (value: string): string[] => {
  return splitWords(value)
}

export default words
