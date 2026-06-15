/**
 * Creates a shallow clone of the given value.
 * 创建给定值的浅克隆。
 *
 * Only the top-level structure is copied; nested objects and arrays retain
 * the same references as the original.
 *
 * @param obj - The value to shallow clone / 要浅克隆的值
 * @returns A shallow clone of the value / 值的浅克隆
 *
 * @example
 * ```typescript
 * const obj = { a: 1, b: { c: 2 } }
 * const cloned = clone(obj)
 * cloned.a = 99
 * obj.a // => 1 (top-level copy, original unchanged)
 * cloned.a // => 99
 * cloned.b.c = 99
 * obj.b.c // => 99 (nested object is the same reference)
 * ```
 *
 * @since 1.0.0
 */
const clone = <T>(obj: T): T => {
  if (Array.isArray(obj)) return [...obj] as T;
  if (obj instanceof Date) return new Date(obj.getTime()) as T;
  if (obj instanceof RegExp) return new RegExp(obj.source, obj.flags) as T;
  if (obj instanceof Map) return new Map(obj) as T;
  if (obj instanceof Set) return new Set(obj) as T;
  if (obj !== null && typeof obj === 'object') return { ...obj } as T;
  return obj;
};

export default clone;
