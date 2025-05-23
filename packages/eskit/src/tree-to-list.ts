export interface TreeNode<T> {
  children?: T[]
}

/**
 * Flattens a trees structure represented by an array of items with child nodes into a flat array.
 *
 * @typeParam T - Type of items in the trees.
 * @param trees - The trees structure represented by an array of items with child nodes.
 * @returns A flat array of items.
 *
 * @example
 * ```typescript
 * interface TreeNode {
 *   id: number;
 *   name: string;
 *   children?: TreeNode[];
 * }
 *
 * const trees: TreeNode[] = [
 *   {
 *     id: 1,
 *     name: "Node 1",
 *     children: [
 *       { id: 2, name: "Node 1.1" },
 *       { id: 3, name: "Node 1.2" }
 *     ]
 *   },
 *   {
 *     id: 4,
 *     name: "Node 2",
 *     children: [
 *       { id: 5, name: "Node 2.1" },
 *       { id: 6, name: "Node 2.2", children: [{ id: 7, name: "Node 2.2.1" }] }
 *     ]
 *   }
 * ];
 *
 * const result = treeToList(trees);
 * // [
 * //   { id: 2, name: "Node 1.1" },
 * //   { id: 3, name: "Node 1.2" },
 * //   { id: 1, name: "Node 1" },
 * //   { id: 5, name: "Node 2.1" },
 * //   { id: 7, name: "Node 2.2.1" },
 * //   { id: 6, name: "Node 2.2" },
 * //   { id: 4, name: "Node 2" }
 * // ]
 * ```
 */
const treeToList = <T extends TreeNode<T>>(trees: T[]): T[] => {
  const stack = [...trees]
  const result: T[] = []

  while (stack.length) {
    const item = stack.pop() as T
    const { children } = item

    if (children) {
      delete item.children

      if (children.length) {
        stack.push(...children)
      }
    }

    result.push(item)
  }

  return result.reverse()
}

export default treeToList
