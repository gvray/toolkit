/**
 * Formats a number as currency with customizable options.
 * 将数字格式化为货币，支持自定义选项。
 *
 * @param amount - The number to be formatted / 要格式化的数字
 * @param options - Formatting options / 格式化选项
 * @returns A formatted currency string / 格式化后的货币字符串
 *
 * @example
 * ```typescript
 * formatMoney(1234.56) // "$1,234.56"
 * formatMoney(1234.56, { currency: 'EUR', locale: 'de-DE' }) // "1.234,56 €"
 * formatMoney(1234.56, { currency: 'CNY', locale: 'zh-CN' }) // "¥1,234.56"
 * formatMoney(1234.56, { symbol: '£' }) // "£1,234.56"
 * ```
 */
export function formatMoney(
  amount: number,
  options: {
    currency?: string
    locale?: string
    symbol?: string
    minimumFractionDigits?: number
    maximumFractionDigits?: number
  } = {}
): string {
  const { currency = 'USD', locale = 'en-US', symbol, minimumFractionDigits = 2, maximumFractionDigits = 2 } = options

  if (symbol) {
    // Use custom symbol
    const formatter = new Intl.NumberFormat(locale, {
      minimumFractionDigits,
      maximumFractionDigits
    })
    return `${symbol}${formatter.format(amount)}`
  }

  // Use built-in currency formatting
  const formatter = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits,
    maximumFractionDigits
  })

  return formatter.format(amount)
}

/**
 * Formats a number with thousands separators.
 * 格式化数字，添加千位分隔符。
 *
 * @param num - The number to format / 要格式化的数字
 * @param locale - The locale to use for formatting / 用于格式化的区域设置
 * @returns A formatted number string / 格式化后的数字字符串
 *
 * @example
 * ```typescript
 * formatNumber(1234567) // "1,234,567"
 * formatNumber(1234567.89, 'de-DE') // "1.234.567,89"
 * formatNumber(1234567.89, 'zh-CN') // "1,234,567.89"
 * ```
 */
export function formatNumber(num: number, locale = 'en-US'): string {
  return new Intl.NumberFormat(locale).format(num)
}

/**
 * Formats a number as a percentage.
 * 将数字格式化为百分比。
 *
 * @param num - The number to format (0.5 = 50%) / 要格式化的数字（0.5 = 50%）
 * @param decimals - Number of decimal places / 小数位数
 * @param locale - The locale to use / 使用的区域设置
 * @returns A formatted percentage string / 格式化后的百分比字符串
 *
 * @example
 * ```typescript
 * formatPercentage(0.1234) // "12.34%"
 * formatPercentage(0.1234, 1) // "12.3%"
 * formatPercentage(0.1234, 0) // "12%"
 * ```
 */
export function formatPercentage(num: number, decimals = 2, locale = 'en-US'): string {
  return new Intl.NumberFormat(locale, {
    style: 'percent',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  }).format(num)
}

/**
 * Formats file size in human readable format.
 * 将文件大小格式化为人类可读的格式。
 *
 * @param bytes - Size in bytes / 字节大小
 * @param decimals - Number of decimal places / 小数位数
 * @param binary - Use binary units (1024) instead of decimal (1000) / 使用二进制单位（1024）而不是十进制（1000）
 * @returns A formatted file size string / 格式化后的文件大小字符串
 *
 * @example
 * ```typescript
 * formatFileSize(1024) // "1.0 KB"
 * formatFileSize(1024, 0) // "1 KB"
 * formatFileSize(1024, 2, true) // "1.00 KiB"
 * formatFileSize(1048576) // "1.0 MB"
 * ```
 */
export function formatFileSize(bytes: number, decimals = 1, binary = false): string {
  if (bytes === 0) return '0 Bytes'

  const k = binary ? 1024 : 1000
  const sizes = binary ? ['Bytes', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB'] : ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB']

  const i = Math.floor(Math.log(bytes) / Math.log(k))
  const value = bytes / Math.pow(k, i)

  return `${value.toFixed(decimals)} ${sizes[i]}`
}

/**
 * Formats a phone number for display.
 * 格式化电话号码以便显示。
 *
 * @param phone - The phone number string / 电话号码字符串
 * @param format - The format pattern / 格式模式
 * @returns A formatted phone number / 格式化后的电话号码
 *
 * @example
 * ```typescript
 * formatPhoneNumber('1234567890') // "(123) 456-7890"
 * formatPhoneNumber('1234567890', 'xxx-xxx-xxxx') // "123-456-7890"
 * formatPhoneNumber('13812345678', 'xxx xxxx xxxx') // "138 1234 5678"
 * ```
 */
export function formatPhoneNumber(phone: string, format = '(xxx) xxx-xxxx'): string {
  // Remove all non-digit characters
  const cleaned = phone.replace(/\D/g, '')

  // Apply format pattern
  let formatted = format
  for (let i = 0; i < cleaned.length; i++) {
    formatted = formatted.replace('x', cleaned[i])
  }

  // Remove any remaining 'x' characters
  return formatted.replace(/x/g, '')
}

/**
 * Formats a number with custom separator and decimal places.
 * 使用自定义分隔符和小数位数格式化数字。
 *
 * @param val - The number to format / 要格式化的数字
 * @param separator - The thousands separator / 千位分隔符
 * @param digitNum - Number of decimal places / 小数位数
 * @returns Formatted number string / 格式化后的数字字符串
 *
 * @example
 * ```typescript
 * formatNumberCustom(123456.789, ',', 2) // "123,456.79"
 * formatNumberCustom(1000, ' ', 0) // "1 000"
 * formatNumberCustom(123.456, '', 1) // "123.5"
 * ```
 */
export function formatNumberCustom(val: number, separator: string, digitNum = 0): string {
  let value: any = val

  if ((value = (value = `${value}`).replace(/^\s*|\s*$|,*/g, '')).match(/^\d*\.?\d*$/) == null) return val.toString()

  value = (digitNum as number) >= 0 ? `${Number(value).toFixed(digitNum)}` : value

  let r: string[] | string = [],
    tl = value.split('.')[0],
    tr = value.split('.')[1]

  tr = typeof tr != 'undefined' ? tr : ''

  if (separator != null && separator != '') {
    while (tl.length >= 3) {
      r.push(tl.substring(tl.length - 3))

      tl = tl.substring(0, tl.length - 3)
    }

    if (tl.length > 0) r.push(tl)

    r.reverse()

    r = r.join(separator)

    return tr == '' ? r : `${r}.${tr}`
  }

  return value as string
}

/**
 * Truncates text to a specified length and adds ellipsis.
 * 将文本截断到指定长度并添加省略号。
 *
 * @param text - The text to truncate / 要截断的文本
 * @param maxLength - Maximum length / 最大长度
 * @param suffix - Suffix to add (default: '...') / 要添加的后缀（默认：'...'）
 * @returns Truncated text / 截断后的文本
 *
 * @example
 * ```typescript
 * truncateText('This is a long text', 10) // "This is a..."
 * truncateText('Short', 10) // "Short"
 * truncateText('Very long text', 8, '…') // "Very lon…"
 * ```
 */
export function truncateText(text: string, maxLength: number, suffix = '...'): string {
  if (text.length <= maxLength) {
    return text
  }

  return text.slice(0, maxLength - suffix.length) + suffix
}
