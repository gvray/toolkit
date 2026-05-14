import {
  alphanumeric,
  between,
  chineseName,
  email,
  creditCard,
  custom,
  hexColor,
  integer,
  ipv4,
  phone,
  url,
  required,
  minLength,
  maxLength,
  min,
  max,
  notIn,
  pattern,
  numeric,
  isLetterOrDigit,
  chineseIdCard,
  chineseMobile,
  slug,
  strongPassword,
  uuid,
  in as inValidator
} from '../src/validators'

describe('validators', () => {
  describe('email', () => {
    it('should validate correct email addresses', () => {
      const validEmails = [
        'test@example.com',
        'user.name@domain.co.uk',
        'user+tag@example.org',
        'user_123@test-domain.com'
      ]

      validEmails.forEach((emailAddress) => {
        const result = email(emailAddress)
        expect(result.isValid).toBe(true)
        expect(result.message).toBeUndefined()
      })
    })

    it('should invalidate incorrect email addresses', () => {
      const invalidEmails = ['invalid-email', 'test@', '@domain.com', 'test@domain', '']

      invalidEmails.forEach((emailAddress) => {
        const result = email(emailAddress)
        expect(result.isValid).toBe(false)
        expect(result.message).toBe('Invalid email format / 邮箱格式无效')
      })
    })
  })

  describe('phone', () => {
    it('should validate phone numbers with correct length', () => {
      const validPhones = ['1234567890', '+1 (555) 123-4567', '555-123-4567', '15512345678', '+86 155 1234 5678']

      validPhones.forEach((phoneNumber) => {
        const result = phone(phoneNumber)
        expect(result.isValid).toBe(true)
        expect(result.message).toBeUndefined()
      })
    })

    it('should invalidate phone numbers with incorrect length', () => {
      const invalidPhones = ['123', '12345', '123456789012345678', 'abcdefghij', '']

      invalidPhones.forEach((phoneNumber) => {
        const result = phone(phoneNumber)
        expect(result.isValid).toBe(false)
        expect(result.message).toBe('Invalid phone number / 手机号格式无效')
      })
    })

    it('should validate strict CN locale mobile numbers', () => {
      expect(phone('13812345678', 'CN').isValid).toBe(true)
      expect(phone('12345678901', 'CN').isValid).toBe(false)
    })
  })

  describe('url', () => {
    it('should validate correct URLs', () => {
      const validUrls = [
        'https://www.example.com',
        'http://localhost:3000',
        'ftp://files.example.com',
        'https://sub.domain.com/path?query=value#fragment'
      ]

      validUrls.forEach((urlValue) => {
        const result = url(urlValue)
        expect(result.isValid).toBe(true)
        expect(result.message).toBeUndefined()
      })
    })

    it('should invalidate incorrect URLs', () => {
      const invalidUrls = ['not-a-url', 'just-text', 'http://', '']

      invalidUrls.forEach((urlValue) => {
        const result = url(urlValue)
        expect(result.isValid).toBe(false)
        expect(result.message).toBe('Invalid URL format / URL格式无效')
      })
    })
  })

  describe('required', () => {
    it('should validate non-empty values', () => {
      const validValues = ['text', 123, true, false, [1, 2, 3], { key: 'value' }, 0]

      validValues.forEach((value) => {
        const result = required(value)
        expect(result.isValid).toBe(true)
        expect(result.message).toBeUndefined()
      })
    })

    it('should invalidate empty values', () => {
      const emptyValues = [null, undefined, '', [], {}]

      emptyValues.forEach((value) => {
        const result = required(value)
        expect(result.isValid).toBe(false)
        expect(result.message).toBe('This field is required / 此字段为必填项')
      })
    })
  })

  describe('minLength', () => {
    it('should validate strings with sufficient length', () => {
      const validator = minLength(5)
      const result = validator('hello world')
      expect(result.isValid).toBe(true)
      expect(result.message).toBeUndefined()
    })

    it('should invalidate strings that are too short', () => {
      const validator = minLength(5)
      const result = validator('hi')
      expect(result.isValid).toBe(false)
      expect(result.message).toBe('Minimum length is 5 characters / 最小长度为5个字符')
    })

    it('should validate strings with exact minimum length', () => {
      const validator = minLength(5)
      const result = validator('hello')
      expect(result.isValid).toBe(true)
    })
  })

  describe('maxLength', () => {
    it('should validate strings within maximum length', () => {
      const validator = maxLength(10)
      const result = validator('short')
      expect(result.isValid).toBe(true)
      expect(result.message).toBeUndefined()
    })

    it('should invalidate strings that are too long', () => {
      const validator = maxLength(5)
      const result = validator('too long string')
      expect(result.isValid).toBe(false)
      expect(result.message).toBe('Maximum length is 5 characters / 最大长度为5个字符')
    })

    it('should validate strings with exact maximum length', () => {
      const validator = maxLength(5)
      const result = validator('hello')
      expect(result.isValid).toBe(true)
    })
  })

  describe('min', () => {
    it('should validate numbers above minimum', () => {
      const validator = min(5)
      const result = validator(10)
      expect(result.isValid).toBe(true)
      expect(result.message).toBeUndefined()
    })

    it('should invalidate numbers below minimum', () => {
      const validator = min(5)
      const result = validator(3)
      expect(result.isValid).toBe(false)
      expect(result.message).toBe('Minimum value is 5 / 最小值为5')
    })

    it('should validate numbers at exact minimum', () => {
      const validator = min(5)
      const result = validator(5)
      expect(result.isValid).toBe(true)
    })
  })

  describe('max', () => {
    it('should validate numbers below maximum', () => {
      const validator = max(10)
      const result = validator(5)
      expect(result.isValid).toBe(true)
      expect(result.message).toBeUndefined()
    })

    it('should invalidate numbers above maximum', () => {
      const validator = max(10)
      const result = validator(15)
      expect(result.isValid).toBe(false)
      expect(result.message).toBe('Maximum value is 10 / 最大值为10')
    })

    it('should validate numbers at exact maximum', () => {
      const validator = max(10)
      const result = validator(10)
      expect(result.isValid).toBe(true)
    })
  })

  describe('pattern', () => {
    it('should validate strings matching pattern', () => {
      const validator = pattern(/^\d{3}-\d{3}-\d{4}$/, 'Invalid phone format')
      const result = validator('123-456-7890')
      expect(result.isValid).toBe(true)
      expect(result.message).toBeUndefined()
    })

    it('should invalidate strings not matching pattern', () => {
      const validator = pattern(/^\d{3}-\d{3}-\d{4}$/, 'Invalid phone format')
      const result = validator('1234567890')
      expect(result.isValid).toBe(false)
      expect(result.message).toBe('Invalid phone format')
    })

    it('should use default message when none provided', () => {
      const validator = pattern(/^\d+$/)
      const result = validator('abc')
      expect(result.isValid).toBe(false)
      expect(result.message).toBe('Invalid format / 格式无效')
    })
  })

  describe('isLetterOrDigit', () => {
    it('should validate letters and digits', () => {
      const validChars = ['a', 'Z', '5', 'M', '0', '9']

      validChars.forEach((char) => {
        const result = isLetterOrDigit(char)
        expect(result.isValid).toBe(true)
        expect(result.message).toBeUndefined()
      })
    })

    it('should invalidate non-alphanumeric characters', () => {
      const invalidChars = ['@', '#', '$', '%', '!', ' ', '.', '-']

      invalidChars.forEach((char) => {
        const result = isLetterOrDigit(char)
        expect(result.isValid).toBe(false)
        expect(result.message).toBe('Character must be a letter or digit / 字符必须是字母或数字')
      })
    })

    it('should invalidate multi-character strings', () => {
      const result = isLetterOrDigit('abc')
      expect(result.isValid).toBe(false)
      expect(result.message).toBe('Input must be a single character / 输入必须是单个字符')
    })

    it('should invalidate empty string', () => {
      const result = isLetterOrDigit('')
      expect(result.isValid).toBe(false)
      expect(result.message).toBe('Input must be a single character / 输入必须是单个字符')
    })
  })

  describe('chineseIdCard', () => {
    it('should validate correct Chinese ID cards', () => {
      const validIds = ['11010519491231002X', '110105194912310021', '32050419881028001X']

      validIds.forEach((id) => {
        const result = chineseIdCard(id)
        expect(result.isValid).toBe(true)
        expect(result.message).toBeUndefined()
      })
    })

    it('should invalidate incorrect Chinese ID cards', () => {
      const invalidIds = ['123456789012345678', '01010519491231002X', '110105194912310', 'invalid-id']

      invalidIds.forEach((id) => {
        const result = chineseIdCard(id)
        expect(result.isValid).toBe(false)
        expect(result.message).toBe('Invalid Chinese ID card / 身份证号格式无效')
      })
    })
  })

  describe('chineseMobile', () => {
    it('should validate correct Chinese mobile numbers', () => {
      const validMobiles = ['13812345678', '15987654321', '18765432109', '19123456789']

      validMobiles.forEach((mobile) => {
        const result = chineseMobile(mobile)
        expect(result.isValid).toBe(true)
        expect(result.message).toBeUndefined()
      })
    })

    it('should invalidate incorrect Chinese mobile numbers', () => {
      const invalidMobiles = ['12345678901', '1381234567', '138123456789', '0381234567', 'invalid-mobile']

      invalidMobiles.forEach((mobile) => {
        const result = chineseMobile(mobile)
        expect(result.isValid).toBe(false)
        expect(result.message).toBe('Invalid Chinese mobile number / 手机号格式无效')
      })
    })
  })

  describe('chineseName', () => {
    it('should validate valid Chinese names', () => {
      ;['张三', '欧阳娜娜', '李小龙'].forEach((name) => {
        expect(chineseName(name).isValid).toBe(true)
      })
    })

    it('should invalidate invalid Chinese names', () => {
      ;['A三', '张', '张三李四王', '张 三'].forEach((name) => {
        expect(chineseName(name).isValid).toBe(false)
        expect(chineseName(name).message).toBe('Invalid Chinese name / 中文姓名格式无效')
      })
    })
  })

  describe('creditCard', () => {
    it('should validate cards that pass the Luhn check', () => {
      expect(creditCard('4111111111111111').isValid).toBe(true)
      expect(creditCard('4012-8888-8888-1881').isValid).toBe(true)
    })

    it('should invalidate malformed or failed cards', () => {
      expect(creditCard('4111111111111112').isValid).toBe(false)
      expect(creditCard('abcd').isValid).toBe(false)
    })
  })

  describe('ipv4', () => {
    it('should validate valid ipv4 addresses', () => {
      ;['192.168.1.1', '0.0.0.0', '255.255.255.255'].forEach((value) => {
        expect(ipv4(value).isValid).toBe(true)
      })
    })

    it('should invalidate invalid ipv4 addresses', () => {
      ;['256.1.1.1', '192.168.1', '192.168.01.1', 'a.b.c.d'].forEach((value) => {
        expect(ipv4(value).isValid).toBe(false)
      })
    })
  })

  describe('alphanumeric', () => {
    it('should validate alphanumeric strings', () => {
      expect(alphanumeric('abc123').isValid).toBe(true)
    })

    it('should invalidate non-alphanumeric strings', () => {
      expect(alphanumeric('abc-123').isValid).toBe(false)
    })
  })

  describe('numeric', () => {
    it('should validate numeric strings', () => {
      expect(numeric('12345').isValid).toBe(true)
    })

    it('should invalidate non-numeric strings', () => {
      expect(numeric('12a45').isValid).toBe(false)
    })
  })

  describe('integer', () => {
    it('should validate integer strings', () => {
      expect(integer('-42').isValid).toBe(true)
      expect(integer('0').isValid).toBe(true)
    })

    it('should invalidate decimals and text', () => {
      expect(integer('3.14').isValid).toBe(false)
      expect(integer('abc').isValid).toBe(false)
    })
  })

  describe('strongPassword', () => {
    it('should validate strong passwords', () => {
      expect(strongPassword('Abc@1234').isValid).toBe(true)
    })

    it('should invalidate weak passwords', () => {
      expect(strongPassword('abcdefg').isValid).toBe(false)
      expect(strongPassword('ABCDEFG1').isValid).toBe(false)
    })
  })

  describe('hexColor', () => {
    it('should validate short and long hex colors', () => {
      expect(hexColor('#fff').isValid).toBe(true)
      expect(hexColor('#ff0000').isValid).toBe(true)
    })

    it('should invalidate malformed hex colors', () => {
      expect(hexColor('ff0000').isValid).toBe(false)
      expect(hexColor('#ffff').isValid).toBe(false)
    })
  })

  describe('uuid', () => {
    it('should validate standard uuids', () => {
      expect(uuid('550e8400-e29b-41d4-a716-446655440000').isValid).toBe(true)
    })

    it('should invalidate malformed uuids', () => {
      expect(uuid('not-a-uuid').isValid).toBe(false)
    })
  })

  describe('slug', () => {
    it('should validate standard slugs', () => {
      expect(slug('hello-world').isValid).toBe(true)
      expect(slug('abc123').isValid).toBe(true)
    })

    it('should invalidate malformed slugs', () => {
      expect(slug('Hello World').isValid).toBe(false)
      expect(slug('-hello').isValid).toBe(false)
    })
  })

  describe('between', () => {
    it('should validate values inside the range', () => {
      const validator = between(1, 10)
      expect(validator(5).isValid).toBe(true)
      expect(validator(1).isValid).toBe(true)
      expect(validator(10).isValid).toBe(true)
    })

    it('should invalidate values outside the range', () => {
      const validator = between(1, 10)
      expect(validator(0).isValid).toBe(false)
      expect(validator(11).isValid).toBe(false)
    })
  })

  describe('in', () => {
    it('should validate values inside the allowed list', () => {
      const validator = inValidator(['admin', 'editor'] as const)
      expect(validator('admin').isValid).toBe(true)
    })

    it('should invalidate values outside the allowed list', () => {
      const validator = inValidator(['admin', 'editor'] as const)
      expect(validator('guest' as 'admin').isValid).toBe(false)
    })
  })

  describe('notIn', () => {
    it('should validate values outside the blocked list', () => {
      const validator = notIn(['admin', 'editor'] as const)
      expect(validator('guest' as 'admin').isValid).toBe(true)
    })

    it('should invalidate values inside the blocked list', () => {
      const validator = notIn(['admin', 'editor'] as const)
      expect(validator('admin').isValid).toBe(false)
    })
  })

  describe('custom', () => {
    it('should validate values using a custom predicate', () => {
      const validator = custom<number>((value) => value > 0, '必须大于0')
      expect(validator(1)).toEqual({ isValid: true, message: undefined })
      expect(validator(0)).toEqual({ isValid: false, message: '必须大于0' })
    })
  })
})
