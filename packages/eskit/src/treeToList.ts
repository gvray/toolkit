export interface TreeNode<T> {
  children?: T[]
}

/**
 * Flattens a tree structure into a flat array, removing the children property.
 * 将树结构展平为平面数组，移除children属性。
 *
 * This function traverses a tree structure depth-first and collects all nodes
 * into a single flat array. The children property is removed from each node.
 * The order of nodes in the result follows a depth-first traversal pattern.
 * 此函数深度优先遍历树结构，将所有节点收集到单个平面数组中。
 * 每个节点的children属性会被移除。结果中节点的顺序遵循深度优先遍历模式。
 *
 * @template T - Type of tree nodes that extend TreeNode / 扩展TreeNode的树节点类型
 * @param trees - Array of tree root nodes / 树根节点数组
 * @returns Flat array of all nodes without children properties / 不包含children属性的所有节点的平面数组
 *
 * @example
 * ```typescript
 * interface MenuItem extends TreeNode<MenuItem> {
 *   id: number
 *   name: string
 *   url?: string
 * }
 *
 * const menuTree: MenuItem[] = [
 *   {
 *     id: 1,
 *     name: "Dashboard",
 *     url: "/dashboard",
 *     children: [
 *       { id: 2, name: "Analytics", url: "/dashboard/analytics" },
 *       { id: 3, name: "Reports", url: "/dashboard/reports" }
 *     ]
 *   },
 *   {
 *     id: 4,
 *     name: "Settings",
 *     children: [
 *       {
 *         id: 5,
 *         name: "User Management",
 *         children: [
 *           { id: 6, name: "Add User", url: "/settings/users/add" }
 *         ]
 *       }
 *     ]
 *   }
 * ]
 *
 * const flatMenu = treeToList(menuTree)
 * // Result (depth-first order):
 * // [
 * //   { id: 2, name: "Analytics", url: "/dashboard/analytics" },
 * //   { id: 3, name: "Reports", url: "/dashboard/reports" },
 * //   { id: 1, name: "Dashboard", url: "/dashboard" },
 * //   { id: 6, name: "Add User", url: "/settings/users/add" },
 * //   { id: 5, name: "User Management" },
 * //   { id: 4, name: "Settings" }
 * // ]
 * ```
 *
 * @since 1.0.0
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
