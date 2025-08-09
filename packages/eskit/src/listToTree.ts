/**
 * Options for configuring the listToTree function.
 */
interface ListToTreeOptions<T = any> {
  /** The key to use as the unique identifier for each item. Default: 'id' */
  idKey?: string
  /** The key to use as the parent identifier for each item. Default: 'parentId' */
  parentKey?: string
  /** The key to use for storing children. Default: 'children' */
  childrenKey?: string
  /** Whether to keep empty children arrays. Default: true */
  keepEmptyChildren?: boolean
  /** Function to transform each node before processing. Default: (node) => node */
  transformNode?: (node: T) => T
}

/**
 * Converts a flat list of items to a hierarchical tree structure.
 * 将扁平的项目列表转换为分层树结构。
 *
 * @typeParam T - The type of the items in the list / 列表中项目的类型
 * @param items - The flat list of items to convert / 要转换的扁平项目列表
 * @param options - Configuration options for the conversion / 转换的配置选项
 * @returns The hierarchical tree structure / 分层树结构
 *
 * @example
 * ```typescript
 * interface MenuItem {
 *   id: number
 *   parentId: number | null
 *   name: string
 *   children?: MenuItem[]
 * }
 *
 * const flatList: MenuItem[] = [
 *   { id: 1, parentId: null, name: 'Home' },
 *   { id: 2, parentId: null, name: 'Products' },
 *   { id: 3, parentId: 2, name: 'Electronics' },
 *   { id: 4, parentId: 2, name: 'Clothing' },
 *   { id: 5, parentId: 3, name: 'Phones' },
 *   { id: 6, parentId: 3, name: 'Laptops' }
 * ]
 *
 * // Basic usage
 * const tree = listToTree(flatList)
 * console.log(tree)
 * // [
 * //   { id: 1, parentId: null, name: 'Home', children: [] },
 * //   {
 * //     id: 2, parentId: null, name: 'Products',
 * //     children: [
 * //       {
 * //         id: 3, parentId: 2, name: 'Electronics',
 * //         children: [
 * //           { id: 5, parentId: 3, name: 'Phones', children: [] },
 * //           { id: 6, parentId: 3, name: 'Laptops', children: [] }
 * //         ]
 * //       },
 * //       { id: 4, parentId: 2, name: 'Clothing', children: [] }
 * //     ]
 * //   }
 * // ]
 *
 * // With custom keys
 * const treeWithCustomKeys = listToTree(flatList, {
 *   idKey: 'id',
 *   parentKey: 'parentId',
 *   childrenKey: 'subItems',
 *   keepEmptyChildren: false
 * })
 *
 * // With node transformation
 * const treeWithTransform = listToTree(flatList, {
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
const listToTree = <T extends { [key: string]: any }>(
  items: T[],
  {
    idKey = 'id',
    parentKey = 'parentId',
    childrenKey = 'children',
    keepEmptyChildren = true,
    transformNode = (node: T) => node
  }: ListToTreeOptions<T> = {}
): T[] => {
  const map = new Map<string | number, T>()
  const roots: T[] = []

  // 先复制一份并转换节点
  items.forEach((item) => {
    const newNode = transformNode({ ...item })
    map.set((newNode as any)[idKey] as string | number, newNode)
  })

  map.forEach((item) => {
    const parentId = (item as any)[parentKey] as string | number | null
    if (parentId != null && map.has(parentId)) {
      const parent = map.get(parentId)!
      if (!(parent as any)[childrenKey]) {
        ;(parent as any)[childrenKey] = [] as T[]
      }
      ;((parent as any)[childrenKey] as T[]).push(item)
    } else {
      roots.push(item)
    }
  })

  if (!keepEmptyChildren) {
    const clean = (nodes: T[]): void => {
      for (const node of nodes) {
        if ((node as any)[childrenKey]) {
          const children = (node as any)[childrenKey] as T[]
          if (children.length === 0) {
            delete (node as any)[childrenKey]
          } else {
            clean(children)
          }
        }
      }
    }
    clean(roots)
  } else {
    // 为所有节点添加空的children数组（如果keepEmptyChildren为true）
    map.forEach((item) => {
      if (!(item as any)[childrenKey]) {
        ;(item as any)[childrenKey] = [] as T[]
      }
    })
  }

  return roots
}

export default listToTree
