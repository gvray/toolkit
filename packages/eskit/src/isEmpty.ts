import isNil from './isNil'
import isArrayLike from './isArrayLike'
import getType from './getType'
import isPrototype from './isPrototype'
import hasOwnProperty from './hasOwnProperty'

/**
 * Checks if a value is empty according to JavaScript's notion of emptiness.
 * 根据JavaScript的空值概念检查值是否为空。
 *
 * A value is considered empty if it is:
 * - `undefined` or `null`
 * - An empty string, array, or array-like object
 * - An empty Map or Set object
 * - An object with no own enumerable properties
 *
 * 以下情况被认为是空值：
 * - `undefined` 或 `null`
 * - 空字符串、数组或类数组对象
 * - 空的Map或Set对象
 * - 没有自有可枚举属性的对象
 *
 * @param value - The value to check / 要检查的值
 * @returns True if the value is empty / 如果值为空则返回true
 *
 * @example
 * ```typescript
 * // Primitive empty values / 原始空值
 * isEmpty(undefined) // true
 * isEmpty(null) // true
 * isEmpty('') // true
 * isEmpty(0) // false (zero is not empty)
 * isEmpty(false) // false (false is not empty)
 *
 * // Collections / 集合
 * isEmpty([]) // true
 * isEmpty([1, 2, 3]) // false
 * isEmpty({}) // true
 * isEmpty({ key: 'value' }) // false
 *
 * // Built-in objects / 内置对象
 * isEmpty(new Map()) // true
 * isEmpty(new Map([['key', 'value']])) // false
 * isEmpty(new Set()) // true
 * isEmpty(new Set([1, 2, 3])) // false
 *
 * // Array-like objects / 类数组对象
 * isEmpty(arguments) // true (if arguments is empty)
 * isEmpty({ length: 0 }) // true
 * isEmpty({ length: 1, 0: 'item' }) // false
 * ```
 *
 * @since 1.0.0
 */
const isEmpty = (value: any): boolean => {
  if (isNil(value)) {
    return true
  }
  if (isArrayLike(value)) {
    return !value.length
  }
  const type = getType(value)
  if (type === 'Map' || type === 'Set') {
    return !value.size
  }
  if (isPrototype(value)) {
    return !Object.keys(value).length
  }
  for (const key in value) {
    if (hasOwnProperty(value, key)) {
      return false
    }
  }
  return true
}

export default isEmpty
