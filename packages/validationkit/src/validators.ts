export interface ValidationResult {
  isValid: boolean;
  message?: string | undefined;
}

export type Validator<T = any> = (value: T) => ValidationResult;

const createResult = (isValid: boolean, message?: string): ValidationResult => {
  return {
    isValid,
    message: isValid ? undefined : message,
  };
};

const luhn = (digits: string): boolean => {
  let sum = 0;
  let shouldDouble = false;
  for (let i = digits.length - 1; i >= 0; i--) {
    let d = Number(digits[i]);
    if (shouldDouble) {
      d *= 2;
      if (d > 9) d -= 9;
    }
    sum += d;
    shouldDouble = !shouldDouble;
  }
  return sum % 10 === 0;
};

const ID_CARD_WEIGHTS = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
const ID_CARD_CHECK = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];

const idCardChecksum = (id: string): boolean => {
  const upper = id.toUpperCase();
  const sum = upper
    .slice(0, 17)
    .split('')
    .reduce((acc, c, i) => acc + Number(c) * ID_CARD_WEIGHTS[i], 0);
  return ID_CARD_CHECK[sum % 11] === upper[17];
};

/**
 * Email validation / 邮箱验证
 *
 * @example
 * email('test@example.com') // => { isValid: true, message: undefined }
 * email('bad-email') // => { isValid: false, message: 'Invalid email format / 邮箱格式无效' }
 * @since 1.0.0
 */
export const email: Validator<string> = (value: string): ValidationResult => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isValid = emailRegex.test(value);
  return createResult(isValid, 'Invalid email format / 邮箱格式无效');
};

/**
 * Phone number validation (supports multiple formats) / 手机号验证（支持多种格式）
 *
 * @example
 * phone('13812345678', 'CN') // => { isValid: true, message: undefined }
 * phone('123') // => { isValid: false, message: 'Invalid phone number / 手机号格式无效' }
 * @since 1.0.0
 */
export const phone = (value: string, locale?: 'CN'): ValidationResult => {
  if (locale === 'CN') {
    return createResult(
      /^1[3-9]\d{9}$/.test(value),
      'Invalid Chinese mobile number / 手机号格式无效'
    );
  }

  // Remove all non-digit characters
  const cleaned = value.replace(/\D/g, '');

  // Check for common phone number lengths
  const isValid = cleaned.length >= 10 && cleaned.length <= 15;

  return createResult(isValid, 'Invalid phone number / 手机号格式无效');
};

/**
 * URL validation / URL验证
 *
 * @example
 * url('https://example.com') // => { isValid: true }
 * url('not-a-url') // => { isValid: false, message: 'Invalid URL format / URL格式无效' }
 * @since 1.0.0
 */
export const url: Validator<string> = (value: string): ValidationResult => {
  try {
    new URL(value);
    return { isValid: true };
  } catch {
    return createResult(false, 'Invalid URL format / URL格式无效');
  }
};

/**
 * Required field validation / 必填字段验证
 *
 * @example
 * required('hello') // => { isValid: true, message: undefined }
 * required('') // => { isValid: false, message: 'This field is required / 此字段为必填项' }
 * @since 1.0.0
 */
export const required: Validator = (value: any): ValidationResult => {
  const isEmpty =
    value === null ||
    value === undefined ||
    value === '' ||
    (Array.isArray(value) && value.length === 0) ||
    (typeof value === 'object' && Object.keys(value).length === 0);

  return {
    isValid: !isEmpty,
    message: isEmpty ? 'This field is required / 此字段为必填项' : undefined,
  };
};

/**
 * Minimum length validation / 最小长度验证
 *
 * @example
 * minLength(3)('ab') // => { isValid: false, message: 'Minimum length is 3 characters / 最小长度为3个字符' }
 * minLength(3)('abc') // => { isValid: true, message: undefined }
 * @since 1.0.0
 */
export const minLength =
  (min: number): Validator<string> =>
  (value: string): ValidationResult => {
    const isValid = value.length >= min;
    return createResult(isValid, `Minimum length is ${min} characters / 最小长度为${min}个字符`);
  };

/**
 * Maximum length validation / 最大长度验证
 *
 * @example
 * maxLength(5)('toolong') // => { isValid: false, message: 'Maximum length is 5 characters / 最大长度为5个字符' }
 * maxLength(5)('ok') // => { isValid: true, message: undefined }
 * @since 1.0.0
 */
