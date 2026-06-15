/**
 * Downloads a file from a base64 data URL or raw base64 string.
 *
 * @param base64 - The base64 string or data URL.
 * @param filename - The filename for the downloaded file.
 *
 * @example
 * console.log('triggering download...')
 * downloadByBase64('data:image/png;base64,iVBORw0KGgo=', 'image.png')
 *
 * @since 1.0.0
 */
const downloadByBase64 = (base64: string, filename: string): void => {
  const href = base64.startsWith('data:')
    ? base64
    : `data:application/octet-stream;base64,${base64}`;
  const link = document.createElement('a');
  link.href = href;
  link.download = filename;
  link.click();
};

export default downloadByBase64;
