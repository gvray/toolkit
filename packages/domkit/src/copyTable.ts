import copyRichText from './copyRichText';

/**
 * Copies a 2-D data array to the clipboard as an HTML table with a TSV plain-text fallback.
 *
 * @param data - The table rows and cells.
 * @param options - Formatting options.
 * @returns `true` when the copy succeeded.
 *
 * @example
 * console.log(await copyTable([['Name', 'Age'], ['Alice', '30']]))
 *
 * @since 1.0.0
 */
const copyTable = async (
  data: (string | number)[][],
  options: { header?: boolean; delimiter?: string } = {}
): Promise<boolean> => {
  const { delimiter = '\t', header = true } = options;
  const table = document.createElement('table');
  data.forEach((row, rowIndex) => {
    const tr = document.createElement('tr');
    row.forEach((cell) => {
      const tag = header && rowIndex === 0 ? 'th' : 'td';
      const cellEl = document.createElement(tag);
      cellEl.textContent = String(cell);
      tr.appendChild(cellEl);
    });
    table.appendChild(tr);
  });
  const text = data.map((row) => row.join(delimiter)).join('\n');
  return copyRichText(table.outerHTML, text);
};

export default copyTable;
