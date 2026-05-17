const BINARY = 1024

/**
 * Formats byte size (binary units by default).
 * 文件大小格式化（默认二进制单位）。
 */
export function formatFileSize(bytes: number, decimals = 2, binary = true): string {
  if (!Number.isFinite(bytes) || bytes < 0) {
    throw new RangeError('bytes must be a non-negative finite number')
  }
  if (bytes === 0) {
    return '0 B'
  }
  const base = binary ? BINARY : 1000
  const units = binary
    ? ['B', 'KB', 'MB', 'GB', 'TB']
    : ['B', 'KB', 'MB', 'GB', 'TB']
  const index = Math.min(Math.floor(Math.log(bytes) / Math.log(base)), units.length - 1)
  const value = bytes / Math.pow(base, index)
  return `${value.toFixed(decimals)} ${units[index]}`
}

/**
 * Formats bitrate.
 * 比特率格式化。
 */
export function formatBitrate(bitsPerSecond: number, decimals = 2): string {
  return `${formatFileSize(bitsPerSecond, decimals, true).replace('B', 'bps')}`
}
