/**
 * Counts how many times `substring` appears in `text`.
 * 统计子串在文本中出现的次数。
 *
 * @param text - Source text / 源文本
 * @param substring - Substring to count / 子串
 * @returns Occurrence count / 出现次数
 * @example
 * count('abcabc', 'a')
 * // -> 2
 */
const count = (text: string, substring: string): number => {
  if (substring === '') {
    throw new RangeError('substring cannot be empty')
  }

  let total = 0
  let position = 0

  while (position <= text.length) {
    const index = text.indexOf(substring, position)
    if (index === -1) {
      break
    }
    total += 1
    position = index + substring.length
  }

  return total
}

export default count
