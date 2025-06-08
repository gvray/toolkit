type DebouncedFn = {
  (...args: any[]): void
  cancel: () => void
}

/**
 * @deprecated This function has been moved to @gvray/adminkit. Please use adminkit's debounce instead.
 * 此函数已移至 @gvray/adminkit，请使用 adminkit 中的 debounce 函数。
 *
 * Creates a debounced function that waits for the specified delay after the last call before executing.
 * 创建一个防抖函数，在最后一次调用后等待指定延迟时间再执行。
 *
 * @param fn The function to wrap. / 要包装的函数
 * @param delay The delay time (in milliseconds) before the function is executed. / 函数执行前的延迟时间（毫秒）
 * @param immediate Whether to execute the function immediately on the first call. / 是否在第一次调用时立即执行函数
 * @returns The wrapped debounced function. / 包装后的防抖函数
 */
const debounced = <Args extends any[]>(
  fn: (...args: Args) => void,
  delay: number,
  immediate?: boolean
): DebouncedFn => {
  console.warn(
    'debounced function is deprecated in eskit and will be removed in next major version. Please use @gvray/adminkit instead.'
  )
  console.warn('eskit 中的 debounced 函数已弃用，将在下个主要版本中移除。请使用 @gvray/adminkit。')

  let timeout: ReturnType<typeof setTimeout> | null = null

  const debouncedFn = (...args: Args) => {
    const later = () => {
      timeout = null
      if (!immediate) fn(...args)
    }

    const shouldCallNow = immediate && timeout === null

    if (timeout !== null) clearTimeout(timeout)
    timeout = setTimeout(later, delay)

    if (shouldCallNow) fn(...args)
  }

  /**
   * Cancels the debouncing, so that the debounced function no longer waits and does not execute.
   * 取消防抖，使防抖函数不再等待且不执行。
   */
  debouncedFn.cancel = () => {
    if (timeout !== null) {
      clearTimeout(timeout)
      timeout = null
    }
  }

  return debouncedFn as DebouncedFn
}

export default debounced
