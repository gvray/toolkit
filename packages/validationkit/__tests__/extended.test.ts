import { base64, cross, custom, ipv6, json, semver, toAsyncValidator, validateAsync, when } from '../src'

describe('validationkit extended', () => {
  it('extra validators', () => {
    expect(ipv6('::1').isValid).toBe(true)
    expect(semver('1.2.3').isValid).toBe(true)
    expect(base64('SGVsbG8=').isValid).toBe(true)
    expect(json('{"a":1}').isValid).toBe(true)
  })

  it('when and cross', () => {
    const rule = when('type', 'admin', [custom((v) => (v as { name: string }).name.length > 0)])
    expect(rule({ type: 'admin', name: 'x' }).isValid).toBe(true)
    const crossRule = cross(['password', 'confirm'], (v) => v.password === v.confirm)
    expect(crossRule({ password: '1', confirm: '1' }).isValid).toBe(true)
  })

  it('validateAsync', async () => {
    const result = await validateAsync('ok', toAsyncValidator(custom((v) => v === 'ok')))
    expect(result.isValid).toBe(true)
  })
})
