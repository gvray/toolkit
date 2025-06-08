import isObjectLike from './isObjectLike'
import isArrayLike from './isArrayLike'
import isString from './isString'
/**
 * Performs deep equality comparison between two values.
 * 执行两个值之间的深度相等比较。
 *
 * @param value - The first value to compare / 要比较的第一个值
 * @param other - The second value to compare / 要比较的第二个值
 * @returns True if the values are deeply equal / 如果值深度相等则返回true
 *
 * @example
 * ```typescript
 * // Primitive values
 * isEqual(1, 1) // true
 * isEqual('hello', 'hello') // true
 * isEqual(true, true) // true
 * isEqual(null, null) // true
 * isEqual(undefined, undefined) // true
 *
 * // Different primitive values
 * isEqual(1, 2) // false
 * isEqual('hello', 'world') // false
 * isEqual(null, undefined) // false
 *
 * // Arrays
 * isEqual([1, 2, 3], [1, 2, 3]) // true
 * isEqual(['a', 'b'], ['a', 'b']) // true
 * isEqual([1, 2], [1, 2, 3]) // false (different lengths)
 * isEqual([1, 2], [2, 1]) // false (different order)
 *
 * // Nested arrays
 * isEqual([[1, 2], [3, 4]], [[1, 2], [3, 4]]) // true
 * isEqual([[1, 2], [3, 4]], [[1, 2], [3, 5]]) // false
 *
 * // Objects
 * isEqual({ a: 1, b: 2 }, { a: 1, b: 2 }) // true
 * isEqual({ a: 1, b: 2 }, { b: 2, a: 1 }) // true (key order doesn't matter)
 * isEqual({ a: 1 }, { a: 1, b: 2 }) // false (different keys)
 *
 * // Nested objects
 * isEqual({ a: { b: { c: 1 } } }, { a: { b: { c: 1 } } }) // true
 * isEqual({ a: { b: { c: 1 } } }, { a: { b: { c: 2 } } }) // false
 *
 * // Mixed structures
 * const obj1 = { users: [{ name: 'Alice', age: 25 }], count: 1 }
 * const obj2 = { users: [{ name: 'Alice', age: 25 }], count: 1 }
 * isEqual(obj1, obj2) // true
 * ```
 *
 * @since 1.0.0
 */
const isEqual = (value: any, other: any): boolean => {
  if (value === other) {
    return true
  }
  if (!value || !other) {
    return false
  }
  if (isString(value) || isString(other)) {
    return false
  }
  if (isArrayLike(value) || isArrayLike(other)) {
    if (value.length !== other.length) {
      return false
    }
    let rst = true
    for (let i = 0; i < value.length; i++) {
      rst = isEqual(value[i], other[i])
      if (!rst) {
        break
      }
    }
    return rst
  }
  if (isObjectLike(value) || isObjectLike(other)) {
    const valueKeys = Object.keys(value)
    const otherKeys = Object.keys(other)
    if (valueKeys.length !== otherKeys.length) {
      return false
    }
    let rst = true
    for (let i = 0; i < valueKeys.length; i++) {
      rst = isEqual(value[valueKeys[i]], other[valueKeys[i]])
      if (!rst) {
        break
      }
    }
    return rst
  }
  return false
}

export default isEqual
