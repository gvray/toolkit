/**
 * Filters out items whose `key` matches the given value.
 * 按指定 key 与 value 过滤掉数组中的匹配项。
 *
 * @param items - Source array / 源数组
 * @param key - Key to compare / 要比较的 key
 * @param value - Value to exclude / 要排除的值
 * @returns Filtered array / 过滤后的数组
 *
 * @example
 * excludeByKey([{ id: 1 }, { id: 2 }], 'id', 1) // => [{ id: 2 }]
 *
 * @since 1.5.0
 */
const excludeByKey = <T, K extends keyof T>(
  items: readonly T[],
  key: K,
  value: T[K] | undefined | null
): T[] => {
  if (value === undefined || value === null) return [...items];
  return items.filter((item) => item[key] !== value);
};

export default excludeByKey;
