/**
 * Freezes an object and its immediate properties (shallow freeze).
 * 冻结对象及其直接属性（浅冻结）。
 *
 * @param obj - The object to freeze / 要冻结的对象
 *
 * @example
 * ```typescript
 * const config = {
 *   api: { url: 'https://api.example.com', timeout: 5000 },
 *   features: ['auth', 'logging'],
 *   debug: true
 * }
 *
 * constantize(config)
 *
 * // Object and its immediate properties are frozen
 * config.debug = false // TypeError: Cannot assign to read only property
 * config.newProp = 'value' // TypeError: Cannot add property
 * config.api.timeout = 10000 // TypeError: Cannot assign to read only property
 *
 * // But nested objects' properties can still be modified
 * // (this is a shallow freeze, not deep freeze)
 *
 * // Check if frozen
 * console.log(Object.isFrozen(config)) // true
 * console.log(Object.isFrozen(config.api)) // true
 * console.log(Object.isFrozen(config.features)) // true
 *
 * // Useful for creating immutable configuration objects
 * const constants = { PI: 3.14159, E: 2.71828 }
 * constantize(constants)
 * // constants.PI = 3.14 // TypeError: Cannot assign to read only property
 * ```
 *
 * @since 1.0.0
 */
const constantize = <T extends Record<string, any>>(obj: T): void => {
  Object.freeze(obj)
  Object.keys(obj).forEach((key) => {
    const val = obj[key]
    if (typeof val === 'object' && val !== null) {
      Object.freeze(val)
    }
  })
}
export default constantize