export const maxLength =
  (max: number): Validator<string> =>
  (value: string): ValidationResult => {
    const isValid = value.length <= max;
    return createResult(isValid, `Maximum length is ${max} characters / 最大长度为${max}个字符`);
  };

/**
 * Minimum value validation / 最小值验证
 *
 * @example
 * min(10)(5) // => { isValid: false, message: 'Minimum value is 10 / 最小值为10' }
 * min(10)(10) // => { isValid: true, message: undefined }
 * @since 1.0.0
 */
export const min =
  (minimum: number): Validator<number> =>
  (value: number): ValidationResult => {
    const isValid = value >= minimum;
    return createResult(isValid, `Minimum value is ${minimum} / 最小值为${minimum}`);
  };

/**
 * Maximum value validation / 最大值验证
 *
 * @example
 * max(100)(200) // => { isValid: false, message: 'Maximum value is 100 / 最大值为100' }
 * max(100)(50) // => { isValid: true, message: undefined }
 * @since 1.0.0
 */
export const max =
  (maximum: number): Validator<number> =>
  (value: number): ValidationResult => {
    const isValid = value <= maximum;
    return createResult(isValid, `Maximum value is ${maximum} / 最大值为${maximum}`);
  };

/**
 * ID card validation / 身份证验证
 *
 * @example
 * idCard('11010519491231002X', 'CN') // => { isValid: true, message: undefined }
 * idCard('110101199001011234', 'CN') // => { isValid: false, message: 'Invalid ID card / 身份证号格式无效' }
 * @since 1.0.0
 */
export const idCard = (value: string, locale: 'CN'): ValidationResult => {
  if (locale === 'CN') {
    const formatOk =
      /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(
        value
      );
    return createResult(formatOk && idCardChecksum(value), 'Invalid ID card / 身份证号格式无效');
  }
  return createResult(false, 'Unsupported locale');
};

/**
 * Name validation / 姓名验证
 *
 * @example
 * personName('张三', 'CN') // => { isValid: true, message: undefined }
 * personName('艾力·木沙', 'CN') // => { isValid: true, message: undefined }
 * personName('John') // => { isValid: true, message: undefined }
 * personName('', 'CN') // => { isValid: false, message: 'Invalid name / 姓名格式无效' }
 * @since 1.0.0
 */
export const personName = (value: string, locale?: 'CN'): ValidationResult => {
  if (locale === 'CN') {
    const CJK = '[一-龥]';
    const ok =
      new RegExp(`^${CJK}{2,4}$`).test(value) || new RegExp(`^${CJK}+(·${CJK}+)+$`).test(value);
    return createResult(ok, 'Invalid name / 姓名格式无效');
  }
  return createResult(value.trim().length > 0, 'Invalid name / 姓名格式无效');
};

/**
 * Credit card validation using the Luhn algorithm / 使用 Luhn 算法的信用卡校验
 *
 * @example
 * creditCard('4111111111111111') // => { isValid: true, message: undefined }
 * creditCard('1234567890123456') // => { isValid: false, message: 'Invalid credit card number / 信用卡号格式无效' }
 * @since 1.0.0
 */
export const creditCard: Validator<string> = (value: string): ValidationResult => {
  const digits = value.replace(/\s|-/g, '');
  if (!/^\d{12,19}$/.test(digits)) {
    return createResult(false, 'Invalid credit card number / 信用卡号格式无效');
  }
  return createResult(luhn(digits), 'Invalid credit card number / 信用卡号格式无效');
};

/**
 * IPv4 validation / IPv4 验证
 *
 * @example
 * ipv4('192.168.1.1') // => { isValid: true, message: undefined }
 * ipv4('999.0.0.1') // => { isValid: false, message: 'Invalid IPv4 address / IPv4地址格式无效' }
 * @since 1.0.0
 */
export const ipv4: Validator<string> = (value: string): ValidationResult => {
  const parts = value.split('.');
  const isValid =
    parts.length === 4 &&
    parts.every(
      (part) => /^(0|[1-9]\d{0,2})$/.test(part) && Number(part) >= 0 && Number(part) <= 255
    );

  return createResult(isValid, 'Invalid IPv4 address / IPv4地址格式无效');
};

/**
 * Alphanumeric validation / 字母数字校验
 *
 * @example
 * alphanumeric('abc123') // => { isValid: true, message: undefined }
 * alphanumeric('abc!') // => { isValid: false, message: 'Value must be alphanumeric / 必须为字母数字组合' }
 * @since 1.0.0
 */
