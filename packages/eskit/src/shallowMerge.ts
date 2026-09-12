/**
 * Shallow merges `source` into `target`.
 * When both `target[key]` and `source[key]` are plain objects, their properties are shallow-merged one level deeper.
 * 对 target 和 source 做一层浅合并；当对应 key 都是普通对象时再浅合并一层。
 *
 * @param target - Base object / 基础对象
 * @param source - Object to merge / 要合并的对象
 * @returns New merged object / 合并后的新对象
 *
 * @example
 * shallowMerge({ a: 1, b: { c: 1 } }, { b: { d: 2 } }) // => { a: 1, b: { c: 1, d: 2 } }
 *
 * @since 1.5.0
 */
const shallowMerge = <T extends Record<string, unknown>>(target: T, source: unknown): T => {
  if (!source || typeof source !== 'object' || Array.isArray(source)) {
    return { ...target };
  }

  const result: Record<string, unknown> = { ...target };

  for (const [key, value] of Object.entries(source)) {
    const prev = result[key];
    const shouldMergeNested =
      value !== null &&
      typeof value === 'object' &&
      !Array.isArray(value) &&
      prev !== null &&
      typeof prev === 'object' &&
      !Array.isArray(prev);

    if (shouldMergeNested) {
      result[key] = {
        ...(prev as Record<string, unknown>),
        ...(value as Record<string, unknown>),
      };
    } else {
      result[key] = value;
    }
  }

  return result as T;
};

export default shallowMerge;
