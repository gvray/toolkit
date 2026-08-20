import removeStyle from './removeStyle';

export interface InjectStyleOptions {
  /** The value for the `media` attribute of the `<style>` element. */
  media?: string;
}

/**
 * Inject or update a `<style>` element in `<head>` identified by `id`.
 * Calling again with the same `id` replaces the CSS instead of creating a new element.
 *
 * @param id - The `id` attribute of the `<style>` element.
 * @param css - The CSS string to inject.
 * @param options - Optional configuration for the `<style>` element.
 *
 * @example
 * injectStyle('theme-root', ':root { --color-primary: #007aff; }')
 * // update later — same element, new content
 * injectStyle('theme-root', ':root { --color-primary: #ff3b30; }')
 *
 * @example
 * const dispose = injectStyle('print-style', 'body { color: black; }', { media: 'print' })
 * dispose() // removes the style element
 *
 * @since 1.3.0
 */
const injectStyle = (id: string, css: string, options?: InjectStyleOptions): (() => void) => {
  let el = document.getElementById(id) as HTMLStyleElement | null;

  if (!el) {
    el = document.createElement('style');
    el.id = id;
    document.head.appendChild(el);
  }

  el.textContent = css;

  if (options?.media !== undefined) {
    el.media = options.media;
  }

  return () => removeStyle(id);
};

export default injectStyle;
