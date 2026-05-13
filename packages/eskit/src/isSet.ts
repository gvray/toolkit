/**
 * Checks whether a value is a `Set`.
 * 检查值是否为 `Set`。
 *
 * @param value - The value to check / 要检查的值
 * @returns `true` when the value is a `Set` / 值是 `Set` 时返回 `true`
 * @example
 * isSet(new Set())
 * // -> true
 */
const isSet = (value: unknown): value is Set<unknown> => {
  return value instanceof Set
}

export default isSet
