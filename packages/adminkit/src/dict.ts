export interface DictItem<T = string | number> {
  value: T
  label: string
  color?: string
  type?: string
}

export const createDict = <T extends string | number>(items: DictItem<T>[]) => {
  const map = new Map<T, DictItem<T>>(items.map((item) => [item.value, item]))
  return {
    items,
    getLabel(value: T, fallback = ''): string {
      return map.get(value)?.label ?? fallback
    },
    getTag(value: T): { color?: string; type?: string } {
      const item = map.get(value)
      return {
        ...(item?.color !== undefined ? { color: item.color } : {}),
        ...(item?.type !== undefined ? { type: item.type } : {})
      }
    },
    toOptions(): Array<{ label: string; value: T }> {
      return items.map(({ label, value }) => ({ label, value }))
    }
  }
}

export const dictToOptions = <T extends string | number>(dict: ReturnType<typeof createDict<T>>) => dict.toOptions()
export const getDictLabel = <T extends string | number>(dict: ReturnType<typeof createDict<T>>, value: T, fallback = '') =>
  dict.getLabel(value, fallback)
export const getDictTag = <T extends string | number>(dict: ReturnType<typeof createDict<T>>, value: T) => dict.getTag(value)
