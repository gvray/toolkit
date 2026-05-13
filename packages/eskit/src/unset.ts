import { toPath } from './_internal/path'

/**
 * Removes a nested property from an object by path.
 * 通过路径删除对象中的嵌套属性。
 *
 * @param object - The target object / 目标对象
 * @param path - The delete path / 删除路径
 * @returns `true` when the property existed and was removed / 属性存在并被删除时返回 `true`
 * @example
 * unset({ a: { b: 1 } }, 'a.b')
 * // -> true
 */
const unset = (object: Record<PropertyKey, unknown>, path: string | readonly PropertyKey[]): boolean => {
  const segments = toPath(path)

  if (segments.length === 0) {
    return false
  }

  let current: Record<PropertyKey, unknown> = object

  for (let index = 0; index < segments.length - 1; index += 1) {
    const segment = segments[index]
    const next = current[segment]

    if (typeof next !== 'object' || next === null) {
      return false
    }

    current = next as Record<PropertyKey, unknown>
  }

  const lastSegment = segments[segments.length - 1]

  if (!(lastSegment in current)) {
    return false
  }

  if (Array.isArray(current) && typeof lastSegment === 'number') {
    current.splice(lastSegment, 1)
    return true
  }

  delete current[lastSegment]
  return true
}

export default unset
