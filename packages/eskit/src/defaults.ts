/**
 * Fills `undefined` properties in an object with default values.
 * 仅为对象中值为 `undefined` 的属性填充默认值。
 *
 * @template T - The target object type / 目标对象类型
 * @template D - The defaults object type / 默认值对象类型
 * @param object - The target object / 目标对象
 * @param source - The defaults source / 默认值来源
 * @returns A new object with defaults applied / 应用默认值后的新对象
 * @example
 * defaults({ a: 1 }, { a: 9, b: 2 })
 * // -> { a: 1, b: 2 }
 */
const defaults = <T extends Record<PropertyKey, unknown>, D extends Record<PropertyKey, unknown>>(
  object: T,
  source: D
): T & D => {
  const result = { ...object } as T & D

  Object.keys(source).forEach((key: string) => {
    const typedKey = key as keyof D

    if (result[typedKey] === undefined) {
      result[typedKey] = source[typedKey] as (T & D)[keyof (T & D)]
    }
  })

  return result
}

export default defaults
