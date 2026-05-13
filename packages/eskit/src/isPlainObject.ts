/**
 * Checks whether a value is a plain object created by `{}` or `Object.create(null)`.
 * 检查值是否为由 `{}` 或 `Object.create(null)` 创建的普通对象。
 *
 * @param value - The value to check / 要检查的值
 * @returns `true` when the value is a plain object / 值是普通对象时返回 `true`
 * @example
 * isPlainObject({})
 * // -> true
 */
const isPlainObject = (value: unknown): value is Record<PropertyKey, unknown> => {
  if (Object.prototype.toString.call(value) !== '[object Object]') {
    return false
  }

  const prototype = Object.getPrototypeOf(value)
  return prototype === null || prototype === Object.prototype
}

export default isPlainObject
