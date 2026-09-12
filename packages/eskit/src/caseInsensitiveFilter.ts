/**
 * Filters an array by a keyword using case-insensitive matching over multiple fields.
 * 按关键字对列表做大小写不敏感过滤。
 *
 * @param items - Source array / 源数组
 * @param keyword - Search keyword / 搜索关键字
 * @param fields - Functions that extract searchable text from each item / 提取待匹配文本的 getter
 * @returns Filtered array / 过滤后的数组
 *
 * @example
 * caseInsensitiveFilter(
 *   [{ name: 'Alice' }, { name: 'Bob' }],
 *   'ali',
 *   [(item) => item.name]
 * ) // => [{ name: 'Alice' }]
 *
 * @since 1.5.0
 */
const caseInsensitiveFilter = <T>(
  items: readonly T[],
  keyword: string,
  fields: Array<(item: T) => string | undefined>
): T[] => {
  const kw = keyword.trim().toLowerCase();
  if (!kw) return [...items];

  return items.filter((item) =>
    fields.some((field) => {
      const value = field(item);
      return value ? value.toLowerCase().includes(kw) : false;
    })
  );
};

export default caseInsensitiveFilter;
