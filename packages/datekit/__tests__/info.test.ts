import { daysInMonth, quarter, weekOfYear, dayOfYear } from '../src/info';

describe('daysInMonth', () => {
  it('February non-leap', () => expect(daysInMonth(new Date(2023, 1, 1))).toBe(28));
  it('February leap', () => expect(daysInMonth(new Date(2024, 1, 1))).toBe(29));
  it('May has 31 days', () => expect(daysInMonth(new Date(2026, 4, 1))).toBe(31));
  it('April has 30 days', () => expect(daysInMonth(new Date(2026, 3, 1))).toBe(30));
});

describe('quarter', () => {
  it('January → Q1', () => expect(quarter(new Date(2026, 0, 1))).toBe(1));
  it('April → Q2', () => expect(quarter(new Date(2026, 3, 1))).toBe(2));
  it('July → Q3', () => expect(quarter(new Date(2026, 6, 1))).toBe(3));
  it('October → Q4', () => expect(quarter(new Date(2026, 9, 1))).toBe(4));
  it('May → Q2', () => expect(quarter(new Date(2026, 4, 8))).toBe(2));
});

describe('weekOfYear', () => {
  it('first week of 2026', () =>
    expect(weekOfYear(new Date(2026, 0, 1))).toBeGreaterThanOrEqual(1));
  it('week 19 in May', () => {
    // 2026-05-08 is week 19
    expect(weekOfYear(new Date(2026, 4, 8))).toBe(19);
  });
  it('last week of year', () =>
    expect(weekOfYear(new Date(2026, 11, 28))).toBeGreaterThanOrEqual(52));
});

describe('dayOfYear', () => {
  it('Jan 1 → 1', () => expect(dayOfYear(new Date(2026, 0, 1))).toBe(1));
  it('Dec 31 non-leap → 365', () => expect(dayOfYear(new Date(2023, 11, 31))).toBe(365));
  it('Dec 31 leap → 366', () => expect(dayOfYear(new Date(2024, 11, 31))).toBe(366));
  it('May 8 2026 → 128', () => expect(dayOfYear(new Date(2026, 4, 8))).toBe(128));
  it('uses calendar days instead of local elapsed hours', () => {
    const realDate = global.Date;
    const originalUTC = Date.UTC;
    const mockedUTC = jest.fn(originalUTC);

    class MockDate extends realDate {
      constructor(...args: ConstructorParameters<typeof Date>) {
        super(...args);
      }

      override getTime(): number {
        if (this.getFullYear() === 2024 && this.getMonth() === 2 && this.getDate() === 11) {
          return originalUTC(2024, 2, 11) - 3600000;
        }
        return super.getTime();
      }

      static override UTC(...args: Parameters<typeof Date.UTC>): number {
        return mockedUTC(...args);
      }
    }

    global.Date = MockDate as DateConstructor;
    try {
      expect(dayOfYear(new Date(2024, 2, 11))).toBe(71);
      expect(mockedUTC).toHaveBeenCalled();
    } finally {
      global.Date = realDate;
    }
  });
});
