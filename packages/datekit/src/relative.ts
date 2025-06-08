/**
 * Get relative time string.
 * 获取相对时间字符串。
 */
export function timeAgo(date: Date, locale = 'en-US'): string {
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const seconds = Math.floor(diff / 1000)

  if (seconds < 60) return locale === 'zh-CN' ? '刚刚' : 'just now'

  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) {
    return locale === 'zh-CN' ? `${minutes}分钟前` : `${minutes} minute${minutes > 1 ? 's' : ''} ago`
  }

  const hours = Math.floor(minutes / 60)
  if (hours < 24) {
    return locale === 'zh-CN' ? `${hours}小时前` : `${hours} hour${hours > 1 ? 's' : ''} ago`
  }

  const days = Math.floor(hours / 24)
  return locale === 'zh-CN' ? `${days}天前` : `${days} day${days > 1 ? 's' : ''} ago`
}
