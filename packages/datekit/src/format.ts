export interface FormatOptions {
  locale?: string;
  timeZone?: string;
}

/**
 * Format a date using a custom format string.
 * 使用自定义格式字符串格式化日期。
 *
 * Supported tokens:
 * `YYYY` `YY` `MMMM` `MMM` `MM` `M` `DD` `D` `HH` `H` `hh` `h` `mm` `m` `ss` `s` `SSS` `A` `a` `dddd` `ddd` `dd` `d`
 *
 * @example
 * format(new Date('2024-01-15T10:30:00'), 'YYYY-MM-DD') // => '2024-01-15'
 * format(new Date('2024-01-15'), 'MMMM D, YYYY', { locale: 'en-US' }) // => 'January 15, 2024'
 * format(new Date('2024-01-15'), 'YYYY年MM月DD日', { locale: 'zh-CN' }) // => '2024年01月15日'
 * @since 1.0.0
 */
export function format(date: Date, formatStr: string, options: FormatOptions = {}): string {
  const { locale = 'en-US', timeZone } = options;
  const d = timeZone ? new Date(date.toLocaleString('en-US', { timeZone })) : new Date(date);

  const year = d.getFullYear();
  const month = d.getMonth();
  const day = d.getDate();
  const hours = d.getHours();
  const minutes = d.getMinutes();
  const seconds = d.getSeconds();
  const millis = d.getMilliseconds();
  const dow = d.getDay();

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
      'December',
    ],
    'zh-CN': [
      '一月',
      '二月',
      '三月',
      '四月',
      '五月',
      '六月',
      '七月',
      '八月',
      '九月',
      '十月',
      '十一月',
      '十二月',
    ],
  };
  const monthNamesShort = {
    'en-US': ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    'zh-CN': [
      '1月',
      '2月',
      '3月',
      '4月',
      '5月',
      '6月',
      '7月',
      '8月',
      '9月',
      '10月',
      '11月',
      '12月',
    ],
  };
  const dayNames = {
    'en-US': ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    'zh-CN': ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
  };
  const dayNamesShort = {
    'en-US': ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    'zh-CN': ['日', '一', '二', '三', '四', '五', '六'],
  };
  const dayNamesMin = {
    'en-US': ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
    'zh-CN': ['日', '一', '二', '三', '四', '五', '六'],
  };

  const loc = locale in monthNames ? (locale as 'en-US' | 'zh-CN') : 'en-US';

  const replacements: Record<string, string> = {
    YYYY: year.toString(),
    YY: year.toString().slice(-2),
    MMMM: monthNames[loc][month],
    MMM: monthNamesShort[loc][month],
    MM: (month + 1).toString().padStart(2, '0'),
    M: (month + 1).toString(),
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
    SSS: millis.toString().padStart(3, '0'),
    A: hours >= 12 ? 'PM' : 'AM',
    a: hours >= 12 ? 'pm' : 'am',
    dddd: dayNames[loc][dow],
    ddd: dayNamesShort[loc][dow],
    dd: dayNamesMin[loc][dow],
    d: dow.toString(),
  };

  // Two-pass substitution using Unicode private-use-area placeholders to prevent token collisions
  // (e.g. 'M' inside 'MM' value, or digit tokens colliding with year digits)
  let result = formatStr;
  const phMap: Record<string, string> = {};
  let phIdx = 0;
  for (const token of Object.keys(replacements).sort((a, b) => b.length - a.length)) {
    const ph = `${phIdx++}`;
    phMap[ph] = replacements[token];
    result = result.replace(new RegExp(token, 'g'), ph);
  }
  for (const [ph, val] of Object.entries(phMap)) {
    result = result.replace(new RegExp(ph.replace(/[]/g, '\\$&'), 'g'), val);
  }
  return result;
}

export type DateRangeInput = Date | string | number;

export interface FormatDateRangeResult {
  start?: string;
  end?: string;
}

/**
 * Formats a date range into `{ start, end }` strings.
 * 将日期区间格式化为开始/结束字符串。
 *
 * @param range - A tuple of start and end dates / 开始和结束日期二元组
 * @param formatStr - Format string, same tokens as `format()` / 格式字符串，与 `format()` 一致
 * @returns `{ start, end }` or `undefined` when range is incomplete / 区间不完整时返回 `undefined`
 *
 * @example
 * formatDateRange([new Date('2024-01-01'), new Date('2024-01-31')], 'YYYY-MM-DD')
 * // => { start: '2024-01-01', end: '2024-01-31' }
 *
 * @since 1.3.0
 */
export function formatDateRange(
  range: readonly [DateRangeInput, DateRangeInput] | null | undefined,
  formatStr = 'YYYY-MM-DD'
): FormatDateRangeResult | undefined {
  if (!range || !range[0] || !range[1]) return undefined;

  const startDate = new Date(range[0]);
  const endDate = new Date(range[1]);

  if (Number.isNaN(startDate.getTime()) || Number.isNaN(endDate.getTime())) {
    return undefined;
  }

  return {
    start: format(startDate, formatStr),
    end: format(endDate, formatStr),
  };
}

/**
 * Common date format presets.
 * 常用日期格式预设，可直接传入 `format(date, DATE_FORMATS.ISO_DATE)`。
 *
 * @since 1.0.0
 */
export const DATE_FORMATS = {
  ISO_DATE: 'YYYY-MM-DD',
  ISO_TIME: 'HH:mm:ss',
  ISO_DATETIME: 'YYYY-MM-DDTHH:mm:ss',
  ISO_DATETIME_MS: 'YYYY-MM-DDTHH:mm:ss.SSS',
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
  DATE_CN: 'YYYY年MM月DD日',
  TIME_CN: 'HH时mm分ss秒',
  DATETIME_CN: 'YYYY年MM月DD日 HH时mm分ss秒',
} as const;

export interface FormatDateTimeOptions {
  dateStyle?: 'full' | 'long' | 'medium' | 'short';
  timeStyle?: 'full' | 'long' | 'medium' | 'short' | 'none';
  fallback?: string;
}

/**
 * Format a date using the browser's locale-aware `Intl` formatter.
 * 使用浏览器本地化的 Intl 格式器格式化日期时间。
 *
 * Accepts strings, numbers (ms timestamps), `Date`, or nullish. Returns `fallback`
 * (default `''`) when input is null/undefined or produces an invalid date.
 *
 * @param value - A `Date`, string, or ms timestamp; nullish returns `fallback` / 日期、字符串或毫秒时间戳；空值返回 fallback
 * @param options - `dateStyle` (default `'short'`), `timeStyle` (default `'medium'`, `'none'` for date-only), `fallback` (default `''`)
 * @returns The formatted date string, or `fallback` on invalid input / 格式化后的字符串，输入非法时返回 fallback
 *
 * @example
 * formatDateTime(new Date('2024-01-15T10:30:00')) // => '1/15/24, 10:30:00 AM' (locale-dependent)
 * formatDateTime('2024-01-15T10:30:00', { timeStyle: 'none' }) // => '1/15/24'
 * formatDateTime(null, { fallback: '-' }) // => '-'
 *
 * @since 1.4.0
 */
export function formatDateTime(
  value: DateRangeInput | null | undefined,
  options?: FormatDateTimeOptions
): string {
  const { dateStyle = 'short', timeStyle = 'medium', fallback = '' } = options ?? {};
  if (value === null || value === undefined) return fallback;
  const d = new Date(value);
  if (isNaN(d.getTime())) return fallback;
  if (timeStyle === 'none') return d.toLocaleDateString(undefined, { dateStyle });
  return d.toLocaleString(undefined, { dateStyle, timeStyle });
}
