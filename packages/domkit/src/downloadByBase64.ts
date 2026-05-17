/**
 * Downloads a file from a base64 data URL or raw base64 string.
 */
const downloadByBase64 = (base64: string, filename: string): void => {
  const href = base64.startsWith('data:') ? base64 : `data:application/octet-stream;base64,${base64}`
  const link = document.createElement('a')
  link.href = href
  link.download = filename
  link.click()
}

export default downloadByBase64
