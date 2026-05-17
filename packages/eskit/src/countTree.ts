/**
 * Counts all nodes in a tree (including roots).
 * 统计树中的节点总数（含根节点）。
 *
 * @template T - Node type with optional children / 节点类型
 * @param nodes - Forest roots / 根节点数组
 * @param childrenKey - Children property name / children 字段名
 * @returns Total node count / 节点总数
 * @example
 * countTree([{ id: 1, children: [{ id: 2 }] }])
 * // -> 2
 */
const countTree = <T extends Record<string, unknown>>(
  nodes: readonly T[],
  childrenKey: keyof T & string = 'children' as keyof T & string
): number => {
  let total = 0

  const walk = (list: readonly T[]): void => {
    for (const node of list) {
      total += 1
      const children = node[childrenKey]
      if (Array.isArray(children) && children.length > 0) {
        walk(children as T[])
      }
    }
  }

  walk(nodes)
  return total
}

export default countTree
