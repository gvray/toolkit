const { toString } = Object.prototype

/**
 * Gets the precise type of a value using Object.prototype.toString.
 * 使用Object.prototype.toString获取值的精确类型。
 *
 * @param value - The value to get the type of / 要获取类型的值
 * @returns The type name of the value / 值的类型名称
 *
 * @example
 * ```typescript
 * getType(42) // "Number"
 * getType("hello") // "String"
 * getType([1, 2, 3]) // "Array"
 * getType({}) // "Object"
 * getType(null) // "Null"
 * getType(undefined) // "Undefined"
 * getType(/regex/) // "RegExp"
 * getType(new Date()) // "Date"
 * getType(() => {}) // "Function"
 * getType(new Map()) // "Map"
 * getType(new Set()) // "Set"
 * ```
 *
 * @since 1.0.0
 */
const getType = (value: any): string => {
  let val
  if (value == null) {
    val = value === undefined ? '[object Undefined]' : '[object Null]'
  } else {
    val = toString.call(value)
  }
  return val.replace(/^\[object /, '').replace(/]$/, '')
}

export default getType
