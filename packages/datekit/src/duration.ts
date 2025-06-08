/**
 * Calculate duration between two dates.
 * 计算两个日期之间的时长。
 */
export function duration(
  start: Date,
  end: Date
): {
  milliseconds: number
  seconds: number
  minutes: number
  hours: number
  days: number
} {
  const diff = end.getTime() - start.getTime()

  return {
    milliseconds: diff,
    seconds: Math.floor(diff / 1000),
    minutes: Math.floor(diff / (1000 * 60)),
    hours: Math.floor(diff / (1000 * 60 * 60)),
    days: Math.floor(diff / (1000 * 60 * 60 * 24))
  }
}
