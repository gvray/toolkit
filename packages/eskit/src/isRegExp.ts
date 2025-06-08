import isType from './isType'
/**
 * Checks if a value is a regular expression.
 * 检查值是否为正则表达式。
 *
 * @param value - The value to check / 要检查的值
 * @returns True if the value is a regular expression / 如果值是正则表达式则返回true
 *
 * @example
 * ```typescript
 * isRegExp(/ab+c/i) // true
 * isRegExp(new RegExp('pattern')) // true
 * isRegExp(new RegExp('\\d+', 'g')) // true
 * isRegExp(/^[a-z]+$/gi) // true
 * isRegExp('hello') // false
 * isRegExp('/pattern/') // false (string, not regex)
 * isRegExp({}) // false
 * isRegExp(null) // false
 * isRegExp(undefined) // false
 * ```
 *
 * @since 1.0.0
 */
const isRegExp = (value: unknown): value is RegExp => isType('RegExp', value)

export default isRegExp
