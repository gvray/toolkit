import isArrayLike from './isArrayLike';
import isObject from './isObject';

/**
 * Checks if a value is an array-like object (not string or function).
 * 检查值是否为类数组对象（非字符串或函数）。
 *
 * @param value - The value to check / 要检查的值
 * @returns True if the value is an array-like object / 如果值是类数组对象则返回true
 *
 * @example
 * ```typescript
 * isArrayLikeObject([1, 2, 3]) // => true
 * isArrayLikeObject({ 0: 'a', 1: 'b', length: 2 }) // => true
 * isArrayLikeObject(new Uint8Array([1, 2, 3])) // => true
 * isArrayLikeObject('abc') // => false (string, not object)
 * isArrayLikeObject({}) // => false (no length property)
 * isArrayLikeObject(null) // => false
 * isArrayLikeObject(42) // => false
 * ```
 *
 * @since 1.0.0
 */

const isArrayLikeObject = (value: unknown): boolean => {
  return isObject(value) && isArrayLike(value);
};

export default isArrayLikeObject;
