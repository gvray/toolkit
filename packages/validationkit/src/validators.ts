export interface ValidationResult {
  isValid: boolean
  message?: string | undefined
}

export type Validator<T = any> = (value: T) => ValidationResult

const createResult = (isValid: boolean, message?: string): ValidationResult => {
  return {
    isValid,
    message: isValid ? undefined : message
  }
}

/**
 * Email validation / 邮箱验证
 */
export const email: Validator<string> = (value: string): ValidationResult => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const isValid = emailRegex.test(value)
  return createResult(isValid, 'Invalid email format / 邮箱格式无效')
}

/**
 * Phone number validation (supports multiple formats) / 手机号验证（支持多种格式）
 */
export const phone = (value: string, locale?: 'CN'): ValidationResult => {
  if (locale === 'CN') {
    return createResult(/^1[3-9]\d{9}$/.test(value), 'Invalid Chinese mobile number / 手机号格式无效')
  }

  // Remove all non-digit characters
  const cleaned = value.replace(/\D/g, '')

  // Check for common phone number lengths
  const isValid = cleaned.length >= 10 && cleaned.length <= 15

  return createResult(isValid, 'Invalid phone number / 手机号格式无效')
}

/**
 * URL validation / URL验证
 */
export const url: Validator<string> = (value: string): ValidationResult => {
  try {
    new URL(value)
    return { isValid: true }
  } catch {
    return createResult(false, 'Invalid URL format / URL格式无效')
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
    return createResult(isValid, `Minimum length is ${min} characters / 最小长度为${min}个字符`)
  }

/**
 * Maximum length validation / 最大长度验证
 */
export const maxLength =
  (max: number): Validator<string> =>
  (value: string): ValidationResult => {
    const isValid = value.length <= max
    return createResult(isValid, `Maximum length is ${max} characters / 最大长度为${max}个字符`)
  }

/**
 * Minimum value validation / 最小值验证
 */
export const min =
  (minimum: number): Validator<number> =>
  (value: number): ValidationResult => {
    const isValid = value >= minimum
    return createResult(isValid, `Minimum value is ${minimum} / 最小值为${minimum}`)
  }

/**
 * Maximum value validation / 最大值验证
 */
export const max =
  (maximum: number): Validator<number> =>
  (value: number): ValidationResult => {
    const isValid = value <= maximum
    return createResult(isValid, `Maximum value is ${maximum} / 最大值为${maximum}`)
  }

/**
 * Pattern validation / 正则表达式验证
 */
export const pattern =
  (regex: RegExp, message?: string): Validator<string> =>
  (value: string): ValidationResult => {
    const isValid = regex.test(value)
    return createResult(isValid, message || 'Invalid format / 格式无效')
  }

/**
 * Checks if a character is a letter or digit / 检查字符是否为字母或数字
 */
export const isLetterOrDigit: Validator<string> = (char: string): ValidationResult => {
  if (typeof char !== 'string' || char.length !== 1) {
    return createResult(false, 'Input must be a single character / 输入必须是单个字符')
  }

  const charCode = char.charCodeAt(0)
  const isValid =
    (charCode >= 65 && charCode <= 90) || // A-Z
    (charCode >= 97 && charCode <= 122) || // a-z
    (charCode >= 48 && charCode <= 57) // 0-9

  return createResult(isValid, 'Character must be a letter or digit / 字符必须是字母或数字')
}

/**
 * Chinese ID card validation / 中国身份证验证
 */
export const chineseIdCard: Validator<string> = (value: string): ValidationResult => {
  const idCardRegex = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
  return createResult(idCardRegex.test(value), 'Invalid Chinese ID card / 身份证号格式无效')
}

/**
 * Chinese mobile phone validation / 中国手机号验证
 */
export const chineseMobile: Validator<string> = (value: string): ValidationResult => {
  const mobileRegex = /^1[3-9]\d{9}$/
  return createResult(mobileRegex.test(value), 'Invalid Chinese mobile number / 手机号格式无效')
}

/**
 * Chinese name validation / 中文姓名验证
 */
export const chineseName: Validator<string> = (value: string): ValidationResult => {
  return createResult(/^[\u4e00-\u9fa5]{2,4}$/.test(value), 'Invalid Chinese name / 中文姓名格式无效')
}

/**
 * Credit card validation using the Luhn algorithm / 使用 Luhn 算法的信用卡校验
 */
export const creditCard: Validator<string> = (value: string): ValidationResult => {
  const digits = value.replace(/\s|-/g, '')

  if (!/^\d{12,19}$/.test(digits)) {
    return createResult(false, 'Invalid credit card number / 信用卡号格式无效')
  }

  let sum = 0
  let shouldDouble = false

  for (let index = digits.length - 1; index >= 0; index--) {
    let digit = Number(digits[index])

    if (shouldDouble) {
      digit *= 2
      if (digit > 9) {
        digit -= 9
      }
    }

    sum += digit
    shouldDouble = !shouldDouble
  }

  return createResult(sum % 10 === 0, 'Invalid credit card number / 信用卡号格式无效')
}

/**
 * IPv4 validation / IPv4 验证
 */
export const ipv4: Validator<string> = (value: string): ValidationResult => {
  const parts = value.split('.')
  const isValid =
    parts.length === 4 &&
    parts.every((part) => /^(0|[1-9]\d{0,2})$/.test(part) && Number(part) >= 0 && Number(part) <= 255)

  return createResult(isValid, 'Invalid IPv4 address / IPv4地址格式无效')
}

/**
 * Alphanumeric validation / 字母数字校验
 */
export const alphanumeric: Validator<string> = (value: string): ValidationResult => {
  return createResult(/^[a-z0-9]+$/i.test(value), 'Value must be alphanumeric / 必须为字母数字组合')
}

/**
 * Numeric string validation / 数字字符串校验
 */
export const numeric: Validator<string> = (value: string): ValidationResult => {
  return createResult(/^\d+$/.test(value), 'Value must be numeric / 必须为纯数字')
}

/**
 * Integer string validation / 整数字符串校验
 */
export const integer: Validator<string> = (value: string): ValidationResult => {
  return createResult(/^-?\d+$/.test(value), 'Value must be an integer / 必须为整数')
}

/**
 * Strong password validation / 强密码校验
 */
export const strongPassword: Validator<string> = (value: string): ValidationResult => {
  const isValid =
    value.length >= 8 &&
    /[a-z]/.test(value) &&
    /[A-Z]/.test(value) &&
    /\d/.test(value) &&
    /[^A-Za-z0-9]/.test(value)

  return createResult(isValid, 'Password is not strong enough / 密码强度不足')
}

/**
 * Hex color validation / 十六进制颜色校验
 */
export const hexColor: Validator<string> = (value: string): ValidationResult => {
  return createResult(/^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(value), 'Invalid hex color / 十六进制颜色格式无效')
}

/**
 * UUID validation / UUID 验证
 */
export const uuid: Validator<string> = (value: string): ValidationResult => {
  return createResult(
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value),
    'Invalid UUID / UUID格式无效'
  )
}

