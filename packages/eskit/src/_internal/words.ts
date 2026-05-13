const lowerUpperBoundary = /([a-z0-9])([A-Z])/g
const acronymBoundary = /([A-Z]+)([A-Z][a-z])/g
const separatorPattern = /[_\-\s]+/g

export const splitWords = (value: string): string[] => {
  return value
    .replace(acronymBoundary, '$1 $2')
    .replace(lowerUpperBoundary, '$1 $2')
    .replace(separatorPattern, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean)
}
