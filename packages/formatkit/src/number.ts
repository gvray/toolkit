export interface FormatNumberCustomOptions {
  thousands?: string;
  decimal?: string;
  precision?: number;
}

export function formatNumber(
  value: number,
  locale = 'zh-CN',
  options: Intl.NumberFormatOptions = {}
): string {
  return new Intl.NumberFormat(locale, options).format(value);
}

export function formatCurrency(value: number, currency = 'CNY', locale = 'zh-CN'): string {
  return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(value);
}

export function formatPercent(
  value: number,
  locale = 'zh-CN',
  options: Intl.NumberFormatOptions = {}
): string {
  return new Intl.NumberFormat(locale, { style: 'percent', ...options }).format(value);
}

export interface FormatPercentValueOptions {
  /** 小数位数 / decimal places */
  digits?: number;
  /** 非有限数值时的回退文本 / fallback for non-finite values */
  fallback?: string;
}

/**
 * Formats a percent value that is already on the 0-100 scale.
 * 格式化已经乘以 100 的百分数值。
 *
 * @example
 * formatPercentValue(50.5) // => '51%'
 * formatPercentValue(50.5, { digits: 1 }) // => '50.5%'
 * @since 1.3.0
 */
export function formatPercentValue(value: number, options: FormatPercentValueOptions = {}): string {
  const { digits = 0, fallback = '-' } = options;
  if (!Number.isFinite(value)) return fallback;
  return `${value.toFixed(digits)}%`;
}

/**
 * Compact number formatting.
 * 紧凑数字格式。
 *
 * @example
 * formatCompact(1500000, 'en-US') // => '1.5M'
 * @since 1.0.0
 */
export function formatCompact(value: number, locale = 'zh-CN'): string {
  return new Intl.NumberFormat(locale, { notation: 'compact', compactDisplay: 'short' }).format(
    value
  );
}

/**
 * Ordinal formatting (English).
 * 序数格式化（英文）。
 *
 * @example
 * formatOrdinal(3) // => '3rd'
 * @since 1.0.0
 */
export function formatOrdinal(value: number, locale = 'en'): string {
  const pr = new Intl.PluralRules(locale, { type: 'ordinal' });
  const suffixes: Record<string, string> = { one: 'st', two: 'nd', few: 'rd', other: 'th' };
  const rule = pr.select(value);
  return `${value}${suffixes[rule] ?? suffixes.other}`;
}

/**
 * Custom separators number formatting.
 * 自定义分隔符数字格式化。
 *
 * @example
 * formatNumberCustom(1234567.89, { thousands: '.', decimal: ',', precision: 2 }) // => '1.234.567,89'
 * @since 1.0.0
 */
export function formatNumberCustom(value: number, options: FormatNumberCustomOptions = {}): string {
  const { thousands = ',', decimal = '.', precision = 0 } = options;
  const [intPart, fracPart = ''] = value.toFixed(precision).split('.');
  const grouped = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, thousands);
  return precision > 0 ? `${grouped}${decimal}${fracPart}` : grouped;
}
