import { ValidationResult, Validator } from './validators'

export type AsyncValidator<T = unknown> = (value: T) => Promise<ValidationResult>

/**
 * Runs an async validator and returns its result.
 * 执行异步校验器并返回结果。
 *
 * @param value - Value to validate / 待校验值
 * @param validator - Async validator / 异步校验器
 * @returns Validation result / 校验结果
 *
 * @example
 * await validateAsync('user', asyncRule) // -> { isValid: true }
 */
export async function validateAsync<T>(value: T, validator: AsyncValidator<T>): Promise<ValidationResult> {
  return validator(value)
}

/**
 * Wraps a sync validator as async.
 * 将同步校验器包装为异步校验器。
 */
export function toAsyncValidator<T>(validator: Validator<T>): AsyncValidator<T> {
  return async (value: T): Promise<ValidationResult> => validator(value)
}
