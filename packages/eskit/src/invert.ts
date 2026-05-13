/**
 * Swaps the keys and values of a flat object.
 * 交换扁平对象的键和值。
 *
 * @param object - The source object / 源对象
 * @returns A new object with swapped keys and values / 键值交换后的新对象
 * @example
 * invert({ a: 'x', b: 'y' })
 * // -> { x: 'a', y: 'b' }
 */
const invert = (object: Record<string, string | number | symbol>): Record<string, string> => {
  const result: Record<string, string> = {}

  Object.keys(object).forEach((key: string) => {
    result[String(object[key])] = key
  })

  return result
}

export default invert
