/**
 * Formats seconds as duration string.
 * 秒数转时长字符串。
 *
 * @example
 * formatDuration(3661) // => '1h 1m 1s'
 * @since 1.0.0
 */
export function formatDuration(totalSeconds: number): string {
  const seconds = Math.max(0, Math.floor(totalSeconds));
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  const parts: string[] = [];
  if (h > 0) parts.push(`${h}h`);
  if (m > 0 || h > 0) parts.push(`${m}m`);
  parts.push(`${s}s`);
  return parts.join(' ');
}

/**
 * Formats seconds as a human-readable uptime string.
 * 秒数转运行时长字符串。
 *
 * @example
 * formatUptime(90061) // => '1 天 1 小时 1 分'
 * @since 1.3.0
 */
export function formatUptime(totalSeconds: number): string {
  const seconds = Math.max(0, Math.floor(totalSeconds));
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  const parts: string[] = [];
  if (days > 0) parts.push(`${days} 天`);
  if (hours > 0) parts.push(`${hours} 小时`);
  if (minutes > 0 || parts.length === 0) parts.push(`${minutes} 分`);

  return parts.join(' ');
}

/**
 * Formats seconds as HH:MM:SS countdown.
 * 倒计时 HH:MM:SS 格式。
 *
 * @example
 * formatCountdown(3661) // => '01:01:01'
 * @since 1.0.0
 */
export function formatCountdown(totalSeconds: number): string {
  const seconds = Math.max(0, Math.floor(totalSeconds));
  const h = String(Math.floor(seconds / 3600)).padStart(2, '0');
  const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
  const s = String(seconds % 60).padStart(2, '0');
  return `${h}:${m}:${s}`;
}
