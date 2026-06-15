const COMMON_FORMATS = [
  'YYYY-MM-DD',
  'YYYY/MM/DD',
  'DD-MM-YYYY',
  'DD/MM/YYYY',
  'MM-DD-YYYY',
  'MM/DD/YYYY',
  'YYYY-MM-DD HH:mm:ss',
  'YYYY/MM/DD HH:mm:ss',
  'DD-MM-YYYY HH:mm:ss',
  'DD/MM/YYYY HH:mm:ss',
];

function parseWithFormat(dateString: string, format: string): Date | null {
  try {
    let pattern = format.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    pattern = pattern
      .replace(/YYYY/g, '(\\d{4})')
      .replace(/YY/g, '(\\d{2})')
      .replace(/MM/g, '(\\d{1,2})')
      .replace(/DD/g, '(\\d{1,2})')
      .replace(/HH/g, '(\\d{1,2})')
      .replace(/mm/g, '(\\d{1,2})')
      .replace(/ss/g, '(\\d{1,2})');

    const match = dateString.match(new RegExp(`^${pattern}$`));
    if (!match) return null;

    const formatParts = format.match(/(YYYY|YY|MM|DD|HH|mm|ss)/g) || [];
    const values = match.slice(1);
    let year = 0,
      month = 0,
      day = 1,
      hour = 0,
      minute = 0,
      second = 0;

    formatParts.forEach((part, i) => {
      const v = parseInt(values[i], 10);
      if (part === 'YYYY') year = v;
      else if (part === 'YY') year = v < 50 ? 2000 + v : 1900 + v;
      else if (part === 'MM') month = v - 1;
      else if (part === 'DD') day = v;
      else if (part === 'HH') hour = v;
      else if (part === 'mm') minute = v;
      else if (part === 'ss') second = v;
    });

    const d = new Date(year, month, day, hour, minute, second);
    if (
      d.getFullYear() !== year ||
      d.getMonth() !== month ||
      d.getDate() !== day ||
      d.getHours() !== hour ||
      d.getMinutes() !== minute ||
      d.getSeconds() !== second
    ) {
      return null;
    }
    return d;
  } catch {
    return null;
  }
}

/**
 * Parse various date inputs into a `Date` object.
 * 将字符串、时间戳（毫秒）或 Date 解析为 Date 对象，解析失败返回 null。
 *
 * - `string` — tries native parsing, then common format patterns; pass `format` for exact matching
 * - `number` — treated as **milliseconds** (JS standard); use `parseUnix` for seconds
 * - `Date` — returns a clone
 *
 * @example
 * parseDate('2024-01-15') // Date
 * parseDate(1705276800000) // Date from ms timestamp
 * parseDate('25/12/2023', 'DD/MM/YYYY') // Date with explicit format
 * @since 1.0.0
 */
export function parseDate(input: string | number | Date, format?: string): Date | null {
  if (input instanceof Date) {
    return isNaN(input.getTime()) ? null : new Date(input.getTime());
  }
  if (typeof input === 'number') {
    if (!isFinite(input)) return null;
    const d = new Date(input);
    return isNaN(d.getTime()) ? null : d;
  }
  if (!input || typeof input !== 'string') return null;
  if (format) return parseWithFormat(input, format);
  for (const fmt of COMMON_FORMATS) {
    const result = parseWithFormat(input, fmt);
    if (result) return result;
  }
  const native = new Date(input);
  return isNaN(native.getTime()) ? null : native;
}

export const parse = parseDate;
export const parseAny = parseDate;

/**
 * Parse an ISO 8601 date string.
 * 解析 ISO 8601 格式的日期字符串。
 *
 * @example
 * parseISO('2023-12-25T15:30:45.123Z') // Date
 * parseISO('2023-12-25T15:30:45+08:00') // Date
 * @since 1.0.0
 */
export function parseISO(isoString: string): Date | null {
  if (!isoString || typeof isoString !== 'string') return null;
  const d = new Date(isoString);
  return isNaN(d.getTime()) ? null : d;
}

/**
 * Parse a Unix timestamp in seconds (default) or milliseconds.
 * 解析 Unix 时间戳（默认单位为秒，可指定毫秒）。
 *
 * @example
 * parseUnix(1703520645) // Date from seconds
 * parseUnix(1703520645123, 'milliseconds') // Date from ms
 * @since 1.0.0
 */
export function parseUnix(
  timestamp: number,
  unit: 'seconds' | 'milliseconds' = 'seconds'
): Date | null {
  if (typeof timestamp !== 'number' || !isFinite(timestamp)) return null;
  const d = new Date(unit === 'seconds' ? timestamp * 1000 : timestamp);
  return isNaN(d.getTime()) ? null : d;
}
