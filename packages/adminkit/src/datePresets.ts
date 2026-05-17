const startOfDay = (date: Date): Date => new Date(date.getFullYear(), date.getMonth(), date.getDate())
const endOfDay = (date: Date): Date => new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59, 999)

export const DATE_RANGE_PRESETS = {
  today: 'today',
  yesterday: 'yesterday',
  last7days: 'last7days',
  last30days: 'last30days',
  thisMonth: 'thisMonth',
  lastMonth: 'lastMonth',
  thisQuarter: 'thisQuarter',
  thisYear: 'thisYear'
} as const

export type DateRangePreset = keyof typeof DATE_RANGE_PRESETS

export const getDateRangePreset = (preset: DateRangePreset): [Date, Date] => {
  const now = new Date()
  switch (preset) {
    case 'today':
      return [startOfDay(now), endOfDay(now)]
    case 'yesterday': {
      const y = new Date(now)
      y.setDate(y.getDate() - 1)
      return [startOfDay(y), endOfDay(y)]
    }
    case 'last7days': {
      const start = new Date(now)
      start.setDate(start.getDate() - 6)
      return [startOfDay(start), endOfDay(now)]
    }
    case 'last30days': {
      const start = new Date(now)
      start.setDate(start.getDate() - 29)
      return [startOfDay(start), endOfDay(now)]
    }
    case 'thisMonth':
      return [new Date(now.getFullYear(), now.getMonth(), 1), endOfDay(now)]
    case 'lastMonth': {
      const start = new Date(now.getFullYear(), now.getMonth() - 1, 1)
      const end = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59, 999)
      return [start, end]
    }
    case 'thisQuarter': {
      const quarter = Math.floor(now.getMonth() / 3)
      return [new Date(now.getFullYear(), quarter * 3, 1), endOfDay(now)]
    }
    case 'thisYear':
      return [new Date(now.getFullYear(), 0, 1), endOfDay(now)]
    default:
      return [startOfDay(now), endOfDay(now)]
  }
}
