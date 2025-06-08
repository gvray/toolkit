/**
 * Parse a date string into a Date object.
 * 将日期字符串解析为Date对象。
 *
 * @param dateString - The date string to parse / 要解析的日期字符串
 * @param format - Optional format hint / 可选的格式提示
 * @returns Parsed Date object or null if parsing fails / 解析的Date对象，解析失败返回null
 *
 * @example
 * ```typescript
 * parse('2023-12-25') // Date object for 2023-12-25
 * parse('25/12/2023', 'DD/MM/YYYY') // Date object for 2023-12-25
 * parse('invalid') // null
 * ```
 */
export function parse(dateString: string, format?: string): Date | null {
  if (!dateString || typeof dateString !== 'string') {
    return null
  }

  // Try native Date parsing first
  const nativeDate = new Date(dateString)
  if (!isNaN(nativeDate.getTime())) {
    return nativeDate
  }

  // If format is provided, try custom parsing
  if (format) {
    return parseWithFormat(dateString, format)
  }

  // Try common formats
  const commonFormats = [
    'YYYY-MM-DD',
    'YYYY/MM/DD',
    'DD-MM-YYYY',
    'DD/MM/YYYY',
    'MM-DD-YYYY',
    'MM/DD/YYYY',
    'YYYY-MM-DD HH:mm:ss',
    'YYYY/MM/DD HH:mm:ss',
    'DD-MM-YYYY HH:mm:ss',
    'DD/MM/YYYY HH:mm:ss'
  ]

  for (const fmt of commonFormats) {
    const result = parseWithFormat(dateString, fmt)
    if (result) {
      return result
    }
  }

  return null
}

/**
 * Parse a date string with a specific format.
 * 使用特定格式解析日期字符串。
 */
function parseWithFormat(dateString: string, format: string): Date | null {
  try {
    // Escape special regex characters first
    let pattern = format.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

    // Create regex pattern from format
    pattern = pattern
      .replace(/YYYY/g, '(\\d{4})')
      .replace(/YY/g, '(\\d{2})')
      .replace(/MM/g, '(\\d{1,2})')
      .replace(/DD/g, '(\\d{1,2})')
      .replace(/HH/g, '(\\d{1,2})')
      .replace(/mm/g, '(\\d{1,2})')
      .replace(/ss/g, '(\\d{1,2})')

    const regex = new RegExp(`^${pattern}$`)
    const match = dateString.match(regex)

    if (!match) {
      return null
    }

    // Extract date parts based on format
    const formatParts = format.match(/(YYYY|YY|MM|DD|HH|mm|ss)/g) || []
    const values = match.slice(1)

    let year = 0,
      month = 0,
      day = 1,
      hour = 0,
      minute = 0,
      second = 0

    formatParts.forEach((part, index) => {
      const value = parseInt(values[index], 10)

      switch (part) {
        case 'YYYY':
          year = value
          break
        case 'YY':
          year = value < 50 ? 2000 + value : 1900 + value
          break
        case 'MM':
          month = value - 1 // JavaScript months are 0-indexed
          break
        case 'DD':
          day = value
          break
        case 'HH':
          hour = value
          break
        case 'mm':
          minute = value
          break
        case 'ss':
          second = value
          break
      }
    })

    const date = new Date(year, month, day, hour, minute, second)

    // Validate the parsed date
    if (date.getFullYear() !== year || date.getMonth() !== month || date.getDate() !== day) {
      return null
    }

    return date
  } catch {
    return null
  }
}

/**
 * Parse an ISO 8601 date string.
 * 解析ISO 8601日期字符串。
 *
 * @example
 * ```typescript
 * parseISO('2023-12-25T15:30:45.123Z')
 * parseISO('2023-12-25T15:30:45+08:00')
 * ```
 */
export function parseISO(isoString: string): Date | null {
  if (!isoString || typeof isoString !== 'string') {
    return null
  }

  const date = new Date(isoString)
  return isNaN(date.getTime()) ? null : date
}

/**
 * Parse a Unix timestamp (seconds or milliseconds).
 * 解析Unix时间戳（秒或毫秒）。
 *
 * @param timestamp - Unix timestamp / Unix时间戳
 * @param unit - 'seconds' or 'milliseconds' / '秒'或'毫秒'
 *
 * @example
 * ```typescript
 * parseUnix(1703520645) // From seconds
 * parseUnix(1703520645123, 'milliseconds') // From milliseconds
 * ```
 */
export function parseUnix(timestamp: number, unit: 'seconds' | 'milliseconds' = 'seconds'): Date | null {
  if (typeof timestamp !== 'number' || !isFinite(timestamp)) {
    return null
  }

  const ms = unit === 'seconds' ? timestamp * 1000 : timestamp
  const date = new Date(ms)

  return isNaN(date.getTime()) ? null : date
}

/**
 * Try to parse a date from various common formats.
 * 尝试从各种常见格式解析日期。
 *
 * @param input - Date input (string, number, or Date) / 日期输入（字符串、数字或Date）
 * @returns Parsed Date object or null / 解析的Date对象或null
 *
 * @example
 * ```typescript
 * parseAny('2023-12-25') // Date object
 * parseAny(1703520645) // Date object from Unix timestamp
 * parseAny(new Date()) // Returns the same Date object
 * ```
 */
export function parseAny(input: string | number | Date): Date | null {
  if (input instanceof Date) {
    return isNaN(input.getTime()) ? null : input
  }

  if (typeof input === 'number') {
    return parseUnix(input)
  }

  if (typeof input === 'string') {
    // Try ISO format first
    const isoResult = parseISO(input)
    if (isoResult) {
      return isoResult
    }

    // Try general parsing
    return parse(input)
  }

  return null
}
