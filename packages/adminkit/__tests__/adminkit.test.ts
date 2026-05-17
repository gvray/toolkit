import {
  CrudManager,
  DATE_RANGE_PRESETS,
  NotificationQueue,
  PermissionManager,
  TabManager,
  buildQueryParams,
  createDict,
  createTableState,
  exportCSV,
  flattenMenus,
  getBreadcrumbs,
  getDateRangePreset,
  menuToRoutes,
  pruneEmptyChildren,
  withVirtualRoot
} from '../src'

describe('adminkit', () => {
  it('table helpers', () => {
    const state = createTableState({ pageSize: 20 })
    expect(buildQueryParams(state)).toMatchObject({ page: 1, pageSize: 20 })
  })

  it('dict and permission', () => {
    const dict = createDict([{ value: 1, label: '启用', color: 'green' }])
    expect(dict.getLabel(1)).toBe('启用')
    const pm = new PermissionManager(['user:delete'], ['admin'])
    expect(pm.hasPermission('user:delete')).toBe(true)
    expect(pm.hasRole('admin')).toBe(true)
  })

  it('menu and tree', () => {
    const tree = [{ path: '/user', name: '用户', children: [{ path: '/user/list', name: '列表' }] }]
    expect(menuToRoutes(tree).length).toBe(1)
    expect(flattenMenus(tree).length).toBe(2)
    expect(getBreadcrumbs(tree, '/user/list').length).toBeGreaterThan(0)
    const withRoot = withVirtualRoot([{ id: 1, parentId: null }])
    expect(withRoot[0].id).toBe('__virtual_root__')
    expect(pruneEmptyChildren([{ id: 1, children: [] }])).toEqual([{ id: 1 }])
  })

  it('date presets and export', () => {
    expect(DATE_RANGE_PRESETS.today).toBe('today')
    expect(getDateRangePreset('today').length).toBe(2)
    Object.assign(global.URL, {
      createObjectURL: () => 'blob:mock',
      revokeObjectURL: () => undefined
    })
    exportCSV([{ a: 1 }], { filename: 'test' })
  })

  it('crud and ui managers', async () => {
    const crud = new CrudManager({ fetchList: async () => [{ id: 1 }] })
    await crud.load()
    expect(crud.state.list).toEqual([{ id: 1 }])
    const queue = new NotificationQueue({ maxCount: 2 })
    queue.push('a')
    expect(queue.list()).toEqual(['a'])
    const tabs = new TabManager()
    tabs.add({ path: '/a', title: 'A' })
    expect(tabs.list()).toHaveLength(1)
  })
})
