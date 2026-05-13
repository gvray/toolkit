import { toPath } from './_internal/path'

/**
 * Sets a nested value on an object by path.
 * 通过路径为对象设置嵌套值。
 *
 * @template T - The object type / 对象类型
 * @param object - The target object / 目标对象
 * @param path - The set path / 设置路径
 * @param value - The value to set / 要设置的值
 * @returns The same object after mutation / 设置后的原对象
 * @example
 * set({ a: 1 }, 'b.c', 3)
 * // -> { a: 1, b: { c: 3 } }
 */
const set = <T extends Record<PropertyKey, unknown>>(object: T, path: string | readonly PropertyKey[], value: unknown): T => {
  const segments = toPath(path)

  if (segments.length === 0) {
    throw new TypeError('path must not be empty')
  }

  let current: Record<PropertyKey, unknown> = object

  segments.forEach((segment: PropertyKey, index: number) => {
    if (index === segments.length - 1) {
      current[segment] = value
      return
    }

    const nextSegment = segments[index + 1]
    const nextValue = current[segment]

    if (typeof nextValue !== 'object' || nextValue === null) {
      current[segment] = typeof nextSegment === 'number' ? [] : {}
    }

    current = current[segment] as Record<PropertyKey, unknown>
  })

  return object
}

export default set
