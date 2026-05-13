/**
 * Calculates the maximum depth of a tree.
 * 计算树结构的最大深度。
 *
 * @template T - The node type / 节点类型
 * @param trees - The source tree array / 源树数组
 * @param childrenKey - The children field name / 子节点字段名
 * @returns The maximum tree depth / 最大树深度
 * @example
 * treeDepth([{ id: 1, children: [{ id: 2 }] }])
 * // -> 2
 */
const treeDepth = <T extends Record<string, unknown>>(trees: readonly T[], childrenKey: keyof T = 'children' as keyof T): number => {
  if (trees.length === 0) {
    return 0
  }

  return 1 + Math.max(
    ...trees.map((node: T) => {
      const children = node[childrenKey]
      return Array.isArray(children) ? treeDepth(children as T[], childrenKey) : 0
    })
  )
}

export default treeDepth
