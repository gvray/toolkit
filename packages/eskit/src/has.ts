import { toPath } from './_internal/path'

/**
 * Checks whether an object has a property at the given path.
 * 判断对象在指定路径上是否存在属性。
 *
 * @param object - Source object / 源对象
 * @param path - Property path / 属性路径
 * @returns True when the path exists / 路径存在则为 true
 * @example
 * has({ a: { b: 1 } }, 'a.b')
 * // -> true
 */
const has = (object: unknown, path: string | readonly PropertyKey[]): boolean => {
  const segments = toPath(path)
  let current: unknown = object

  for (let index = 0; index < segments.length; index++) {
    if (current === null || current === undefined) {
      return false
    }

    const segment = segments[index]
    if (index === segments.length - 1) {
      return Object.prototype.hasOwnProperty.call(current, segment)
    }

    current = (current as Record<PropertyKey, unknown>)[segment]
  }

  return false
}

export default has
