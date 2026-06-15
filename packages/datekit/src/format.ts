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
