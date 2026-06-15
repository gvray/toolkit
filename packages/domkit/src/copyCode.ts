import copyRichText from './copyRichText';

const escapeHtml = (value: string): string =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

/**
 * Copies a code snippet to the clipboard as both HTML and plain text.
 *
 * @param code - The code string to copy.
 * @param language - Optional language hint for the `class` attribute on the `<code>` element.
 * @returns `true` when the copy succeeded.
 *
 * @example
 * console.log(await copyCode('const x = 1', 'javascript'))
 *
 * @since 1.0.0
 */
const copyCode = async (code: string, language?: string): Promise<boolean> => {
  const className = language ? ` class="language-${escapeHtml(language)}"` : '';
  const html = `<pre><code${className}>${escapeHtml(code)}</code></pre>`;
  return copyRichText(html, code);
};

export default copyCode;
