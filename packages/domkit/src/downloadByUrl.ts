/**
 * Downloads a file from a URL by creating a temporary object URL and clicking a link with a download attribute.
 * @param Url - The URL of the file to download.
 * @param type - The MIME type of the file. Defaults to 'application/octet-stream'.
 * @example
 * downloadByUrl('https://example.com/my-file.xlsx', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
 *
 * @since 1.0.0
 */
const downloadByUrl = (Url: string, type = 'application/octet-stream'): void => {
  const blob = new Blob([''], { type });
  const url = URL.createObjectURL(blob);
  const downloadLink = document.createElement('a');
  downloadLink.href = Url;
  downloadLink.download = Url.replace(/(.*\/)*([^.]+.*)/gi, '$2').split('?')[0];
  downloadLink.dispatchEvent(
    new MouseEvent('click', { bubbles: true, cancelable: true, view: window })
  );
  URL.revokeObjectURL(url);
};

export default downloadByUrl;
