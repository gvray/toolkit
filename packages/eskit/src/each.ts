import isArray from './isArray'
import isString from './isString'
export type Collection<V, K extends string | number = number> = V | V[] | Set<V> | Record<K, V> | Map<K, V>
/**
 * Iterates over a collection and applies a function to each element.
 * 遍历集合并对每个元素应用函数。
 *
 * This function provides a unified interface for iterating over different
 * types of collections including arrays, objects, Maps, Sets, and strings.
 * The iteration can be stopped early by returning false from the callback.
 * 此函数为遍历不同类型的集合提供统一接口，包括数组、对象、Map、Set和字符串。
 * 可以通过从回调函数返回false来提前停止迭代。
 *
 * @template V - The type of values in the collection / 集合中值的类型
 * @template K - The type of keys in the collection / 集合中键的类型
 * @param collection - The collection to iterate over / 要遍历的集合
 * @param callbackfn - The function to apply to each element / 应用于每个元素的函数
 * @returns True if all iterations complete, false if stopped early / 如果所有迭代完成返回true，如果提前停止返回false
 *
 * @example
 * ```typescript
 * // Array iteration / 数组遍历
 * const numbers = [1, 2, 3, 4, 5]
 * each(numbers, (value, index) => {
 *   console.log(`numbers[${index}] = ${value}`)
 *   return value < 3 // Stop when value >= 3
 * })
 *
 * // Object iteration / 对象遍历
 * const user = { name: 'John', age: 30, city: 'New York' }
 * each(user, (value, key) => {
 *   console.log(`${key}: ${value}`)
 * })
 *
 * // Map iteration / Map遍历
 * const userMap = new Map([
 *   ['name', 'John'],
 *   ['age', 30],
 *   ['city', 'New York']
 * ])
 * each(userMap, (value, key) => {
 *   console.log(`${key} => ${value}`)
 * })
 *
 * // Set iteration / Set遍历
 * const uniqueNumbers = new Set([1, 2, 3, 4, 5])
 * each(uniqueNumbers, (value, index) => {
 *   console.log(`Item ${index}: ${value}`)
 * })
 *
 * // String iteration / 字符串遍历
 * each('hello', (char, index) => {
 *   console.log(`char[${index}] = ${char}`)
 * })
 * ```
 *
 * @since 1.0.0
 */
const each = <V, K extends string | number = number>(
  collection: Collection<V, K>,
  callbackfn: (value: V, key: K, collection: Collection<V, K>) => boolean | undefined | void
): boolean => {
  if (!collection) {
    return false
  }

  if (isArray(collection) || isString(collection) || collection instanceof Set) {
    let i = 0
    for (const item of collection) {
      const re = callbackfn(item as V, i as K, collection)
      i++
      if (re === false) return false
    }
  } else if (collection instanceof Map) {
    for (const [key, value] of collection) {
      const re = callbackfn(value, key, collection)
      if (re === false) return false
    }
  } else {
    const entries = Object.entries<V>(collection)
    for (const [key, value] of entries) {
      const re = callbackfn(value, key as K, collection)
      if (re === false) return false
    }
  }
  return true
}

export default each
