import hasOwnProperty from './hasOwnProperty'
import isArray from './isArray'
import { ObjectType } from './types'

/**
 * Recursively extends an object by deeply copying properties from parent to child.
 * 通过将属性从父对象深度复制到子对象来递归扩展对象。
 *
 * @param parent - The parent object to copy from / 要复制的父对象
 * @param child - The child object to merge into / 要合并到的子对象
 * @returns The extended child object / 扩展后的子对象
 *
 * @example
 * ```typescript
 * const parent = {
 *   a: { b: 1, c: 2 },
 *   d: [1, 2, 3],
 *   e: 'hello'
 * }
 * const child = { a: { c: 3, f: 4 } }
 *
 * const result = extendDeep(parent, child)
 * console.log(result)
 * // {
 * //   a: { b: 1, c: 2, f: 4 },
 * //   d: [1, 2, 3],
 * //   e: 'hello'
 * // }
 *
 * // Arrays are replaced, not merged
 * const parent2 = { arr: [1, 2] }
 * const child2 = {}
 * extendDeep(parent2, child2) // { arr: [] } (new empty array)
 *
 * // Nested objects are deeply copied
 * const parent3 = { user: { name: 'John', settings: { theme: 'dark' } } }
 * const child3 = {}
 * extendDeep(parent3, child3) // { user: { name: 'John', settings: { theme: 'dark' } } }
 * ```
 *
 * @since 1.0.0
 */
const extendDeep = (parent: ObjectType<any>, child: ObjectType<any> = {}): ObjectType<any> => {
  for (const i in parent) {
    if (hasOwnProperty(parent, i)) {
      if (typeof parent[i] === 'object') {
        child[i] = isArray(parent[i]) ? [] : {}
        extendDeep(parent[i], child[i])
      } else {
        child[i] = parent[i]
      }
    }
  }
  return child
}
export default extendDeep
