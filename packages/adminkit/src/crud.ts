export interface CrudState<T> {
  list: T[]
  current: T | null
  loading: boolean
  dialogVisible: boolean
  submitting: boolean
}

export const createCrudState = <T>(): CrudState<T> => ({
  list: [],
  current: null,
  loading: false,
  dialogVisible: false,
  submitting: false
})

export class CrudManager<T> {
  state: CrudState<T>
  private fetchList: () => Promise<T[]>

  constructor(options: { fetchList: () => Promise<T[]> }) {
    this.state = createCrudState<T>()
    this.fetchList = options.fetchList
  }

  async load(): Promise<void> {
    this.state.loading = true
    try {
      this.state.list = await this.fetchList()
    } finally {
      this.state.loading = false
    }
  }

  openDialog(item: T | null = null): void {
    this.state.current = item
    this.state.dialogVisible = true
  }

  closeDialog(): void {
    this.state.dialogVisible = false
    this.state.current = null
  }
}
