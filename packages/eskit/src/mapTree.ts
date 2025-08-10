/**
 * TreeNode type definition for tree structures
 * 树节点类型定义
 */
type TreeNode<T> = T & { children?: TreeNode<T>[] }

/**
 * Options for mapTree function
 * mapTree函数的配置选项
 */
interface MapTreeOptions<T> {
  /** Key for children property / 子节点属性名 */
  childrenKey?: string
  /** Whether to keep empty children arrays / 是否保留空的子节点数组 */
  keepEmptyChildren?: boolean
}

/**
 * Maps over a tree structure, transforming each node while preserving the tree hierarchy.
 * 遍历树结构，转换每个节点同时保持树的层次结构。
 *
 * @typeParam T - The type of the original tree nodes / 原始树节点的类型
 * @typeParam R - The type of the transformed tree nodes / 转换后树节点的类型
 * @param trees - The tree structure to map over / 要遍历的树结构
 * @param mapper - Function to transform each node / 转换每个节点的函数
 * @param options - Configuration options / 配置选项
 * @returns A new tree with transformed nodes / 转换后的新树
 *
 * @example
 * ```typescript
 * // Basic usage - 基本用法
 * const tree = [
 *   { id: 1, name: 'Root', children: [
 *     { id: 2, name: 'Child 1' },
 *     { id: 3, name: 'Child 2' }
 *   ]}
 * ]
 *
 * const mapped = mapTree(tree, (node) => ({
 *   ...node,
 *   name: node.name.toUpperCase()
 * }))
 * // Result: [{ id: 1, name: 'ROOT', children: [
 * //   { id: 2, name: 'CHILD 1' },
 * //   { id: 3, name: 'CHILD 2' }
 * // ]}]
 *
 * // With level and index - 使用层级和索引
 * const mappedWithLevel = mapTree(tree, (node, level, index) => ({
 *   ...node,
 *   path: `${level}-${index}`,
 *   name: `${node.name} (Level ${level})`
 * }))
 *
 * // Custom children key - 自定义子节点键名
 * const customTree = [
 *   { id: 1, name: 'Root', items: [
 *     { id: 2, name: 'Child 1' }
 *   ]}
 * ]
 *
 * const mappedCustom = mapTree(customTree, (node) => node, {
 *   childrenKey: 'items'
 * })
 * ```
 *
 * @since 1.1.0
 */
const mapTree = <T extends { [key: string]: any }, R extends { [key: string]: any }>(
  trees: TreeNode<T>[],
  mapper: (node: TreeNode<T>, level: number, index: number) => R,
  { childrenKey = 'children', keepEmptyChildren = true }: MapTreeOptions<T> = {}
): TreeNode<R>[] => {
  const mapNode = (node: TreeNode<T>, level: number, index: number): TreeNode<R> => {
    const mapped = mapper(node, level, index)
    const children = (node as any)[childrenKey]

    const result: TreeNode<R> = { ...mapped }

    // Remove the original children property from the mapped result
    delete (result as any)[childrenKey]

    if (children && Array.isArray(children) && children.length > 0) {
      // Recursively map children with incremented level
      ;(result as any)[childrenKey] = children.map((childNode: TreeNode<T>, childIndex: number) =>
        mapNode(childNode, level + 1, childIndex)
      )
    } else if (keepEmptyChildren && children && Array.isArray(children) && children.length === 0) {
      // Keep empty children array if specified and it's actually an empty array
      ;(result as any)[childrenKey] = []
    }
    // If children is null, undefined, not an array, or empty array with keepEmptyChildren=false, don't add children property

    return result
  }

  return trees.map((node, index) => mapNode(node, 0, index))
}

export default mapTree
