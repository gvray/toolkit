/**
 * Creates a deep clone of a JSON-serializable value.
 * 使用 JSON 序列化创建可 JSON 化值的深拷贝。
 *
 * @template T - The value type / 值类型
 * @param value - The value to clone / 要克隆的值
 * @returns A cloned value / 克隆后的值
 * @example
 * jsonClone({ a: 1, b: { c: 2 } })
 * // -> { a: 1, b: { c: 2 } }
 */
const jsonClone = <T>(value: T): T => {
  return JSON.parse(JSON.stringify(value))
}

export default jsonClone
