export interface TableState {
  page: number
  pageSize: number
  total: number
  sortField?: string
  sortOrder?: 'asc' | 'desc'
  filters: Record<string, unknown>
  selectedKeys: Array<string | number>
}

export const createTableState = (options: { pageSize?: number; total?: number } = {}): TableState => ({
  page: 1,
  pageSize: options.pageSize ?? 10,
  total: options.total ?? 0,
  filters: {},
  selectedKeys: []
})

export const buildQueryParams = (state: TableState): Record<string, unknown> => ({
  page: state.page,
  pageSize: state.pageSize,
  sortField: state.sortField,
  sortOrder: state.sortOrder,
  ...state.filters
})

export class TableManager {
  state: TableState

  constructor(options: { pageSize?: number } = {}) {
    this.state = createTableState(options)
  }

  setPage(page: number): void {
    this.state.page = page
  }

  setSort(field: string, order: 'asc' | 'desc'): void {
    this.state.sortField = field
    this.state.sortOrder = order
  }

  setFilter(key: string, value: unknown): void {
    this.state.filters[key] = value
  }
}

export const createPagination = (options: { total: number; pageSize: number; page?: number }) => ({
  page: options.page ?? 1,
  pageSize: options.pageSize,
  total: options.total,
  onChange(page: number, pageSize: number) {
    this.page = page
    this.pageSize = pageSize
  }
})

export const createSelection = <T extends { id: string | number }>(rows: T[]) => {
  const selectedKeys: Array<string | number> = []
  return {
    selectedKeys,
    toggleItem(id: string | number) {
      const index = selectedKeys.indexOf(id)
      if (index >= 0) selectedKeys.splice(index, 1)
      else selectedKeys.push(id)
    },
    selectAll() {
      selectedKeys.splice(0, selectedKeys.length, ...rows.map((row) => row.id))
    },
    clear() {
      selectedKeys.splice(0, selectedKeys.length)
    }
  }
}
