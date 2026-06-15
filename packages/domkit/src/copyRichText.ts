import copyText from './copyText';

/**
 * Copies rich HTML content to the clipboard, with a plain-text fallback.
 *
 * @param html - The HTML string to write to the clipboard.
 * @param fallbackText - Plain-text fallback used when the Clipboard API is unavailable.
 * @returns `true` when the copy succeeded.
 *
 * @example
 * console.log(await copyRichText('<b>Hello</b>', 'Hello'))
 *
 * @since 1.0.0
 */
const copyRichText = async (html: string, fallbackText: string): Promise<boolean> => {
  try {
    if (navigator.clipboard?.write) {
      await navigator.clipboard.write([
        new ClipboardItem({
          'text/html': new Blob([html], { type: 'text/html' }),
          'text/plain': new Blob([fallbackText], { type: 'text/plain' }),
        }),
      ]);
      return true;
    }
  } catch {
    // fallback below
  }
  return copyText(fallbackText);
};

export default copyRichText;
