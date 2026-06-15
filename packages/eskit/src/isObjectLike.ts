/**
 * Checks if a value is object-like (not null and type is 'object').
 * 检查值是否类似对象（非null且类型为'object'）。
 *
 * @param value - The value to check / 要检查的值
 * @returns True if the value is object-like / 如果值类似对象则返回true
 *
 * @example
 * ```typescript
 * isObjectLike({}) // => true
 * isObjectLike([1, 2, 3]) // => true
 * isObjectLike(new Date()) // => true
 * isObjectLike(/regex/) // => true
 * isObjectLike(new Map()) // => true
 * isObjectLike(new Set()) // => true
 * isObjectLike(null) // => false
 * isObjectLike(undefined) // => false
 * isObjectLike(42) // => false
 * isObjectLike('hello') // => false
 * isObjectLike(true) // => false
 * ```
 *
 * @since 1.0.0
 */

const isObjectLike = (value: unknown): boolean => {
  return value !== null && typeof value === 'object';
};

export default isObjectLike;
