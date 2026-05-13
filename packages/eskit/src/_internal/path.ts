const pathSegmentPattern = /[^.[\]]+|\[(\d+)\]/g

export const toPath = (path: string | readonly PropertyKey[]): PropertyKey[] => {
  if (typeof path !== 'string') {
    return [...path]
  }

  const matches = path.match(pathSegmentPattern)

  if (!matches) {
    return []
  }

  return matches.map((segment: string): PropertyKey => {
    if (segment.startsWith('[') && segment.endsWith(']')) {
      return Number(segment.slice(1, -1))
    }

    return segment
  })
}
