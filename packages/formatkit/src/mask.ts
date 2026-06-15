/**
 * Masks a phone number.
 * 手机号脱敏。
 *
 * @example
 * maskPhone('13812345678') // => '138****5678'
 * @since 1.0.0
 */
export function maskPhone(phone: string): string {
  return phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
}

/**
 * Masks a Chinese ID card number.
 * 身份证脱敏。
 *
 * @example
 * maskIdCard('110101199001011234') // => '1101**********1234'
 * @since 1.0.0
 */
export function maskIdCard(id: string): string {
  return id.replace(/^(\d{4})\d+(\d{4})$/, '$1**********$2');
}

/**
 * Masks a bank card number.
 * 银行卡脱敏。
 *
 * @example
 * maskBankCard('6222021234567890') // => '6222 **** **** 7890'
 * @since 1.0.0
 */
export function maskBankCard(card: string): string {
  const digits = card.replace(/\s/g, '');
  return digits.replace(/^(\d{4})\d+(\d{4})$/, '$1 **** **** $2');
}

/**
 * Masks an email address.
 * 邮箱脱敏。
 *
 * @example
 * maskEmail('john@example.com') // => 'j***@example.com'
 * @since 1.0.0
 */
export function maskEmail(email: string): string {
  const [name, domain] = email.split('@');
  if (!domain) {
    return email;
  }
  return `${name.slice(0, 1)}***@${domain}`;
}

/**
 * Masks a Chinese name.
 * 姓名脱敏。
 *
 * @example
 * maskName('张三') // => '张*'
 * @since 1.0.0
 */
export function maskName(name: string): string {
  if (name.length <= 1) {
    return name;
  }
  return `${name.slice(0, 1)}${'*'.repeat(name.length - 1)}`;
}

/**
 * Masks characters between start and end index.
 * 自定义区间脱敏。
 *
 * @example
 * maskCustom('abcdef', 2, 5) // => 'ab***f'
 * @since 1.0.0
 */
export function maskCustom(text: string, start: number, end: number, char = '*'): string {
  if (start < 0 || end < start) {
    throw new RangeError('invalid mask range');
  }
  return text.slice(0, start) + char.repeat(end - start) + text.slice(end);
}
