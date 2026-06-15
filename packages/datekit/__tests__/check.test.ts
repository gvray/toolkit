import {
  isValid,
  isLeapYear,
  isSameDay,
  isSameWeek,
  isSameMonth,
  isSameYear,
  isToday,
  isYesterday,
  isTomorrow,
  isWeekend,
  isWeekday,
} from '../src/check';

describe('isValid', () => {
  it('valid date', () => expect(isValid(new Date('2024-01-15'))).toBe(true));
  it('invalid date', () => expect(isValid(new Date('invalid'))).toBe(false));
  it('non-date', () => expect(isValid('2024-01-15' as unknown as Date)).toBe(false));
});

describe('isLeapYear', () => {
  it('2024 is leap year', () => expect(isLeapYear(2024)).toBe(true));
  it('2023 is not', () => expect(isLeapYear(2023)).toBe(false));
  it('2000 is leap year', () => expect(isLeapYear(2000)).toBe(true));
  it('1900 is not leap year', () => expect(isLeapYear(1900)).toBe(false));
  it('accepts Date', () => expect(isLeapYear(new Date(2024, 0, 1))).toBe(true));
});

describe('isSameDay', () => {
  it('same calendar day at different times', () => {
    expect(isSameDay(new Date(2026, 4, 8, 1), new Date(2026, 4, 8, 23))).toBe(true);
  });
  it('different days', () => {
    expect(isSameDay(new Date(2026, 4, 8), new Date(2026, 4, 9))).toBe(false);
  });
});

describe('isSameWeek', () => {
  it('Mon and Sun of the same ISO week', () => {
    // 2026-05-04 (Mon) to 2026-05-10 (Sun) same week
    expect(isSameWeek(new Date(2026, 4, 4), new Date(2026, 4, 10))).toBe(true);
  });
  it('different weeks', () => {
    expect(isSameWeek(new Date(2026, 4, 4), new Date(2026, 4, 11))).toBe(false);
  });
});

describe('isSameMonth', () => {
  it('same month', () =>
    expect(isSameMonth(new Date(2026, 4, 1), new Date(2026, 4, 31))).toBe(true));
  it('different month', () =>
    expect(isSameMonth(new Date(2026, 4, 1), new Date(2026, 5, 1))).toBe(false));
});

describe('isSameYear', () => {
  it('same year', () =>
    expect(isSameYear(new Date(2026, 0, 1), new Date(2026, 11, 31))).toBe(true));
  it('different year', () =>
    expect(isSameYear(new Date(2026, 0, 1), new Date(2025, 11, 31))).toBe(false));
});

describe('isToday / isYesterday / isTomorrow', () => {
  it('today', () => {
    expect(isToday(new Date())).toBe(true);
    expect(isToday(new Date(2000, 0, 1))).toBe(false);
  });

  it('yesterday', () => {
    const y = new Date();
    y.setDate(y.getDate() - 1);
    expect(isYesterday(y)).toBe(true);
    expect(isYesterday(new Date())).toBe(false);
  });

  it('tomorrow', () => {
    const t = new Date();
    t.setDate(t.getDate() + 1);
    expect(isTomorrow(t)).toBe(true);
    expect(isTomorrow(new Date())).toBe(false);
  });
});

describe('isWeekend / isWeekday', () => {
  it('Saturday and Sunday are weekend', () => {
    expect(isWeekend(new Date(2026, 4, 9))).toBe(true); // Saturday
    expect(isWeekend(new Date(2026, 4, 10))).toBe(true); // Sunday
  });

  it('Friday is weekday', () => {
    expect(isWeekday(new Date(2026, 4, 8))).toBe(true);
    expect(isWeekend(new Date(2026, 4, 8))).toBe(false);
  });
});