export const alphanumeric: Validator<string> = (value: string): ValidationResult => {
  return createResult(
    /^[a-z0-9]+$/i.test(value),
    'Value must be alphanumeric / 必须为字母数字组合'
  );
};

/**
 * Integer string validation / 整数字符串校验
 *
 * @example
 * integer('-42') // => { isValid: true, message: undefined }
 * integer('3.14') // => { isValid: false, message: 'Value must be an integer / 必须为整数' }
 * integer('42', { unsigned: true }) // => { isValid: true, message: undefined }
 * integer('-1', { unsigned: true }) // => { isValid: false, message: 'Value must be an integer / 必须为整数' }
 * @since 1.0.0
 */
export const integer = (value: string, options: { unsigned?: boolean } = {}): ValidationResult => {
  const isValid = options.unsigned ? /^\d+$/.test(value) : /^-?\d+$/.test(value);
  return createResult(isValid, 'Value must be an integer / 必须为整数');
};

/**
 * Strong password validation / 强密码校验
 *
 * @example
 * strongPassword('Abcdef1!') // => { isValid: true, message: undefined }
 * strongPassword('weakpass') // => { isValid: false, message: 'Password is not strong enough / 密码强度不足' }
 * @since 1.0.0
 */
export const strongPassword: Validator<string> = (value: string): ValidationResult => {
  const isValid =
    value.length >= 8 &&
    /[a-z]/.test(value) &&
    /[A-Z]/.test(value) &&
    /\d/.test(value) &&
    /[^A-Za-z0-9]/.test(value);

  return createResult(isValid, 'Password is not strong enough / 密码强度不足');
};

/**
 * Hex color validation / 十六进制颜色校验
 *
 * @example
 * hexColor('#fff') // => { isValid: true, message: undefined }
 * hexColor('red') // => { isValid: false, message: 'Invalid hex color / 十六进制颜色格式无效' }
 * @since 1.0.0
 */
export const hexColor: Validator<string> = (value: string): ValidationResult => {
  return createResult(
    /^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(value),
    'Invalid hex color / 十六进制颜色格式无效'
  );
};

/**
 * UUID validation / UUID 验证
 *
 * @example
 * uuid('550e8400-e29b-41d4-a716-446655440000') // => { isValid: true, message: undefined }
 * uuid('not-a-uuid') // => { isValid: false, message: 'Invalid UUID / UUID格式无效' }
 * @since 1.0.0
 */
export const uuid: Validator<string> = (value: string): ValidationResult => {
  return createResult(
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value),
    'Invalid UUID / UUID格式无效'
  );
};

/**
 * Slug validation / URL slug 校验
 *
 * @example
 * slug('my-post-title') // => { isValid: true, message: undefined }
 * slug('My Post') // => { isValid: false, message: 'Invalid slug / slug格式无效' }
 * @since 1.0.0
 */
export const slug: Validator<string> = (value: string): ValidationResult => {
  return createResult(/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value), 'Invalid slug / slug格式无效');
};

/**
 * Range validation / 区间校验
 *
 * @example
 * between(1, 10)(5) // => { isValid: true, message: undefined }
 * between(1, 10)(15) // => { isValid: false, message: 'Value must be between 1 and 10 / 值必须在1到10之间' }
 * @since 1.0.0
 */
export const between =
  (minimum: number, maximum: number): Validator<number> =>
  (value: number): ValidationResult => {
    return createResult(
      value >= minimum && value <= maximum,
      `Value must be between ${minimum} and ${maximum} / 值必须在${minimum}到${maximum}之间`
    );
  };

/**
 * Enum inclusion validation / 枚举包含校验
 *
 * @example
 * inList(['a', 'b', 'c'])('b') // => { isValid: true, message: undefined }
 * inList(['a', 'b', 'c'])('d') // => { isValid: false, message: 'Value is not in the allowed list / 值不在允许的列表中' }
 * @since 1.0.0
 */
export const inList =
  <T>(values: readonly T[]): Validator<T> =>
  (value: T): ValidationResult => {
    return createResult(
      values.includes(value),
      'Value is not in the allowed list / 值不在允许的列表中'
    );
  };

export { inList as in };

/**
 * Enum exclusion validation / 枚举排除校验
 *
 * @example
 * notIn(['admin', 'root'])('user') // => { isValid: true, message: undefined }
 * notIn(['admin', 'root'])('admin') // => { isValid: false, message: 'Value is in the blocked list / 值在禁止的列表中' }
 * @since 1.0.0
 */
