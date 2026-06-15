import { timeAgo, timeTo, humanizeDuration } from '../src/relative';

describe('timeAgo', () => {
  const now = Date.now();

  it('just now (< 60s)', () => {
    expect(timeAgo(new Date(now - 30000))).toBe('刚刚');
    expect(timeAgo(new Date(now - 30000), { locale: 'en-US' })).toBe('just now');
  });

  it('minutes ago', () => {
    expect(timeAgo(new Date(now - 120000), { locale: 'en-US' })).toBe('2 minutes ago');
    expect(timeAgo(new Date(now - 120000), { locale: 'zh-CN' })).toBe('2分钟前');
  });

  it('hours ago', () => {
    expect(timeAgo(new Date(now - 3600000 * 2), { locale: 'en-US' })).toBe('2 hours ago');
  });

  it('days ago', () => {
    expect(timeAgo(new Date(now - 86400000 * 3), { locale: 'en-US' })).toBe('3 days ago');
  });

  it('months ago', () => {
    expect(timeAgo(new Date(now - 2629800000 * 4), { locale: 'en-US' })).toBe('4 months ago');
  });

  it('years ago', () => {
    expect(timeAgo(new Date(now - 31536000000 * 2), { locale: 'en-US' })).toBe('2 years ago');
  });

  it('custom now', () => {
    const anchor = new Date(2026, 4, 8, 12, 0, 0);
    const past = new Date(2026, 4, 8, 11, 59, 30); // 30s ago < 60s threshold
    expect(timeAgo(past, { now: anchor, locale: 'en-US' })).toBe('just now');
  });

  it('59.5s ago: diffSec rounds to -59 → just now (< 60 threshold)', () => {
    const anchor = new Date(2026, 4, 8, 12, 0, 0, 0);
    const past = new Date(anchor.getTime() - 59500); // diffSec = round(-59.5) = -59
    expect(timeAgo(past, { now: anchor, locale: 'en-US' })).toBe('just now');
  });
});

describe('timeTo', () => {
  const now = Date.now();

  it('just now (< 60s into future)', () => {
    expect(timeTo(new Date(now + 30000))).toBe('刚刚');
    expect(timeTo(new Date(now + 30000), { locale: 'en-US' })).toBe('just now');
  });

  it('in 2 minutes', () => {
    expect(timeTo(new Date(now + 120000), { locale: 'en-US' })).toBe('in 2 minutes');
  });

  it('in 3 days', () => {
    expect(timeTo(new Date(now + 86400000 * 3), { locale: 'en-US' })).toBe('in 3 days');
  });

  it('in 2 hours zh-CN', () => {
    expect(timeTo(new Date(now + 3600000 * 2), { locale: 'zh-CN' })).toBe('2小时后');
  });

  it('59.5s future: diffSec rounds to 60 but < minute threshold → just now fallback', () => {
    const anchor = new Date(2026, 4, 8, 12, 0, 0, 0);
    const future = new Date(anchor.getTime() + 59500); // diffSec = round(59.5) = 60; diffMs < 60000
    expect(timeTo(future, { now: anchor, locale: 'en-US' })).toBe('just now');
    expect(timeTo(future, { now: anchor, locale: 'zh-CN' })).toBe('刚刚');
  });
});

describe('humanizeDuration', () => {
  it('zero → 0秒', () => {
    expect(humanizeDuration(0)).toBe('0秒');
    expect(humanizeDuration(0, { locale: 'en-US' })).toBe('0 seconds');
  });

  it('1.5 hours zh', () => {
    expect(humanizeDuration(5400000)).toBe('1小时30分钟');
  });

  it('1.5 hours en', () => {
    expect(humanizeDuration(5400000, { locale: 'en-US' })).toBe('1 hour 30 minutes');
  });

  it('1 hour exactly', () => {
    expect(humanizeDuration(3600000, { locale: 'en-US' })).toBe('1 hour');
  });

  it('largest=1 shows only biggest unit', () => {
    expect(humanizeDuration(5400000, { largest: 1 })).toBe('1小时');
  });

  it('largest=3 shows 3 units', () => {
    expect(humanizeDuration(90061000, { largest: 3 })).toBe('1天1小时1分钟');
  });

  it('45 seconds en', () => {
    expect(humanizeDuration(45000, { locale: 'en-US' })).toBe('45 seconds');
  });

  it('negative ms uses absolute value', () => {
    expect(humanizeDuration(-5400000)).toBe('1小时30分钟');
  });
});
