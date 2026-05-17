export interface FormatNumberCustomOptions {
  thousands?: string
  decimal?: string
  precision?: number
}

/**
 * Formats a number as currency.
 * 货币格式化。
 */
export function formatCurrency(amount: number, currency = 'CNY', locale = 'zh-CN'): string {
  return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(amount)
}

/**
 * Formats a number with locale grouping.
 * 数字千分位格式化。
 */
export function formatNumber(value: number, precision = 0, locale = 'en-US'): string {
  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: precision,
    maximumFractionDigits: precision
  }).format(value)
}

/**
 * Formats a ratio as percent string.
 * 百分比格式化。
 */
export function formatPercent(value: number, precision = 1, locale = 'en-US'): string {
  return new Intl.NumberFormat(locale, {
    style: 'percent',
    minimumFractionDigits: precision,
    maximumFractionDigits: precision
  }).format(value)
}

/**
 * Compact number formatting.
 * 紧凑数字格式。
 */
export function formatCompact(value: number, locale = 'zh-CN'): string {
  return new Intl.NumberFormat(locale, { notation: 'compact', compactDisplay: 'short' }).format(value)
}

/**
 * Ordinal formatting (English).
 * 序数格式化（英文）。
 */
export function formatOrdinal(value: number, locale = 'en'): string {
  const pr = new Intl.PluralRules(locale, { type: 'ordinal' })
  const suffixes: Record<string, string> = { one: 'st', two: 'nd', few: 'rd', other: 'th' }
  const rule = pr.select(value)
  return `${value}${suffixes[rule] ?? suffixes.other}`
}

/**
 * Custom separators number formatting.
 * 自定义分隔符数字格式化。
 */
export function formatNumberCustom(value: number, options: FormatNumberCustomOptions = {}): string {
  const { thousands = ',', decimal = '.', precision = 0 } = options
  const [intPart, fracPart = ''] = value.toFixed(precision).split('.')
  const grouped = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, thousands)
  return precision > 0 ? `${grouped}${decimal}${fracPart}` : grouped
}
