/**
 * Creates a new object by shallow-merging two objects.
 * 通过浅合并两个对象创建一个新对象。
 *
 * @template T - The base object type / 基础对象类型
 * @template U - The overriding object type / 覆盖对象类型
 * @param object - The base object / 基础对象
 * @param source - The overriding object / 覆盖对象
 * @returns A new merged object / 合并后的新对象
 * @example
 * merge({ a: 1 }, { b: 2 })
 * // -> { a: 1, b: 2 }
 */
const merge = <T extends Record<PropertyKey, unknown>, U extends Record<PropertyKey, unknown>>(
  object: T,
  source: U
): T & U => {
  return { ...object, ...source }
}

export default merge
