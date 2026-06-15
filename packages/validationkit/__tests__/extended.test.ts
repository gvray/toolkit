import { base64, ipv6, json, semver } from '../src';

describe('validationkit extended validators', () => {
  it('ipv6', () => {
    expect(ipv6('::1').isValid).toBe(true);
    expect(ipv6('not-an-ip').isValid).toBe(false);
  });

  it('semver', () => {
    expect(semver('1.2.3').isValid).toBe(true);
    expect(semver('1.2').isValid).toBe(false);
  });

  it('base64', () => {
    expect(base64('SGVsbG8=').isValid).toBe(true);
    expect(base64('not base64!!').isValid).toBe(false);
  });

  it('json', () => {
    expect(json('{"a":1}').isValid).toBe(true);
    expect(json('{bad}').isValid).toBe(false);
  });
});
