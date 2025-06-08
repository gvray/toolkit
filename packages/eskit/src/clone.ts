/**
 * Creates a deep clone of an object using JSON serialization.
 * 使用JSON序列化创建对象的深度克隆。
 *
 * @param obj - The object to clone / 要克隆的对象
 * @returns A deep clone of the object / 对象的深度克隆
 *
 * @example
 * ```typescript
 * const original = {
 *   a: 1,
 *   b: { c: 2, d: [3, 4] },
 *   e: 'hello'
 * }
 *
 * const cloned = clone(original)
 * console.log(cloned) // { a: 1, b: { c: 2, d: [3, 4] }, e: 'hello' }
 *
 * // Modifications to clone don't affect original
 * cloned.a = 999
 * cloned.b.c = 888
 * cloned.b.d.push(5)
 *
 * console.log(original.a) // 1 (unchanged)
 * console.log(original.b.c) // 2 (unchanged)
 * console.log(original.b.d) // [3, 4] (unchanged)
 *
 * // Works with arrays
 * const arr = [1, { a: 2 }, [3, 4]]
 * const clonedArr = clone(arr)
 * clonedArr[1].a = 999
 * console.log(arr[1].a) // 2 (unchanged)
 *
 * // Note: Only works with JSON-serializable values
 * // Functions, undefined, symbols, dates will be lost or converted
 * const withFunction = { fn: () => 'hello', date: new Date() }
 * const clonedWithFunction = clone(withFunction)
 * console.log(clonedWithFunction.fn) // undefined
 * console.log(typeof clonedWithFunction.date) // 'string'
 * ```
 *
 * @since 1.0.0
 */
const clone = <T>(obj: T): T => {
  return JSON.parse(JSON.stringify(obj))
}

export default clone
