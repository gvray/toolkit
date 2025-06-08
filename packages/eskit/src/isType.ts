/**
 * Checks if a value's type matches the specified type string.
 * 检查值的类型是否与指定的类型字符串匹配。
 *
 * @param type - The type string to check against / 要检查的类型字符串
 * @param value - The value to check the type of / 要检查类型的值
 * @returns True if the value's type matches the specified type string / 如果值的类型匹配指定的类型字符串则返回true
 *
 * @example
 * ```typescript
 * isType('String', 'hello') // true
 * isType('Number', 42) // true
 * isType('Array', [1, 2, 3]) // true
 * isType('Object', {}) // true
 * isType('RegExp', /test/) // true
 * isType('Date', new Date()) // true
 * isType('Function', () => {}) // true
 * isType('Array', {}) // false
 * isType('String', 123) // false
 * ```
 *
 * @since 1.0.0
 */
const isType = (type: string, value: unknown): boolean => Object.prototype.toString.call(value) === `[object ${type}]`

export default isType
