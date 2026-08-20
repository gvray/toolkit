/**
 * Remove a `<style>` element previously injected via `injectStyle`.
 * No-op if the element does not exist.
 *
 * @param id - The `id` attribute of the `<style>` element to remove.
 *
 * @example
 * removeStyle('theme-root')
 *
 * @since 1.3.0
 */
const removeStyle = (id: string): void => {
  const el = document.getElementById(id);
  el?.parentNode?.removeChild(el);
};

export default removeStyle;
