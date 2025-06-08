/**
 * Checks if a value is a JavaScript primitive type.
 * 检查值是否为JavaScript原始类型。
 *
 * @param value - The value to check / 要检查的值
 * @returns True if the value is a primitive type / 如果值是原始类型则返回true
 *
 * @example
 * ```typescript
 * // Primitive types
 * isPrimitive('') // true
 * isPrimitive('hello') // true
 * isPrimitive(0) // true
 * isPrimitive(42) // true
 * isPrimitive(true) // true
 * isPrimitive(false) // true
 * isPrimitive(null) // true
 * isPrimitive(undefined) // true
 * isPrimitive(Symbol()) // true
 * isPrimitive(BigInt(123)) // true
 *
 * // Non-primitive types (objects)
 * isPrimitive({}) // false
 * isPrimitive([]) // false
 * isPrimitive(function() {}) // false
 * isPrimitive(new Date()) // false
 * isPrimitive(new Error()) // false
 * isPrimitive(/regex/) // false
 * ```
 *
 * @since 1.0.0
 */
const isPrimitive = (value: unknown): boolean => {
  return value !== Object(value)
}

export default isPrimitive
