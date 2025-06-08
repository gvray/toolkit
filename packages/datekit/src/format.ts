export interface FormatOptions {
  locale?: string
  timeZone?: string
}

/**
 * Format tokens for date formatting.
 * 日期格式化的格式标记。
 */
export const FORMAT_TOKENS = {
  // Year / 年
  YYYY: 'YYYY', // 2023
  YY: 'YY', // 23

  // Month / 月
  MM: 'MM', // 01-12
  M: 'M', // 1-12
  MMM: 'MMM', // Jan, Feb, ...
  MMMM: 'MMMM', // January, February, ...

  // Day / 日
  DD: 'DD', // 01-31
  D: 'D', // 1-31

  // Hour / 小时
  HH: 'HH', // 00-23
  H: 'H', // 0-23
  hh: 'hh', // 01-12
  h: 'h', // 1-12

  // Minute / 分钟
  mm: 'mm', // 00-59
  m: 'm', // 0-59

  // Second / 秒
  ss: 'ss', // 00-59
  s: 's', // 0-59

  // Millisecond / 毫秒
  SSS: 'SSS', // 000-999

  // AM/PM
  A: 'A', // AM, PM
  a: 'a', // am, pm

  // Day of week / 星期
  dddd: 'dddd', // Monday, Tuesday, ...
  ddd: 'ddd', // Mon, Tue, ...
  dd: 'dd', // Mo, Tu, ...
  d: 'd' // 0-6 (Sunday is 0)
} as const

/**
 * Format a date using a custom format string.
 * 使用自定义格式字符串格式化日期。
 *
 * @param date - The date to format / 要格式化的日期
 * @param format - The format string / 格式字符串
 * @param options - Formatting options / 格式化选项
 * @returns Formatted date string / 格式化的日期字符串
 *
 * @example
 * ```typescript
 * const date = new Date('2023-12-25T15:30:45.123Z')
 *
 * format(date, 'YYYY-MM-DD') // '2023-12-25'
 * format(date, 'YYYY年MM月DD日') // '2023年12月25日'
 * format(date, 'HH:mm:ss') // '15:30:45'
 * format(date, 'dddd, MMMM D, YYYY') // 'Monday, December 25, 2023'
 * ```
 */
export function format(date: Date, formatStr: string, options: FormatOptions = {}): string {
  const { locale = 'en-US', timeZone } = options

  // Create a new date object to avoid mutation
  const d = timeZone ? new Date(date.toLocaleString('en-US', { timeZone })) : new Date(date)

  const year = d.getFullYear()
  const month = d.getMonth()
  const day = d.getDate()
  const hours = d.getHours()
  const minutes = d.getMinutes()
  const seconds = d.getSeconds()
  const milliseconds = d.getMilliseconds()
  const dayOfWeek = d.getDay()

  // Month names / 月份名称
  const monthNames = {
    'en-US': [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ],
    'zh-CN': ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
  }

  const monthNamesShort = {
    'en-US': ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    'zh-CN': ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
  }

  // Day names / 星期名称
  const dayNames = {
    'en-US': ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    'zh-CN': ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
  }

  const dayNamesShort = {
    'en-US': ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    'zh-CN': ['日', '一', '二', '三', '四', '五', '六']
  }

  const dayNamesMin = {
    'en-US': ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
    'zh-CN': ['日', '一', '二', '三', '四', '五', '六']
  }

  const currentLocale = locale in monthNames ? (locale as keyof typeof monthNames) : 'en-US'

  const replacements: Record<string, string> = {
    YYYY: year.toString(),
    YY: year.toString().slice(-2),
    MM: (month + 1).toString().padStart(2, '0'),
    M: (month + 1).toString(),
    MMMM: monthNames[currentLocale][month],
    MMM: monthNamesShort[currentLocale][month],
    DD: day.toString().padStart(2, '0'),
    D: day.toString(),
    HH: hours.toString().padStart(2, '0'),
    H: hours.toString(),
    hh: (hours % 12 || 12).toString().padStart(2, '0'),
    h: (hours % 12 || 12).toString(),
    mm: minutes.toString().padStart(2, '0'),
    m: minutes.toString(),
    ss: seconds.toString().padStart(2, '0'),
    s: seconds.toString(),
    SSS: milliseconds.toString().padStart(3, '0'),
    A: hours >= 12 ? 'PM' : 'AM',
    a: hours >= 12 ? 'pm' : 'am',
    dddd: dayNames[currentLocale][dayOfWeek],
    ddd: dayNamesShort[currentLocale][dayOfWeek],
    dd: dayNamesMin[currentLocale][dayOfWeek],
    d: dayOfWeek.toString()
  }

  // Replace tokens in order of length (longest first) to avoid conflicts
  // Use a placeholder system to avoid conflicts
  let result = formatStr
  const placeholders: Record<string, string> = {}
  let placeholderIndex = 0

  // First pass: replace with unique placeholders
  const sortedTokens = Object.keys(replacements).sort((a, b) => b.length - a.length)
  for (const token of sortedTokens) {
    const placeholder = `\uE000${placeholderIndex++}\uE001` // Use private use area characters
    placeholders[placeholder] = replacements[token]
    result = result.replace(new RegExp(token, 'g'), placeholder)
  }

  // Second pass: replace placeholders with actual values
  for (const [placeholder, value] of Object.entries(placeholders)) {
    result = result.replace(new RegExp(placeholder.replace(/[\uE000\uE001]/g, '\\$&'), 'g'), value)
  }

  return result
}

/**
 * Common date format presets.
 * 常用日期格式预设。
 */
export const DATE_FORMATS = {
  // ISO formats / ISO格式
  ISO_DATE: 'YYYY-MM-DD',
  ISO_TIME: 'HH:mm:ss',
  ISO_DATETIME: 'YYYY-MM-DDTHH:mm:ss',
  ISO_DATETIME_MS: 'YYYY-MM-DDTHH:mm:ss.SSS',

  // Common formats / 常用格式
  DATE_SHORT: 'M/D/YYYY',
  DATE_MEDIUM: 'MMM D, YYYY',
  DATE_LONG: 'MMMM D, YYYY',
  DATE_FULL: 'dddd, MMMM D, YYYY',

  TIME_SHORT: 'h:mm A',
  TIME_MEDIUM: 'h:mm:ss A',
  TIME_LONG: 'HH:mm:ss',

  DATETIME_SHORT: 'M/D/YYYY h:mm A',
  DATETIME_MEDIUM: 'MMM D, YYYY h:mm A',
  DATETIME_LONG: 'MMMM D, YYYY h:mm:ss A',

  // Chinese formats / 中文格式
  DATE_CN: 'YYYY年MM月DD日',
  TIME_CN: 'HH时mm分ss秒',
  DATETIME_CN: 'YYYY年MM月DD日 HH时mm分ss秒'
} as const

/**
 * Format a date using a preset format.
 * 使用预设格式格式化日期。
 */
export function formatPreset(date: Date, preset: keyof typeof DATE_FORMATS, options?: FormatOptions): string {
  return format(date, DATE_FORMATS[preset], options)
}
