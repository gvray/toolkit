/**
 * Finds the first tree node that matches a predicate.
 * 查找第一个满足断言条件的树节点。
 *
 * @template T - The node type / 节点类型
 * @param trees - The source tree array / 源树数组
 * @param predicate - The match predicate / 匹配断言
 * @param childrenKey - The children field name / 子节点字段名
 * @returns The first matching node, or `undefined` / 第一个匹配的节点，或 `undefined`
 * @example
 * findTreeNode([{ id: 1, children: [{ id: 2 }] }], (node) => node.id === 2)
 * // -> { id: 2 }
 */
const findTreeNode = <T extends Record<string, unknown>>(
  trees: readonly T[],
  predicate: (node: T) => boolean,
  childrenKey: keyof T = 'children' as keyof T
): T | undefined => {
  for (const node of trees) {
    if (predicate(node)) {
      return node
    }

    const children = node[childrenKey]

    if (Array.isArray(children)) {
      const result = findTreeNode(children as T[], predicate, childrenKey)

      if (result) {
        return result
      }
    }
  }

  return undefined
}

export default findTreeNode
