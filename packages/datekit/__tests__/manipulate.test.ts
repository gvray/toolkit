import { add, clone, clamp, endOf, set, startOf, subtract } from '../src/manipulate';

describe('clone', () => {
  it('returns a new instance with same time', () => {
    const d = new Date(2026, 4, 8, 12, 30, 0, 0);
    const c = clone(d);
    expect(c).not.toBe(d);
    expect(c.getTime()).toBe(d.getTime());
  });
});

describe('startOf / endOf', () => {
  it('startOf day zeros local time', () => {
    const d = new Date(2026, 4, 8, 15, 30, 45, 123);
    const s = startOf(d, 'day');
    expect(s.getFullYear()).toBe(2026);
    expect(s.getMonth()).toBe(4);
    expect(s.getDate()).toBe(8);
    expect(s.getHours()).toBe(0);
    expect(s.getMinutes()).toBe(0);
    expect(s.getSeconds()).toBe(0);
    expect(s.getMilliseconds()).toBe(0);
  });

  it('endOf day is last ms of local day', () => {
    const e = endOf(new Date(2026, 4, 8), 'day');
    expect(e.getDate()).toBe(8);
    expect(e.getHours()).toBe(23);
    expect(e.getMinutes()).toBe(59);
    expect(e.getSeconds()).toBe(59);
    expect(e.getMilliseconds()).toBe(999);
  });

  it('startOf month is first day 00:00', () => {
    const s = startOf(new Date(2026, 4, 15, 22, 0, 0), 'month');
    expect(s.getMonth()).toBe(4);
    expect(s.getDate()).toBe(1);
    expect(s.getHours()).toBe(0);
  });

  it('endOf month is last day 23:59:59.999', () => {
    const e = endOf(new Date(2026, 4, 8), 'month');
    expect(e.getDate()).toBe(31);
    expect(e.getMilliseconds()).toBe(999);
  });

  it('startOf year', () => {
    const s = startOf(new Date(2026, 6, 4), 'year');
    expect(s.getMonth()).toBe(0);
    expect(s.getDate()).toBe(1);
  });

  it('endOf year', () => {
    const e = endOf(new Date(2026, 6, 4), 'year');
    expect(e.getMonth()).toBe(11);
    expect(e.getDate()).toBe(31);
  });

  it('startOf quarter Q2 from May', () => {
    const s = startOf(new Date(2026, 4, 8), 'quarter');
    expect(s.getMonth()).toBe(3);
    expect(s.getDate()).toBe(1);
  });

  it('endOf quarter Q1 from March', () => {
    const e = endOf(new Date(2026, 2, 10), 'quarter');
    expect(e.getMonth()).toBe(2);
    expect(e.getDate()).toBe(31);
  });

  it('week range is Monday–Sunday', () => {
    const wed = new Date(2026, 4, 6);
    const ws = startOf(wed, 'week');
    expect(ws.getDay()).toBe(1);
    const we = endOf(wed, 'week');
    expect(we.getDay()).toBe(0);
    expect(we.getHours()).toBe(23);
  });
});

describe('set', () => {
  it('sets hour on a copy', () => {
    const d = new Date(2026, 4, 8, 10, 30, 0);
    const n = set(d, 'hour', 9);
    expect(d.getHours()).toBe(10);
    expect(n.getHours()).toBe(9);
  });

  it('sets year, month, date, minute, second, millisecond', () => {
    const d = new Date(2026, 4, 8, 10, 30, 45, 100);
    expect(set(d, 'year', 2025).getFullYear()).toBe(2025);
    expect(set(d, 'month', 0).getMonth()).toBe(0);
    expect(set(d, 'date', 15).getDate()).toBe(15);
    expect(set(d, 'minute', 0).getMinutes()).toBe(0);
    expect(set(d, 'second', 0).getSeconds()).toBe(0);
    expect(set(d, 'millisecond', 0).getMilliseconds()).toBe(0);
  });
});

describe('add / subtract', () => {
  it('add days', () => {
    expect(add(new Date(2026, 4, 8), 3, 'days').getDate()).toBe(11);
  });

  it('covers all add units', () => {
    const base = new Date(2026, 0, 1, 12, 30, 45, 500);
    expect(add(base, 1, 'years').getFullYear()).toBe(2027);
    expect(add(base, 1, 'months').getMonth()).toBe(1);
    expect(add(base, 2, 'hours').getHours()).toBe(14);
    expect(add(base, 5, 'minutes').getMinutes()).toBe(35);
    expect(add(base, 10, 'seconds').getSeconds()).toBe(55);
    expect(add(base, 100, 'milliseconds').getMilliseconds()).toBe(600);
  });

  it('subtract', () => {
    expect(subtract(new Date(2026, 4, 8), 1, 'days').getDate()).toBe(7);
  });
});

describe('clamp', () => {
  const min = new Date(2026, 0, 1);
  const max = new Date(2026, 11, 31);

  it('within range → returns clone of input', () => {
    const d = new Date(2026, 4, 8);
    const r = clamp(d, min, max);
    expect(r).not.toBe(d);
    expect(r.getTime()).toBe(d.getTime());
  });

  it('before min → returns clone of min', () => {
    const r = clamp(new Date(2025, 11, 31), min, max);
    expect(r.getTime()).toBe(min.getTime());
  });

  it('after max → returns clone of max', () => {
    const r = clamp(new Date(2027, 0, 1), min, max);
    expect(r.getTime()).toBe(max.getTime());
  });

  it('exactly at min / max (inclusive)', () => {
    expect(clamp(min, min, max).getTime()).toBe(min.getTime());
    expect(clamp(max, min, max).getTime()).toBe(max.getTime());
  });
});
