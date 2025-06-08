/**
 * Type for a valid value of a PID.
 */
type PidType = number | string | null

/**
 * Interface representing an item in a list that can be converted to a tree.
 */
interface IItem<T> {
  id: number | string
  pid: PidType
  children?: T[]
}
/**
 * Converts a flat list of items to a hierarchical tree structure.
 * 将扁平的项目列表转换为分层树结构。
 *
 * @typeParam T - The type of the items in the list / 列表中项目的类型
 * @param list - The flat list of items to convert / 要转换的扁平项目列表
 * @param pid - The parent ID to start from / 开始的父ID
 * @returns The hierarchical tree structure / 分层树结构
 *
 * @example
 * ```typescript
 * interface MenuItem {
 *   id: number
 *   pid: number | null
 *   name: string
 *   children?: MenuItem[]
 * }
 *
 * const flatList: MenuItem[] = [
 *   { id: 1, pid: null, name: 'Home' },
 *   { id: 2, pid: null, name: 'Products' },
 *   { id: 3, pid: 2, name: 'Electronics' },
 *   { id: 4, pid: 2, name: 'Clothing' },
 *   { id: 5, pid: 3, name: 'Phones' },
 *   { id: 6, pid: 3, name: 'Laptops' }
 * ]
 *
 * const tree = listToTree(flatList)
 * console.log(tree)
 * // [
 * //   { id: 1, pid: null, name: 'Home', children: [] },
 * //   {
 * //     id: 2, pid: null, name: 'Products',
 * //     children: [
 * //       {
 * //         id: 3, pid: 2, name: 'Electronics',
 * //         children: [
 * //           { id: 5, pid: 3, name: 'Phones', children: [] },
 * //           { id: 6, pid: 3, name: 'Laptops', children: [] }
 * //         ]
 * //       },
 * //       { id: 4, pid: 2, name: 'Clothing', children: [] }
 * //     ]
 * //   }
 * // ]
 *
 * // Get subtree starting from specific parent
 * const electronicsSubtree = listToTree(flatList, 3)
 * console.log(electronicsSubtree) // [{ id: 5, ... }, { id: 6, ... }]
 * ```
 *
 * @since 1.0.0
 */
const listToTree = <T extends IItem<T>>(list: T[], pid = null as PidType): T[] => {
  return list
    .filter((item: T) => item.pid === pid)
    .map((item: T) => ({
      ...item,
      children: listToTree(list, item.id)
    }))
}
export default listToTree
