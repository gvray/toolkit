import { toPath } from './_internal/path'

/**
 * Safely gets a nested value from an object by path.
 * 通过路径安全地获取对象中的嵌套值。
 *
 * @template T - The fallback value type / 兜底值类型
 * @param object - The source object / 源对象
 * @param path - The access path / 访问路径
 * @param defaultValue - The fallback value returned when the path does not exist / 路径不存在时返回的兜底值
 * @returns The found value or the fallback value / 找到的值或兜底值
 * @example
 * get({ a: { b: 2 } }, 'a.b')
 * // -> 2
 */
const get = <T = undefined>(object: unknown, path: string | readonly PropertyKey[], defaultValue?: T): unknown | T => {
  const segments = toPath(path)
  let current: unknown = object

  for (const segment of segments) {
    if (current === null || current === undefined) {
      return defaultValue
    }

    current = (current as Record<PropertyKey, unknown>)[segment]
  }

  return current === undefined ? defaultValue : current
}

export default get
