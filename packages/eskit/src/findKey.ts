/**
 * Finds the first key whose value matches a predicate.
 * 查找第一个满足断言条件的键。
 *
 * @template T - The source object type / 源对象类型
 * @param object - The source object / 源对象
 * @param predicate - The match predicate / 匹配断言
 * @returns The first matching key, or `undefined` / 第一个匹配的键，或 `undefined`
 * @example
 * findKey({ a: 1, b: 2 }, (value) => value > 1)
 * // -> 'b'
 */
const findKey = <T extends Record<string, unknown>>(
  object: T,
  predicate: (value: T[keyof T], key: keyof T) => boolean
): keyof T | undefined => {
  const keys = Object.keys(object) as Array<keyof T>

  return keys.find((key: keyof T) => predicate(object[key], key))
}

export default findKey
