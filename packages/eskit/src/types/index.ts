export interface ObjectType<T> {
  [key: string]: T
}

export interface ListToTreeOptions<T = any> {
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

export interface TreeToListOptions<T = any> {
  /** The key to use for storing children. Default: 'children' */
  childrenKey?: string
  /** Function to transform each node before processing. Default: (node) => node */
  transformNode?: (node: T) => T
}

export interface MapTreeOptions<T = any> {
  /** Key for children property / 子节点属性名 */
  childrenKey?: string
  /** Whether to keep empty children arrays / 是否保留空的子节点数组 */
  keepEmptyChildren?: boolean
}
