export interface TreeNode<T> {
  children?: T[]
}

/**
 * Options for configuring the treeToList function.
 */
interface TreeToListOptions<T = any> {
  /** The key to use for storing children. Default: 'children' */
  childrenKey?: string
  /** Function to transform each node before processing. Default: (node) => node */
  transformNode?: (node: T) => T
}

/**
 * Flattens a tree structure into a flat array, removing the children property.
 * 将树结构展平为平面数组，移除children属性。
 *
 * This function traverses a tree structure breadth-first and collects all nodes
 * into a single flat array. The children property is removed from each node.
 * The order of nodes in the result follows a breadth-first traversal pattern.
 * 此函数广度优先遍历树结构，将所有节点收集到单个平面数组中。
 * 每个节点的children属性会被移除。结果中节点的顺序遵循广度优先遍历模式。
 *
 * @typeParam T - The type of the tree nodes / 树节点的类型
 * @param trees - Array of tree root nodes / 树根节点数组
 * @param options - Configuration options for the conversion / 转换的配置选项
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
 * // Basic usage
 * const flatMenu = treeToList(menuTree)
 * // Result (breadth-first order):
 * // [
 * //   { id: 1, name: "Dashboard", url: "/dashboard" },
 * //   { id: 4, name: "Settings" },
 * //   { id: 2, name: "Analytics", url: "/dashboard/analytics" },
 * //   { id: 3, name: "Reports", url: "/dashboard/reports" },
 * //   { id: 5, name: "User Management" },
 * //   { id: 6, name: "Add User", url: "/settings/users/add" }
 * // ]
 *
 * // With custom children key
 * const flatMenuWithCustomKey = treeToList(menuTree, {
 *   childrenKey: 'subItems'
 * })
 *
 * // With node transformation
 * const flatMenuWithTransform = treeToList(menuTree, {
 *   transformNode: (node) => ({
 *     ...node,
 *     label: node.name,
 *     value: node.id
 *   })
 * })
 * ```
 *
 * @since 1.0.0
 */
const treeToList = <T extends { [key: string]: any }>(
  trees: T[],
  { childrenKey = 'children', transformNode = (node: T) => node }: TreeToListOptions<T> = {}
): T[] => {
  const result: T[] = []
  const queue: T[] = [...trees] // 队列，FIFO

  while (queue.length) {
    const node = queue.shift()!
    const newNode = { ...transformNode(node) }
    delete (newNode as any)[childrenKey]
    result.push(newNode)

    if ((node as any)[childrenKey] && (node as any)[childrenKey].length) {
      queue.push(...(node as any)[childrenKey])
    }
  }

  return result
}

export default treeToList
