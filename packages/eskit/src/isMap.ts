/**
 * Checks whether a value is a `Map`.
 * 检查值是否为 `Map`。
 *
 * @param value - The value to check / 要检查的值
 * @returns `true` when the value is a `Map` / 值是 `Map` 时返回 `true`
 * @example
 * isMap(new Map())
 * // -> true
 */
const isMap = (value: unknown): value is Map<unknown, unknown> => {
  return value instanceof Map
}

export default isMap
