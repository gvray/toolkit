import isFunction from './isFunction';
import isEqual from './isEqual';
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
 * // Compare arrays by length only
 * const byLength = (v1, v2) => Array.isArray(v1) && Array.isArray(v2) ? v1.length === v2.length : undefined
 * isEqualWith([1, 2, 3], [4, 5, 6], byLength) // => true
 * isEqualWith([1, 2], [4, 5, 6], byLength) // => false
 *
 * // Case-insensitive string comparison
 * const caseInsensitive = (v1, v2) => typeof v1 === 'string' && typeof v2 === 'string'
 *   ? v1.toLowerCase() === v2.toLowerCase() : undefined
 * isEqualWith('Hello', 'HELLO', caseInsensitive) // => true
 * isEqualWith('Hello', 'World', caseInsensitive) // => false
 *
 * // Falls back to isEqual if no custom function
 * isEqualWith([1, 2, 3], [1, 2, 3], null) // => true
 * ```
 *
 * @since 1.0.0
 */
const isEqualWith = <T>(value: T, other: T, fn: (v1: T, v2: T) => boolean | undefined): boolean => {
  if (!isFunction(fn)) {
    return isEqual(value, other);
  }
  const result = fn(value, other);
  return result === undefined ? isEqual(value, other) : result;
};
export default isEqualWith;
