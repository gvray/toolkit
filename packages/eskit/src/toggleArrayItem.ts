/**
 * Toggles an item in an array: removes it if present, otherwise appends it.
 * 切换数组中某个元素的选中状态：存在则移除，不存在则追加。
 *
 * @param arr - Source array / 源数组
 * @param item - Item to toggle / 要切换的元素
 * @returns New array / 新数组
 *
 * @example
 * toggleArrayItem([1, 2, 3], 2) // => [1, 3]
 * toggleArrayItem([1, 3], 2) // => [1, 3, 2]
 *
 * @since 1.5.0
 */
const toggleArrayItem = <T>(arr: readonly T[], item: T): T[] =>
  arr.includes(item) ? arr.filter((x) => x !== item) : [...arr, item];

export default toggleArrayItem;
