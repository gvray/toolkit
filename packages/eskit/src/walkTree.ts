/**
 * TreeNode type definition for tree structures
 * 树节点类型定义
 */
type TreeNode<T> = T & { children?: TreeNode<T>[] }

/**
 * Options for walkTree function
 * walkTree函数的配置选项
 */
interface WalkTreeOptions {
  /** Key for children property / 子节点属性名 */
  childrenKey?: string
  /** Whether to traverse in depth-first order / 是否深度优先遍历 */
  depthFirst?: boolean
  /** Whether to stop traversal when visitor returns false / 访问者返回false时是否停止遍历 */
  stopOnFalse?: boolean
}

/**
 * Walks through a tree structure, calling a visitor function for each node.
 * 遍历树结构，为每个节点调用访问者函数。
 *
 * @typeParam T - The type of the tree nodes / 树节点的类型
 * @param trees - The tree structure to walk through / 要遍历的树结构
 * @param visitor - Function called for each node / 为每个节点调用的函数
 * @param options - Configuration options / 配置选项
 * @returns Whether the traversal completed successfully / 遍历是否成功完成
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
 * walkTree(tree, (node, level, index) => {
 *   console.log(`${'  '.repeat(level)}${node.name} (Level ${level}, Index ${index})`)
 * })
 * // Output:
 * // Root (Level 0, Index 0)
 * //   Child 1 (Level 1, Index 0)
 * //   Child 2 (Level 1, Index 1)
 *
 * // Stop traversal when condition is met - 满足条件时停止遍历
 * walkTree(tree, (node, level, index) => {
 *   console.log(`Visiting: ${node.name}`)
 *   if (node.id === 2) {
 *     return false // Stop traversal
 *   }
 * })
 *
 * // Custom children key - 自定义子节点键名
 * const customTree = [
 *   { id: 1, name: 'Root', items: [
 *     { id: 2, name: 'Child 1' }
 *   ]}
 * ]
 *
 * walkTree(customTree, (node) => {
 *   console.log(node.name)
 * }, { childrenKey: 'items' })
 *
 * // Collect all node names - 收集所有节点名称
 * const names: string[] = []
 * walkTree(tree, (node) => {
 *   names.push(node.name)
 * })
 * console.log(names) // ['Root', 'Child 1', 'Child 2']
 * ```
 *
 * @since 1.1.0
 */
const walkTree = <T extends { [key: string]: any }>(
  trees: TreeNode<T>[],
  visitor: (node: TreeNode<T>, level: number, index: number) => boolean | void,
  { childrenKey = 'children', depthFirst = true, stopOnFalse = true }: WalkTreeOptions = {}
): boolean => {
  if (depthFirst) {
    // Depth-first traversal
    const walkNode = (nodes: TreeNode<T>[], level: number): boolean => {
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i]

        // Visit children first
        const children = (node as any)[childrenKey]
        if (children && Array.isArray(children) && children.length > 0) {
          const shouldContinue = walkNode(children, level + 1)
          if (!shouldContinue && stopOnFalse) {
            return false
          }
        }

        // Then visit current node
        const result = visitor(node, level, i)
        if (result === false && stopOnFalse) {
          return false
        }
      }
      return true
    }

    return walkNode(trees, 0)
  } else {
    // Breadth-first traversal using queue
    const queue: Array<{ node: TreeNode<T>; level: number; index: number }> = []

    // Initialize queue with root nodes
    for (let i = 0; i < trees.length; i++) {
      queue.push({ node: trees[i], level: 0, index: i })
    }

    while (queue.length > 0) {
      const { node, level, index } = queue.shift()!

      // Visit current node
      const result = visitor(node, level, index)
      if (result === false && stopOnFalse) {
        return false
      }

      // Add children to queue
      const children = (node as any)[childrenKey]
      if (children && Array.isArray(children) && children.length > 0) {
        for (let i = 0; i < children.length; i++) {
          queue.push({ node: children[i], level: level + 1, index: i })
        }
      }
    }

    return true
  }
}

export default walkTree
