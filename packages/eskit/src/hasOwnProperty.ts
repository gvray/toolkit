/**
 * Safely checks if an object has a property defined on itself (not inherited).
 * 安全地检查对象是否具有自身定义的属性（非继承）。
 *
 * @param obj - The object to check / 要检查的对象
 * @param key - The property key to check for / 要检查的属性键
 * @returns True if the object has the own property / 如果对象具有自身属性则返回true
 *
 * @example
 * ```typescript
 * const obj = { foo: 42, bar: 'hello' }
 * const arr = [1, 2, 3]
 *
 * hasOwnProperty(obj, 'foo') // true
 * hasOwnProperty(obj, 'toString') // false (inherited from Object.prototype)
 * hasOwnProperty(obj, 'hasOwnProperty') // false (inherited)
 *
 * hasOwnProperty(arr, '0') // true
 * hasOwnProperty(arr, 0) // true (number key)
 * hasOwnProperty(arr, 'length') // true
 * hasOwnProperty(arr, 'push') // false (inherited from Array.prototype)
 *
 * // Safe for objects without prototype
 * const nullObj = Object.create(null)
 * nullObj.prop = 'value'
 * hasOwnProperty(nullObj, 'prop') // true
 *
 * // Works with symbols
 * const sym = Symbol('test')
 * const objWithSymbol = { [sym]: 'value' }
 * hasOwnProperty(objWithSymbol, sym) // true
 * ```
 *
 * @since 1.0.0
 */
const hasOwnProperty = (obj: unknown, key: PropertyKey): boolean => Object.prototype.hasOwnProperty.call(obj, key)
export default hasOwnProperty
