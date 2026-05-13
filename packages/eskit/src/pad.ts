/**
 * Pads a string on both sides to a target length.
 * 将字符串两侧填充到目标长度。
 *
 * @param value - The source string / 源字符串
 * @param length - The target length / 目标长度
 * @param fillString - The padding content / 填充内容
 * @returns The padded string / 填充后的字符串
 * @example
 * pad('hi', 6)
 * // -> '  hi  '
 */
const pad = (value: string, length: number, fillString: string = ' '): string => {
  if (!Number.isInteger(length) || length < 0) {
    throw new TypeError('length must be a non-negative integer')
  }

  return value.padStart(Math.floor((value.length + length) / 2), fillString).padEnd(length, fillString)
}

export default pad