/**
 * Slug validation / URL slug 校验
 */
export const slug: Validator<string> = (value: string): ValidationResult => {
  return createResult(/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value), 'Invalid slug / slug格式无效')
}

/**
 * Range validation / 区间校验
 */
export const between =
  (minimum: number, maximum: number): Validator<number> =>
  (value: number): ValidationResult => {
    return createResult(value >= minimum && value <= maximum, `Value must be between ${minimum} and ${maximum} / 值必须在${minimum}到${maximum}之间`)
  }

/**
 * Enum inclusion validation / 枚举包含校验
 */
const inList =
  <T>(values: readonly T[]): Validator<T> =>
  (value: T): ValidationResult => {
    return createResult(values.includes(value), 'Value is not in the allowed list / 值不在允许的列表中')
  }

export { inList as in }

/**
 * Enum exclusion validation / 枚举排除校验
 */
export const notIn =
  <T>(values: readonly T[]): Validator<T> =>
  (value: T): ValidationResult => {
    return createResult(!values.includes(value), 'Value is in the blocked list / 值在禁止的列表中')
  }

/**
 * Custom validator factory / 自定义校验器工厂
 */
export const custom =
  <T>(predicate: (value: T) => boolean, message = 'Custom validation failed / 自定义校验失败'): Validator<T> =>
  (value: T): ValidationResult => {
    return createResult(predicate(value), message)
  }
