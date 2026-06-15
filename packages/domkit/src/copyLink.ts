import copyText from './copyText';

/**
 * Copies a URL (and optional title) to the clipboard.
 *
 * @param url - The URL to copy.
 * @param title - Optional title prepended before the URL.
 * @returns `true` when the copy succeeded.
 *
 * @example
 * console.log(await copyLink('https://example.com', 'Example'))
 *
 * @since 1.0.0
 */
const copyLink = async (url: string, title?: string): Promise<boolean> =>
  copyText(title ? `${title}\n${url}` : url);

export default copyLink;
