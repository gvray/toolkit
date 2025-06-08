const objectProto = Object.prototype
/**
 * Checks if a value is likely a prototype object.
 * 检查值是否可能是原型对象。
 *
 * @param value - The value to check / 要检查的值
 * @returns True if the value is a prototype object / 如果值是原型对象则返回true
 *
 * @example
 * ```typescript
 * // Constructor function prototypes
 * function MyClass() {}
 * isPrototype(MyClass.prototype) // true
 *
 * class MyModernClass {}
 * isPrototype(MyModernClass.prototype) // true
 *
 * // Built-in prototypes
 * isPrototype(Object.prototype) // true
 * isPrototype(Array.prototype) // true
 * isPrototype(String.prototype) // true
 * isPrototype(Function.prototype) // true
 *
 * // Regular objects and instances
 * isPrototype({}) // false (plain object)
 * isPrototype(new MyClass()) // false (instance, not prototype)
 * isPrototype([]) // false (array instance)
 * isPrototype('hello') // false (string primitive)
 *
 * // Edge cases
 * isPrototype(null) // false
 * isPrototype(undefined) // false
 *
 * // Custom objects that look like prototypes
 * const customProto = { constructor: MyClass }
 * MyClass.prototype = customProto
 * isPrototype(customProto) // true
 *
 * // Practical usage - checking if object is a prototype
 * function isCustomPrototype(obj: unknown) {
 *   return isPrototype(obj) && obj !== Object.prototype
 * }
 *
 * function enhancePrototype(proto: unknown) {
 *   if (isPrototype(proto)) {
 *     // Safe to add methods to prototype
 *     console.log('Adding methods to prototype')
 *   } else {
 *     console.log('Not a prototype object')
 *   }
 * }
 * ```
 *
 * @since 1.0.0
 */
const isPrototype = (value: unknown): boolean => {
  const Ctor = value && value.constructor
  const proto = (typeof Ctor === 'function' && Ctor.prototype) || objectProto
  return value === proto
}
export default isPrototype
