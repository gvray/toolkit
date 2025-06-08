import isFunction from './isFunction'
import isEqual from './isEqual'
/**
 * Performs deep comparison with a custom comparator function.
 * 使用自定义比较函数执行深度比较。
 *
 * @param value - The first value to compare / 要比较的第一个值
 * @param other - The second value to compare / 要比较的第二个值
 * @param fn - Custom comparator function / 自定义比较函数
 * @returns True if values are equivalent according to comparator / 如果根据比较器值相等则返回true
 *
 * @example
 * ```typescript
 * // Custom comparison for arrays (only compare lengths)
 * const compareArraysByLength = (v1: any, v2: any) => {
 *   if (Array.isArray(v1) && Array.isArray(v2)) {
 *     return v1.length === v2.length
 *   }
 *   return undefined // Use default comparison
 * }
 *
 * isEqualWith([1, 2, 3], [4, 5, 6], compareArraysByLength) // true (same length)
 * isEqualWith([1, 2], [4, 5, 6], compareArraysByLength) // false (different length)
 *
 * // Custom comparison for objects (ignore specific keys)
 * const compareIgnoringId = (v1: any, v2: any) => {
 *   if (typeof v1 === 'object' && typeof v2 === 'object' && v1 && v2) {
 *     const { id: id1, ...rest1 } = v1
 *     const { id: id2, ...rest2 } = v2
 *     return isEqual(rest1, rest2)
 *   }
 *   return undefined
 * }
 *
 * const user1 = { id: 1, name: 'Alice', email: 'alice@example.com' }
 * const user2 = { id: 2, name: 'Alice', email: 'alice@example.com' }
 * isEqualWith(user1, user2, compareIgnoringId) // true (ignore id field)
 *
 * // Case-insensitive string comparison
 * const caseInsensitiveCompare = (v1: any, v2: any) => {
 *   if (typeof v1 === 'string' && typeof v2 === 'string') {
 *     return v1.toLowerCase() === v2.toLowerCase()
 *   }
 *   return undefined
 * }
 *
 * isEqualWith('Hello', 'HELLO', caseInsensitiveCompare) // true
 * isEqualWith('Hello', 'World', caseInsensitiveCompare) // false
 *
 * // Falls back to default comparison if no custom function provided
 * isEqualWith([1, 2, 3], [1, 2, 3], null) // true (uses isEqual internally)
 * ```
 *
 * @since 1.0.0
 */
const isEqualWith = <T>(value: T, other: T, fn: (v1: T, v2: T) => boolean): boolean => {
  if (!isFunction(fn)) {
    return isEqual(value, other)
  }
  return !!fn(value, other)
}
export default isEqualWith
