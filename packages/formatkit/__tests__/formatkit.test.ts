import {
  caseInsensitiveIncludes,
  formatBitrate,
  formatCompact,
  formatCountdown,
  formatDuration,
  formatFileSize,
  formatJson,
  formatNumberCustom,
  formatOrdinal,
  formatPercentValue,
  formatUptime,
  getAvatarInitial,
  maskBankCard,
  maskCustom,
  maskEmail,
  maskIdCard,
  maskName,
  maskPhone,
  truncateText,
} from '../src';

describe('formatkit', () => {
  it('number formats', () => {
    expect(formatCompact(1200000, 'en')).toBeTruthy();
    expect(formatOrdinal(1)).toBe('1st');
    expect(formatOrdinal(2)).toBe('2nd');
    expect(formatNumberCustom(1234567, { thousands: '.', decimal: ',', precision: 0 })).toBe(
      '1.234.567'
    );
    expect(formatPercentValue(50.5)).toBe('51%');
    expect(formatPercentValue(50.5, { digits: 1 })).toBe('50.5%');
    expect(formatPercentValue(NaN)).toBe('-');
    expect(formatPercentValue(Infinity, { fallback: '∞' })).toBe('∞');
  });

  it('file and time', () => {
    expect(formatFileSize(0)).toBe('0 B');
    expect(formatFileSize(1024)).toContain('KB');
    expect(formatFileSize(1000, 2, false)).toContain('KB');
    expect(formatBitrate(1048576)).toContain('bps');
    expect(formatDuration(3661)).toContain('1h');
    expect(formatUptime(90061)).toBe('1 天 1 小时 1 分');
    expect(formatUptime(1800)).toBe('30 分');
    expect(formatCountdown(90)).toBe('00:01:30');
    expect(() => formatFileSize(-1)).toThrow();
  });

  it('text', () => {
    expect(truncateText('hello world', 8)).toBe('hello...');
    expect(truncateText('hi', 8)).toBe('hi');
    expect(() => truncateText('x', -1)).toThrow();
    expect(formatJson({ a: 1 })).toBe('{\n  "a": 1\n}');
    expect(formatJson('{"a":1}')).toBe('{\n  "a": 1\n}');
    expect(formatJson('not json')).toBe('not json');
    expect(getAvatarInitial('张三')).toBe('张');
    expect(getAvatarInitial('')).toBe('?');
    expect(caseInsensitiveIncludes('Hello World', 'ell')).toBe(true);
    expect(caseInsensitiveIncludes('Hello World', 'xyz')).toBe(false);
  });

  it('mask helpers', () => {
    expect(maskPhone('13812345678')).toBe('138****5678');
    expect(maskIdCard('110101199001011234')).toContain('****');
    expect(maskBankCard('6222021234567890')).toContain('****');
    expect(maskEmail('user@example.com')).toContain('@');
    expect(maskName('张三')).toBe('张*');
    expect(maskCustom('13812345678', 3, 7)).toContain('****');
    expect(() => maskCustom('abc', 2, 1)).toThrow();
  });
});
