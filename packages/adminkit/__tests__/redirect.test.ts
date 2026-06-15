import {
  createLoginRedirect,
  DEFAULT_REDIRECT_DENY_LIST,
  getLoginRedirect,
  getSafeLoginRedirect,
  isSafeRedirect,
  normalizeRedirect,
  REDIRECT_QUERY_KEY,
} from '../src/redirect';

// jsdom sets location.origin to 'http://localhost'
describe('REDIRECT_QUERY_KEY', () => {
  it('is "redirect"', () => {
    expect(REDIRECT_QUERY_KEY).toBe('redirect');
  });
});

describe('createLoginRedirect', () => {
  it('appends encoded redirect param', () => {
    expect(createLoginRedirect('/login', '/system/user?id=1')).toBe(
      '/login?redirect=%2Fsystem%2Fuser%3Fid%3D1'
    );
  });

  it('uses custom key', () => {
    expect(createLoginRedirect('/login', '/dashboard', { key: 'next' })).toBe(
      '/login?next=%2Fdashboard'
    );
  });

  it('handles plain path without query', () => {
    expect(createLoginRedirect('/login', '/dashboard')).toBe('/login?redirect=%2Fdashboard');
  });
});

describe('getLoginRedirect', () => {
  it('returns decoded redirect value', () => {
    expect(getLoginRedirect('?redirect=%2Fuser%3Fid%3D1')).toBe('/user?id=1');
  });

  it('returns null when param is absent', () => {
    expect(getLoginRedirect('?foo=bar')).toBeNull();
  });

  it('returns null for empty search', () => {
    expect(getLoginRedirect('')).toBeNull();
  });

  it('uses custom key', () => {
    expect(getLoginRedirect('?next=%2Fdashboard', { key: 'next' })).toBe('/dashboard');
  });
});

describe('normalizeRedirect', () => {
  it('strips hash', () => {
    expect(normalizeRedirect('/page#section')).toBe('/page');
  });

  it('collapses leading slashes', () => {
    expect(normalizeRedirect('///user')).toBe('/user');
  });

  it('returns / for empty string', () => {
    expect(normalizeRedirect('')).toBe('/');
  });

  it('preserves query string', () => {
    expect(normalizeRedirect('/page?foo=1')).toBe('/page?foo=1');
  });
});

describe('isSafeRedirect', () => {
  it('returns true for safe path', () => {
    expect(isSafeRedirect('/dashboard')).toBe(true);
  });

  it('returns false for null/undefined', () => {
    expect(isSafeRedirect(null)).toBe(false);
    expect(isSafeRedirect(undefined)).toBe(false);
  });

  it('returns false for external URL', () => {
    expect(isSafeRedirect('https://evil.com')).toBe(false);
  });

  it('returns false for protocol-relative URL', () => {
    expect(isSafeRedirect('//evil.com')).toBe(false);
    expect(isSafeRedirect('/\\evil.com')).toBe(false);
  });

  it('returns false for javascript: path', () => {
    expect(isSafeRedirect('/javascript:alert(1)')).toBe(false);
    expect(isSafeRedirect('/JAVASCRIPT:alert(1)')).toBe(false);
  });

  it('returns false for deny-listed paths', () => {
    for (const path of DEFAULT_REDIRECT_DENY_LIST) {
      expect(isSafeRedirect(path)).toBe(false);
    }
  });

  it('respects custom denyList', () => {
    expect(isSafeRedirect('/admin', { denyList: ['/admin'] })).toBe(false);
  });

  it('allows path with query string not in deny list', () => {
    expect(isSafeRedirect('/dashboard?tab=1')).toBe(true);
  });

  it('denies path with query string when pathname is in deny list', () => {
    expect(isSafeRedirect('/login?foo=1')).toBe(false);
  });
});

describe('getSafeLoginRedirect', () => {
  it('returns redirect when safe', () => {
    expect(getSafeLoginRedirect('?redirect=%2Fdashboard')).toBe('/dashboard');
  });

  it('returns fallback when redirect is deny-listed', () => {
    expect(getSafeLoginRedirect('?redirect=%2Flogin')).toBe('/');
  });

  it('returns fallback when no redirect param', () => {
    expect(getSafeLoginRedirect('')).toBe('/');
  });

  it('uses custom fallback', () => {
    expect(getSafeLoginRedirect('', '/home')).toBe('/home');
  });

  it('respects custom denyList', () => {
    expect(getSafeLoginRedirect('?redirect=%2Fadmin', '/', { denyList: ['/admin'] })).toBe('/');
  });

  it('uses custom redirect query key', () => {
    expect(getSafeLoginRedirect('?next=%2Fdashboard', '/', { key: 'next' })).toBe('/dashboard');
  });
});
