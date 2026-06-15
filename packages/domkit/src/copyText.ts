/**
 * Copies a plain-text string to the clipboard.
 *
 * @param text - The text to copy.
 * @returns `true` when the copy succeeded.
 *
 * @example
 * console.log(await copyText('Hello World'))
 *
 * @since 1.0.0
 */
const copyText = async (text: string): Promise<boolean> => {
  if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // Fall through to the legacy copy path below.
    }
  }

  if (typeof document === 'undefined') return false;

  const area = document.createElement('textarea');
  try {
    area.value = text;
    area.style.position = 'fixed';
    area.style.left = '-9999px';
    document.body.appendChild(area);
    area.select();
    return document.execCommand?.('copy') ?? false;
  } catch {
    return false;
  } finally {
    area.remove();
  }
};

export default copyText;
