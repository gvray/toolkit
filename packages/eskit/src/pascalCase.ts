import { splitWords } from './_internal/words'

/**
 * Converts a string to PascalCase.
 * 将字符串转换为 PascalCase。
 *
 * @param value - The source string / 源字符串
 * @returns The Pascal-cased string / 转换后的 PascalCase 字符串
 * @example
 * pascalCase('foo-bar')
 * // -> 'FooBar'
 */
const pascalCase = (value: string): string => {
  return splitWords(value)
    .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('')
}

export default pascalCase
