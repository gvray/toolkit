/**
 * Copies all properties from source to target, including non-enumerable ones.
 * 将所有属性从源对象复制到目标对象，包括不可枚举的属性。
 *
 * @param target - The target object to copy properties to / 要复制属性到的目标对象
 * @param source - The source object to copy properties from / 要从中复制属性的源对象
 *
 * @example
 * ```typescript
 * const source = { a: 1, b: 2 }
 * const target = { c: 3 }
 *
 * copyProperties(target, source)
 * console.log(target) // { c: 3, a: 1, b: 2 }
 *
 * // Copies non-enumerable properties too
 * const sourceWithHidden = {}
 * Object.defineProperty(sourceWithHidden, 'hidden', {
 *   value: 'secret',
 *   enumerable: false,
 *   writable: true,
 *   configurable: true
 * })
 *
 * const targetForHidden = {}
 * copyProperties(targetForHidden, sourceWithHidden)
 * console.log(Object.getOwnPropertyDescriptor(targetForHidden, 'hidden'))
 * // { value: 'secret', writable: true, enumerable: false, configurable: true }
 *
 * // Copies getters and setters
 * const sourceWithAccessor = {
 *   _value: 42,
 *   get value() { return this._value },
 *   set value(v) { this._value = v }
 * }
 *
 * const targetForAccessor = {}
 * copyProperties(targetForAccessor, sourceWithAccessor)
 * console.log((targetForAccessor as any).value) // 42
 * ```
 *
 * @since 1.0.0
 */
const copyProperties = <T, U extends Record<string, unknown>>(target: T, source: U): void => {
  for (const key of Reflect.ownKeys(source)) {
    if (key !== 'constructor' && key !== 'prototype' && key !== 'name') {
      const desc = Object.getOwnPropertyDescriptor(source, key)
      Object.defineProperty(target, key, desc ?? {})
    }
  }
}

export default copyProperties
