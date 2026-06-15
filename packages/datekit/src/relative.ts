export interface RelativeOptions {
  now?: Date;
  locale?: string;
}

export interface HumanizeDurationOptions {
  locale?: string;
  /** Max number of units to show, default 2 */
  largest?: number;
}

const DURATION_UNITS = [
  { ms: 86400000, en: ['day', 'days'], zh: '天' },
  { ms: 3600000, en: ['hour', 'hours'], zh: '小时' },
  { ms: 60000, en: ['minute', 'minutes'], zh: '分钟' },
  { ms: 1000, en: ['second', 'seconds'], zh: '秒' },
];

const RELATIVE_UNITS: Array<{ unit: Intl.RelativeTimeFormatUnit; ms: number }> = [
  { unit: 'year', ms: 31536000000 },
  { unit: 'month', ms: 2629800000 },
  { unit: 'day', ms: 86400000 },
  { unit: 'hour', ms: 3600000 },
  { unit: 'minute', ms: 60000 },
];

function formatRelative(diffMs: number, locale: string): string {
  const diffSec = Math.round(diffMs / 1000);
  if (Math.abs(diffSec) < 60) {
    return locale.startsWith('zh') ? '刚刚' : 'just now';
  }
  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'always' });
  for (const { unit, ms } of RELATIVE_UNITS) {
    if (Math.abs(diffMs) >= ms) {
      return rtf.format(Math.round(diffMs / ms), unit);
    }
  }
  return locale.startsWith('zh') ? '刚刚' : 'just now';
}

/**
 * Relative time from now to the past — e.g., "3 minutes ago" / "3 分钟前".
 * 与现在的相对时间（面向过去），如 "3 分钟前"。
 *
 * @example
 * timeAgo(new Date(Date.now() - 60000)) // '1 minute ago' or '1 分钟前'
 * @since 1.0.0
 */
const normalizeRelativeOptions = (
  options: RelativeOptions | string = {}
): Required<RelativeOptions> => {
  if (typeof options === 'string') {
    return { now: new Date(), locale: options };
  }
  return { now: options.now ?? new Date(), locale: options.locale ?? 'zh-CN' };
};

export function timeAgo(date: Date, options: RelativeOptions | string = {}): string {
  const { now, locale } = normalizeRelativeOptions(options);
  return formatRelative(date.getTime() - now.getTime(), locale);
}

/**
 * Relative time from now to a future date — e.g., "in 3 days" / "3 天后".
 * 与现在的相对时间（面向未来），如 "3 天后"。
 *
 * @example
 * timeTo(new Date(Date.now() + 86400000 * 3)) // 'in 3 days' or '3 天后'
 * @since 1.0.0
 */
export function timeTo(date: Date, options: RelativeOptions | string = {}): string {
  const { now, locale } = normalizeRelativeOptions(options);
  return formatRelative(date.getTime() - now.getTime(), locale);
}

/**
 * Convert a duration in milliseconds to a human-readable string.
 * 将毫秒时长转换为可读字符串，如 "1 hour 30 minutes" / "1小时30分钟"。
 *
 * @example
 * humanizeDuration(5400000) // => '1小时30分钟'
 * humanizeDuration(5400000, { locale: 'en' }) // => '1 hour 30 minutes'
 * humanizeDuration(90061000, { largest: 3 }) // => '1天1小时1分钟'
 * @since 1.0.0
 */
export function humanizeDuration(ms: number, options: HumanizeDurationOptions = {}): string {
  const { locale = 'zh-CN', largest = 2 } = options;
  const isZh = locale.startsWith('zh');
  const absMs = Math.abs(ms);
  const parts: string[] = [];
  let remaining = absMs;

  for (const { ms: unitMs, en, zh } of DURATION_UNITS) {
    if (parts.length >= largest) break;
    const val = Math.floor(remaining / unitMs);
    if (val > 0) {
      remaining -= val * unitMs;
      parts.push(isZh ? `${val}${zh}` : `${val} ${val === 1 ? en[0] : en[1]}`);
    }
  }

  if (parts.length === 0) return isZh ? '0秒' : '0 seconds';
  return isZh ? parts.join('') : parts.join(' ');
}
