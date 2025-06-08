import isArray from './isArrayLike'
import isNil from './isNil'
/**
 * Checks if an array or string contains a specified value.
 * 检查数组或字符串是否包含指定的值。
 *
 * @param arr - The array or string to search in / 要搜索的数组或字符串
 * @param value - The value to search for / 要搜索的值
 * @param position - The index to start searching from / 开始搜索的索引位置
 * @returns True if the value is found / 如果找到值则返回true
 *
 * @example
 * ```typescript
 * // Array searching
 * const numbers = [1, 2, 3, 4, 5]
 * contains(numbers, 3) // true
 * contains(numbers, 6) // false
 * contains(numbers, 3, 3) // false (start from index 3)
 * contains(numbers, 4, 3) // true (start from index 3)
 *
 * const fruits = ['apple', 'banana', 'orange']
 * contains(fruits, 'banana') // true
 * contains(fruits, 'grape') // false
 *
 * // String searching
 * contains('hello world', 'world') // true
 * contains('hello world', 'World') // false (case sensitive)
 * contains('hello world', 'o', 5) // true (start from index 5)
 * contains('hello world', 'h', 1) // false (start from index 1)
 *
 * // Edge cases
 * contains([], 'anything') // false
 * contains('', 'anything') // false
 * contains([1, 2, null], null) // false (null values are filtered out)
 * contains([1, 2, undefined], undefined) // false (undefined values are filtered out)
 * ```
 *
 * @since 1.0.0
 */
const contains = (arr: any[] | string, value: any, position = -1): boolean => {
  if (!isArray(arr) && typeof arr !== 'string') {
    return false
  }

  if (isNil(value)) {
    return false
  }

  return position < 0 ? arr.indexOf(value) > -1 : arr.indexOf(value, position) > -1
}

export default contains
