/**
 * Checks if a value is array-like (has length property and is indexable).
 * 检查值是否类似数组（具有length属性且可索引）。
 *
 * @param value - The value to check / 要检查的值
 * @returns True if the value is array-like / 如果值类似数组则返回true
 *
 * @example
 * ```typescript
 * isArrayLike('abc') // => true
 * isArrayLike([1, 2, 3]) // => true
 * isArrayLike({ 0: 'a', 1: 'b', 2: 'c', length: 3 }) // => true
 * isArrayLike(new Uint8Array([1, 2, 3])) // => true
 * isArrayLike(new Int32Array(5)) // => true
 * isArrayLike({}) // => false
 * isArrayLike(null) // => false
 * isArrayLike(42) // => false
 * isArrayLike({ length: -1 }) // => false
 * isArrayLike({ length: Infinity }) // => false
 * ```
 *
 * @since 1.0.0
 */
const isArrayLike = (value: any): boolean => {
  if (value === null || value === undefined || typeof value === 'function') return false;
  const length = value.length;
  return Number.isInteger(length) && length >= 0 && length <= Number.MAX_SAFE_INTEGER;
};

export default isArrayLike;
