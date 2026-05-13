/**
 * Filters a tree while preserving the ancestor chain of matched nodes.
 * 过滤树结构，并保留匹配节点的祖先链。
 *
 * @template T - The node type / 节点类型
 * @param trees - The source tree array / 源树数组
 * @param predicate - The match predicate / 匹配断言
 * @param childrenKey - The children field name / 子节点字段名
 * @returns A filtered tree / 过滤后的树
 * @example
 * filterTree([{ id: 1, visible: true }], (node) => Boolean(node.visible))
 * // -> [{ id: 1, visible: true }]
 */
const filterTree = <T extends Record<string, unknown>>(
  trees: readonly T[],
  predicate: (node: T) => boolean,
  childrenKey: keyof T = 'children' as keyof T
): T[] => {
  return trees.reduce<T[]>((result: T[], node: T) => {
    const children = node[childrenKey]
    const filteredChildren = Array.isArray(children) ? filterTree(children as T[], predicate, childrenKey) : []

    if (predicate(node) || filteredChildren.length > 0) {
      result.push({
        ...node,
        ...(Array.isArray(children) ? { [childrenKey]: filteredChildren } : {})
      })
    }

    return result
  }, [])
}

export default filterTree