export const notIn =
  <T>(values: readonly T[]): Validator<T> =>
  (value: T): ValidationResult => {
    return createResult(!values.includes(value), 'Value is in the blocked list / 值在禁止的列表中');
  };

/**
 * IPv6 validation / IPv6 验证
 *
 * @example
 * ipv6('::1') // => { isValid: true, message: undefined }
 * ipv6('not-an-ip') // => { isValid: false, message: 'Invalid IPv6 address / IPv6地址格式无效' }
 * @since 1.0.0
 */
export const ipv6: Validator<string> = (value: string): ValidationResult => {
  const isValid =
    /^(?:(?:[0-9a-f]{1,4}:){7}[0-9a-f]{1,4}|::1|::|(?:(?:[0-9a-f]{1,4}:){1,7}:)|(?:(?:[0-9a-f]{1,4}:){1,6}[0-9a-f]{1,4}))$/i.test(
      value
    );
  return createResult(isValid, 'Invalid IPv6 address / IPv6地址格式无效');
};

/**
 * Semantic version validation / 语义化版本号验证
 *
 * @example
 * semver('1.2.3') // => { isValid: true, message: undefined }
 * semver('v1.2') // => { isValid: false, message: 'Invalid semver / 语义化版本格式无效' }
 * @since 1.0.0
 */
export const semver: Validator<string> = (value: string): ValidationResult => {
  return createResult(
    /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-[\da-z.-]+)?(?:\+[\da-z.-]+)?$/i.test(value),
    'Invalid semver / 语义化版本格式无效'
  );
};

/**
 * Bank card validation / 银行卡号验证
 *
 * @example
 * bankCard('6222021302120006', 'CN') // => { isValid: true, message: undefined }
 * bankCard('1234', 'CN') // => { isValid: false, message: 'Invalid bank card / 银行卡号格式无效' }
 * @since 1.0.0
 */
export const bankCard = (value: string, locale: 'CN'): ValidationResult => {
  if (locale === 'CN') {
    const digits = value.replace(/\s/g, '');
    const ok = /^\d{16,19}$/.test(digits) && luhn(digits);
    return createResult(ok, 'Invalid bank card / 银行卡号格式无效');
  }
  return createResult(false, 'Unsupported locale');
};

/**
 * Base64 validation / Base64 验证
 *
 * @example
 * base64('SGVsbG8=') // => { isValid: true, message: undefined }
 * base64('not base64!!') // => { isValid: false, message: 'Invalid base64 string / Base64格式无效' }
 * @since 1.0.0
 */
export const base64: Validator<string> = (value: string): ValidationResult => {
  return createResult(
    /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(value),
    'Invalid base64 string / Base64格式无效'
  );
};

/**
 * JSON string validation / JSON 字符串验证
 *
 * @example
 * json('{"key":"value"}') // => { isValid: true, message: undefined }
 * json('{bad json}') // => { isValid: false, message: 'Invalid JSON string / JSON格式无效' }
 * @since 1.0.0
 */
export const json: Validator<string> = (value: string): ValidationResult => {
  try {
    JSON.parse(value);
    return createResult(true);
  } catch {
    return createResult(false, 'Invalid JSON string / JSON格式无效');
  }
};

export const pattern =
  (regex: RegExp, message = 'Invalid format / 格式无效'): Validator<string> =>
  (value: string): ValidationResult =>
    createResult(regex.test(value), message);

export const isLetterOrDigit = alphanumeric;
export const chineseIdCard: Validator<string> = (value: string): ValidationResult =>
  idCard(value, 'CN');
export const chineseMobile: Validator<string> = (value: string): ValidationResult =>
  phone(value, 'CN');
export const chineseName: Validator<string> = (value: string): ValidationResult =>
  personName(value, 'CN');
export const numeric: Validator<string | number> = (value: string | number): ValidationResult => {
  const isValid = value !== '' && Number.isFinite(Number(value));
  return createResult(isValid, 'Value must be numeric / 必须为数字');
};
export const custom =
  <T>(validator: (value: T) => boolean, message = 'Invalid value / 值无效'): Validator<T> =>
  (value: T): ValidationResult =>
    createResult(validator(value), message);
export const chineseBankCard: Validator<string> = (value: string): ValidationResult =>
  bankCard(value, 'CN');
