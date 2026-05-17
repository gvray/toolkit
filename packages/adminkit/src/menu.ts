export interface MenuNode {
  path: string
  name: string
  component?: string
  children?: MenuNode[]
}

export const menuToRoutes = (menuTree: MenuNode[]): Array<Record<string, unknown>> =>
  menuTree.map((node) => ({
    path: node.path,
    name: node.name,
    component: node.component,
    children: node.children ? menuToRoutes(node.children) : undefined
  }))

export const flattenMenus = (menuTree: MenuNode[]): MenuNode[] => {
  const result: MenuNode[] = []
  const walk = (nodes: MenuNode[]): void => {
    nodes.forEach((node) => {
      result.push({
        path: node.path,
        name: node.name,
        ...(node.component !== undefined ? { component: node.component } : {})
      })
      if (node.children?.length) walk(node.children)
    })
  }
  walk(menuTree)
  return result
}

export const getActiveMenuPath = (menuTree: MenuNode[], currentPath: string): string => {
  const flat = flattenMenus(menuTree)
  const match = flat.filter((item) => currentPath.startsWith(item.path)).sort((a, b) => b.path.length - a.path.length)[0]
  return match?.path ?? currentPath
}

export const getBreadcrumbs = (menuTree: MenuNode[], currentPath: string): Array<{ name: string; path: string }> => {
  const trail: Array<{ name: string; path: string }> = []
  const walk = (nodes: MenuNode[], stack: Array<{ name: string; path: string }>): boolean => {
    for (const node of nodes) {
      const next = [...stack, { name: node.name, path: node.path }]
      if (currentPath.startsWith(node.path)) {
        if (node.path === currentPath) {
          trail.push(...next)
          return true
        }
        if (node.children && walk(node.children, next)) return true
      }
    }
    return false
  }
  walk(menuTree, [])
  return trail.length ? trail : [{ name: currentPath, path: currentPath }]
}
