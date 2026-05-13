/**
 * Creates a new object with transformed values.
 * 创建一个值被转换后的新对象。
 *
 * @template T - The source object type / 源对象类型
 * @template R - The mapped value type / 映射后的值类型
 * @param object - The source object / 源对象
 * @param iteratee - The value transform function / 值转换函数
 * @returns A new object with transformed values / 值转换后的新对象
 * @example
 * mapValues({ a: 1, b: 2 }, (value) => value * 2)
 * // -> { a: 2, b: 4 }
 */
const mapValues = <T extends Record<string, unknown>, R>(
  object: T,
  iteratee: (value: T[keyof T], key: keyof T) => R
): Record<string, R> => {
  const result: Record<string, R> = {}

  Object.keys(object).forEach((key: string) => {
    const typedKey = key as keyof T
    result[key] = iteratee(object[typedKey], typedKey)
  })

  return result
}

export default mapValues
