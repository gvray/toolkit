/**
 * Creates a new object with transformed keys.
 * 创建一个键被转换后的新对象。
 *
 * @template T - The source object type / 源对象类型
 * @param object - The source object / 源对象
 * @param iteratee - The key transform function / 键转换函数
 * @returns A new object with transformed keys / 键转换后的新对象
 * @example
 * mapKeys({ a: 1, b: 2 }, (key) => key.toUpperCase())
 * // -> { A: 1, B: 2 }
 */
const mapKeys = <T extends Record<string, unknown>>(
  object: T,
  iteratee: (key: keyof T, value: T[keyof T]) => PropertyKey
): Record<string, T[keyof T]> => {
  const result: Record<string, T[keyof T]> = {}

  Object.keys(object).forEach((key: string) => {
    const typedKey = key as keyof T
    result[String(iteratee(typedKey, object[typedKey]))] = object[typedKey]
  })

  return result
}

export default mapKeys
