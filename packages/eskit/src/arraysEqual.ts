/**
 * Compares two arrays for equality.
 * 比较两个数组是否相等。
 *
 * @param a - First array / 第一个数组
 * @param b - Second array / 第二个数组
 * @param comparator - Optional custom comparator / 可选自定义比较器
 * @returns `true` if arrays are equal / 相等时返回 `true`
 *
 * @example
 * arraysEqual([1, 2, 3], [1, 2, 3]) // => true
 * arraysEqual([1, 2], [2, 1]) // => false
 *
 * @since 1.5.0
 */
const arraysEqual = <T>(
  a: readonly T[],
  b: readonly T[],
  comparator?: (x: T, y: T) => boolean
): boolean => {
  if (a.length !== b.length) return false;
  if (!comparator) return a.every((x, i) => x === b[i]);
  return a.every((x, i) => comparator(x, b[i]));
};

export default arraysEqual;
