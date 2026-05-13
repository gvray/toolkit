/**
 * Checks whether a value is a symbol.
 * 检查值是否为 symbol。
 *
 * @param value - The value to check / 要检查的值
 * @returns `true` when the value is a symbol / 值是 symbol 时返回 `true`
 * @example
 * isSymbol(Symbol('s'))
 * // -> true
 */
const isSymbol = (value: unknown): value is symbol => {
  return typeof value === 'symbol'
}

export default isSymbol
