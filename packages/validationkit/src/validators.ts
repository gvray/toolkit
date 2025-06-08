export interface ValidationResult {
  isValid: boolean
  message?: string | undefined
}

export type Validator<T = any> = (value: T) => ValidationResult

/**
 * Email validation / 邮箱验证
 */
export const email: Validator<string> = (value: string): ValidationResult => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const isValid = emailRegex.test(value)
  const result: ValidationResult = { isValid }
  if (!isValid) result.message = 'Invalid email format / 邮箱格式无效'
  return result
}

/**
 * Phone number validation (supports multiple formats) / 手机号验证（支持多种格式）
 */
export const phone: Validator<string> = (value: string): ValidationResult => {
  // Remove all non-digit characters
  const cleaned = value.replace(/\D/g, '')

  // Check for common phone number lengths
  const isValid = cleaned.length >= 10 && cleaned.length <= 15

  return {
    isValid,
    message: isValid ? undefined : 'Invalid phone number / 手机号格式无效'
  }
}

/**
 * URL validation / URL验证
 */
export const url: Validator<string> = (value: string): ValidationResult => {
  try {
    new URL(value)
    return { isValid: true }
  } catch {
    return {
      isValid: false,
      message: 'Invalid URL format / URL格式无效'
    }
  }
}

/**
 * Required field validation / 必填字段验证
 */
export const required: Validator = (value: any): ValidationResult => {
  const isEmpty =
    value === null ||
    value === undefined ||
    value === '' ||
    (Array.isArray(value) && value.length === 0) ||
    (typeof value === 'object' && Object.keys(value).length === 0)

  return {
    isValid: !isEmpty,
    message: isEmpty ? 'This field is required / 此字段为必填项' : undefined
  }
}

/**
 * Minimum length validation / 最小长度验证
 */
export const minLength =
  (min: number): Validator<string> =>
  (value: string): ValidationResult => {
    const isValid = value.length >= min
    return {
      isValid,
      message: isValid ? undefined : `Minimum length is ${min} characters / 最小长度为${min}个字符`
    }
  }

/**
 * Maximum length validation / 最大长度验证
 */
export const maxLength =
  (max: number): Validator<string> =>
  (value: string): ValidationResult => {
    const isValid = value.length <= max
    return {
      isValid,
      message: isValid ? undefined : `Maximum length is ${max} characters / 最大长度为${max}个字符`
    }
  }

/**
 * Minimum value validation / 最小值验证
 */
export const min =
  (minimum: number): Validator<number> =>
  (value: number): ValidationResult => {
    const isValid = value >= minimum
    return {
      isValid,
      message: isValid ? undefined : `Minimum value is ${minimum} / 最小值为${minimum}`
    }
  }

/**
 * Maximum value validation / 最大值验证
 */
export const max =
  (maximum: number): Validator<number> =>
  (value: number): ValidationResult => {
    const isValid = value <= maximum
    return {
      isValid,
      message: isValid ? undefined : `Maximum value is ${maximum} / 最大值为${maximum}`
    }
  }

/**
 * Pattern validation / 正则表达式验证
 */
export const pattern =
  (regex: RegExp, message?: string): Validator<string> =>
  (value: string): ValidationResult => {
    const isValid = regex.test(value)
    return {
      isValid,
      message: isValid ? undefined : message || 'Invalid format / 格式无效'
    }
  }

/**
 * Checks if a character is a letter or digit / 检查字符是否为字母或数字
 */
export const isLetterOrDigit: Validator<string> = (char: string): ValidationResult => {
  if (typeof char !== 'string' || char.length !== 1) {
    return { isValid: false, message: 'Input must be a single character / 输入必须是单个字符' }
  }

  const charCode = char.charCodeAt(0)
  const isValid =
    (charCode >= 65 && charCode <= 90) || // A-Z
    (charCode >= 97 && charCode <= 122) || // a-z
    (charCode >= 48 && charCode <= 57) // 0-9

  return {
    isValid,
    message: isValid ? undefined : 'Character must be a letter or digit / 字符必须是字母或数字'
  }
}

/**
 * Chinese ID card validation / 中国身份证验证
 */
export const chineseIdCard: Validator<string> = (value: string): ValidationResult => {
  const idCardRegex = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
  return {
    isValid: idCardRegex.test(value),
    message: idCardRegex.test(value) ? undefined : 'Invalid Chinese ID card / 身份证号格式无效'
  }
}

/**
 * Chinese mobile phone validation / 中国手机号验证
 */
export const chineseMobile: Validator<string> = (value: string): ValidationResult => {
  const mobileRegex = /^1[3-9]\d{9}$/
  return {
    isValid: mobileRegex.test(value),
    message: mobileRegex.test(value) ? undefined : 'Invalid Chinese mobile number / 手机号格式无效'
  }
}
