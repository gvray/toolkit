/**
 * Compares two arrays for equality ignoring element order.
 * 忽略顺序比较两个数组是否包含相同元素。
 *
 * @param a - First array / 第一个数组
 * @param b - Second array / 第二个数组
 * @returns `true` if arrays contain the same elements / 包含相同元素时返回 `true`
 *
 * @example
 * arraysEqualIgnoreOrder([1, 2, 3], [3, 2, 1]) // => true
 *
 * @since 1.5.0
 */
const arraysEqualIgnoreOrder = <T>(a: readonly T[], b: readonly T[]): boolean => {
  if (a.length !== b.length) return false;
  return a.every((x) => b.includes(x));
};

export default arraysEqualIgnoreOrder;
