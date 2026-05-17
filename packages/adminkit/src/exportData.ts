const downloadBlob = (blob: Blob, filename: string): void => {
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  link.click()
  URL.revokeObjectURL(url)
}

export const exportCSV = (rows: Record<string, unknown>[], options: { filename?: string } = {}): void => {
  if (!rows.length) return
  const headers = Object.keys(rows[0])
  const csv = [headers.join(','), ...rows.map((row) => headers.map((key) => JSON.stringify(row[key] ?? '')).join(','))].join('\n')
  downloadBlob(new Blob([csv], { type: 'text/csv;charset=utf-8;' }), `${options.filename ?? 'export'}.csv`)
}

export const exportJSON = (data: unknown, options: { filename?: string } = {}): void => {
  downloadBlob(new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' }), `${options.filename ?? 'export'}.json`)
}

/** Requires optional peer dependency `xlsx`. */
export const exportExcel = async (rows: Record<string, unknown>[], options: { filename?: string } = {}): Promise<void> => {
  let XLSX: { utils: { json_to_sheet: (data: unknown[]) => unknown; book_new: () => unknown; book_append_sheet: (wb: unknown, sheet: unknown, name: string) => void }; write: (wb: unknown, opts: { bookType: string; type: string }) => ArrayBuffer }
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    XLSX = require('xlsx')
  } catch {
    throw new Error('exportExcel requires peer dependency "xlsx"')
  }
  const sheet = XLSX.utils.json_to_sheet(rows)
  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, sheet, 'Sheet1')
  const buffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' })
  downloadBlob(new Blob([buffer]), `${options.filename ?? 'export'}.xlsx`)
}

export const parseImportFile = async (file: File): Promise<Record<string, unknown>[]> => {
  const text = await file.text()
  if (file.name.endsWith('.json')) return JSON.parse(text) as Record<string, unknown>[]
  const [headerLine, ...lines] = text.split(/\r?\n/).filter(Boolean)
  const headers = headerLine.split(',')
  return lines.map((line) => {
    const values = line.split(',')
    return headers.reduce<Record<string, unknown>>((acc, key, index) => {
      acc[key] = values[index]
      return acc
    }, {})
  })
}

export const validateImportRows = <T extends Record<string, unknown>>(
  rows: T[],
  rules: Record<string, (value: unknown) => boolean>
): Array<{ row: number; errors: string[] }> => {
  const errors: Array<{ row: number; errors: string[] }> = []
  rows.forEach((row, index) => {
    const rowErrors: string[] = []
    Object.entries(rules).forEach(([field, validate]) => {
      if (!validate(row[field])) rowErrors.push(field)
    })
    if (rowErrors.length) errors.push({ row: index + 1, errors: rowErrors })
  })
  return errors
}

export const downloadImportTemplate = (columns: string[], filename = 'template.csv'): void => {
  const templateRow = columns.reduce<Record<string, string>>((acc, column) => {
    acc[column] = ''
    return acc
  }, {})
  exportCSV([templateRow], { filename: filename.replace(/\.csv$/, '') })
}
