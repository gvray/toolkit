/**
 * TreeNode type definition for tree structures
 * 树节点类型定义
 */
type TreeNode<T> = T & { children?: TreeNode<T>[] };

/**
 * Options for walkTree function
 * walkTree函数的配置选项
 */
interface WalkTreeOptions {
  /** Key for children property / 子节点属性名 */
  childrenKey?: string;
  /** Whether to traverse in depth-first order / 是否深度优先遍历 */
  depthFirst?: boolean;
  /** Whether to stop traversal when visitor returns false / 访问者返回false时是否停止遍历 */
  stopOnFalse?: boolean;
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
 * const ids = []
 * walkTree([{ id: 1, children: [{ id: 2 }] }], (node) => { ids.push(node.id) })
 * ids // => [2, 1]
 * ```
 *
 * @since 1.2.0
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
        const node = nodes[i];

        // Visit children first
        const children = (node as any)[childrenKey];
        if (children && Array.isArray(children) && children.length > 0) {
          const shouldContinue = walkNode(children, level + 1);
          if (!shouldContinue && stopOnFalse) {
            return false;
          }
        }

        // Then visit current node
        const result = visitor(node, level, i);
        if (result === false && stopOnFalse) {
          return false;
        }
      }
      return true;
    };

    return walkNode(trees, 0);
  } else {
    // Breadth-first traversal using queue
    const queue: Array<{ node: TreeNode<T>; level: number; index: number }> = [];

    // Initialize queue with root nodes
    for (let i = 0; i < trees.length; i++) {
      queue.push({ node: trees[i], level: 0, index: i });
    }

    while (queue.length > 0) {
      const { node, level, index } = queue.shift()!;

      // Visit current node
      const result = visitor(node, level, index);
      if (result === false && stopOnFalse) {
        return false;
      }

      // Add children to queue
      const children = (node as any)[childrenKey];
      if (children && Array.isArray(children) && children.length > 0) {
        for (let i = 0; i < children.length; i++) {
          queue.push({ node: children[i], level: level + 1, index: i });
        }
      }
    }

    return true;
  }
};

export default walkTree;
