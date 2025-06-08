/**
 * Filters elements of an array or object based on a callback function.
 * 根据回调函数过滤数组或对象的元素。
 *
 * @param collection - The array or object to filter / 要过滤的数组或对象
 * @param callback - The function to call for each element / 为每个元素调用的函数
 * @returns A new array or object with filtered elements / 包含过滤元素的新数组或对象
 *
 * @example
 * ```typescript
 * // Array filtering
 * const numbers = [1, 2, 3, 4, 5]
 * const evenNumbers = filter(numbers, (num) => num % 2 === 0)
 * console.log(evenNumbers) // [2, 4]
 *
 * const users = [
 *   { name: 'Alice', age: 25 },
 *   { name: 'Bob', age: 17 },
 *   { name: 'Charlie', age: 30 }
 * ]
 * const adults = filter(users, (user) => user.age >= 18)
 * console.log(adults) // [{ name: 'Alice', age: 25 }, { name: 'Charlie', age: 30 }]
 *
 * // Object filtering
 * const obj = { a: 1, b: 2, c: 3, d: 4, e: 5 }
 * const evenValues = filter(obj, (value) => value % 2 === 0)
 * console.log(evenValues) // { b: 2, d: 4 }
 *
 * const config = { debug: true, timeout: 5000, retries: 3, verbose: false }
 * const booleanSettings = filter(config, (value) => typeof value === 'boolean')
 * console.log(booleanSettings) // { debug: true, verbose: false }
 * ```
 *
 * @since 1.0.0
 */
const filter = <T extends Array<unknown> | Record<string, unknown>>(
  collection: T,
  callback: (
    value: T extends Array<infer U> ? U : T[keyof T],
    indexOrKey: T extends Array<unknown> ? number : keyof T,
    collection: T
  ) => boolean
): T => {
  const filteredCollection: T = Array.isArray(collection) ? ([] as any) : ({} as T)

  for (const [indexOrKey, value] of Object.entries(collection)) {
    if (callback(value as any, indexOrKey as any, collection)) {
      if (Array.isArray(filteredCollection)) {
        filteredCollection.push(value as any)
      } else {
        filteredCollection[indexOrKey as any] = value as any
      }
    }
  }

  return filteredCollection
}

export default filter
