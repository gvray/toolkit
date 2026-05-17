export interface TreeNode {
  id: string | number
  parentId?: string | number | null
  children?: TreeNode[]
  [key: string]: unknown
}

export const withVirtualRoot = <T extends TreeNode>(
  list: T[],
  config: { id?: string | number; label?: string; parentField?: string } = {}
): T[] => {
  const virtualId = config.id ?? '__virtual_root__'
  const parentField = config.parentField ?? 'parentId'
  const root = { id: virtualId, [parentField]: null, children: [], label: config.label ?? 'root' } as unknown as T
  const normalized = list.map((item) => ({
    ...item,
    [parentField]: item[parentField] == null ? virtualId : item[parentField]
  }))
  return [root, ...normalized]
}

export const normalizeVirtualRoot = <T extends TreeNode>(tree: T[], virtualId: string | number = '__virtual_root__'): T[] =>
  tree
    .filter((node) => node.id !== virtualId)
    .map((node) => ({
      ...node,
      parentId: node.parentId === virtualId ? null : node.parentId
    })) as T[]

export const pruneEmptyChildren = <T extends TreeNode>(tree: T[]): T[] =>
  tree.map((node) => {
    const children = node.children ? pruneEmptyChildren(node.children as T[]) : undefined
    if (children && children.length === 0) {
      const { children: _removed, ...rest } = node
      return rest as T
    }
    return children ? ({ ...node, children } as T) : node
  })
