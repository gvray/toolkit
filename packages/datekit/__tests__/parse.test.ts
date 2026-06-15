import { parseDate, parseISO, parseUnix } from '../src/parse';

describe('parseDate', () => {
  it('string — ISO date', () => {
    const d = parseDate('2023-12-25');
    expect(d).not.toBeNull();
    expect(d!.getFullYear()).toBe(2023);
    expect(d!.getMonth()).toBe(11);
    expect(d!.getDate()).toBe(25);
  });

  it('string — with explicit format', () => {
    const d = parseDate('25/12/2023', 'DD/MM/YYYY');
    expect(d).not.toBeNull();
    expect(d!.getFullYear()).toBe(2023);
    expect(d!.getMonth()).toBe(11);
  });

  it('string — datetime with HH:mm:ss', () => {
    const d = parseDate('2023-12-25 15:30:45', 'YYYY-MM-DD HH:mm:ss');
    expect(d).not.toBeNull();
    expect(d!.getHours()).toBe(15);
    expect(d!.getMinutes()).toBe(30);
    expect(d!.getSeconds()).toBe(45);
  });

  it('string — fallback common formats', () => {
    expect(parseDate('2023/12/25')!.getFullYear()).toBe(2023);
    expect(parseDate('25-12-2023', 'DD-MM-YYYY')!.getMonth()).toBe(11);
  });

  it('string — invalid returns null', () => {
    expect(parseDate('not-a-date')).toBeNull();
    expect(parseDate('')).toBeNull();
    expect(parseDate('2024-01-01 00:60:00', 'YYYY-MM-DD HH:mm:ss')).toBeNull();
    expect(parseDate('2024-01-01 24:00:00', 'YYYY-MM-DD HH:mm:ss')).toBeNull();
  });

  it('number — milliseconds', () => {
    const ms = new Date(2023, 11, 25).getTime();
    const d = parseDate(ms);
    expect(d).not.toBeNull();
    expect(d!.getFullYear()).toBe(2023);
  });

  it('number — non-finite returns null', () => {
    expect(parseDate(NaN)).toBeNull();
    expect(parseDate(Infinity)).toBeNull();
  });

  it('Date — returns clone', () => {
    const original = new Date(2023, 11, 25);
    const cloned = parseDate(original);
    expect(cloned).not.toBe(original);
    expect(cloned!.getTime()).toBe(original.getTime());
  });

  it('Date — invalid returns null', () => {
    expect(parseDate(new Date('invalid'))).toBeNull();
  });
});

describe('parseISO', () => {
  it('ISO datetime with Z', () => {
    const d = parseISO('2023-12-25T15:30:45.123Z');
    expect(d).not.toBeNull();
    expect(d!.getUTCFullYear()).toBe(2023);
    expect(d!.getUTCMonth()).toBe(11);
  });

  it('with timezone offset', () => {
    const d = parseISO('2023-12-25T15:30:45+08:00');
    expect(d).toBeInstanceOf(Date);
  });

  it('invalid returns null', () => {
    expect(parseISO('invalid-iso')).toBeNull();
    expect(parseISO('')).toBeNull();
  });
});

describe('parseUnix', () => {
  it('seconds (default)', () => {
    const d = parseUnix(1703520645);
    expect(d!.getUTCFullYear()).toBe(2023);
  });

  it('milliseconds', () => {
    const d = parseUnix(1703520645123, 'milliseconds');
    expect(d!.getUTCMilliseconds()).toBe(123);
  });

  it('negative timestamp', () => {
    expect(parseUnix(-86400)!.getUTCFullYear()).toBe(1969);
  });

  it('NaN returns null', () => {
    expect(parseUnix(NaN)).toBeNull();
  });
});
