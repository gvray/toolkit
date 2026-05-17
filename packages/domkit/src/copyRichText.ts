import copyText from './copyText'

const copyRichText = async (html: string, fallbackText: string): Promise<boolean> => {
  try {
    if (navigator.clipboard?.write) {
      await navigator.clipboard.write([
        new ClipboardItem({
          'text/html': new Blob([html], { type: 'text/html' }),
          'text/plain': new Blob([fallbackText], { type: 'text/plain' })
        })
      ])
      return true
    }
  } catch {
    // fallback below
  }
  return copyText(fallbackText)
}

export default copyRichText
