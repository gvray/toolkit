import isNil from './isNil'
/**
 * Converts a value to a string representation.
 * 将值转换为字符串表示。
 *
 * @param value - The value to convert / 要转换的值
 * @returns The string representation, or empty string for null/undefined / 字符串表示，null/undefined返回空字符串
 *
 * @example
 * ```typescript
 * toString(123) // '123'
 * toString('hello') // 'hello'
 * toString(true) // 'true'
 * toString(false) // 'false'
 * toString([1, 2, 3]) // '1,2,3'
 * toString({ a: 1 }) // '[object Object]'
 * toString(new Date('2023-01-01')) // 'Sun Jan 01 2023...'
 * toString(null) // ''
 * toString(undefined) // ''
 * toString(Symbol('test')) // 'Symbol(test)'
 * toString(BigInt(123)) // '123'
 * ```
 *
 * @since 1.0.0
 */
const toString = (value: any): string => {
  if (isNil(value)) return ''
  return value.toString()
}

export default toString
