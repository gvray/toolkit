/**
 * Tests added to boost statement coverage to 96%+.
 */
import addQueryParam from '../src/addQueryParam';
import buildUrl from '../src/buildUrl';
import dirname from '../src/dirname';
import format from '../src/format';
import fromFileUrl from '../src/fromFileUrl';
import getQueryParam from '../src/getQueryParam';
import isSameOrigin from '../src/isSameOrigin';
import { join } from '../src';
import nameWithoutExt from '../src/nameWithoutExt';
import parseUrl from '../src/parseUrl';
import queryString from '../src/queryString';
import queryStringParse from '../src/queryStringParse';
import removeQueryParam from '../src/removeQueryParam';
import replaceQueryParam from '../src/replaceQueryParam';
import resolve from '../src/resolve';
import toFileUrl from '../src/toFileUrl';

// ─── addQueryParam – TypeError branch (line 17) ───────────────────────────────
describe('addQueryParam – TypeError', () => {
  it('throws TypeError for non-string arguments', () => {
    expect(() => addQueryParam(123 as any, 'key', 'val')).toThrow(TypeError);
    expect(() => addQueryParam('https://example.com', 123 as any, 'val')).toThrow(TypeError);
    expect(() => addQueryParam('https://example.com', 'key', 123 as any)).toThrow(TypeError);
  });
});

// ─── buildUrl – TypeError branch (line 19) ────────────────────────────────────
describe('buildUrl – TypeError', () => {
  it('throws TypeError for non-string base/path', () => {
    expect(() => buildUrl(123 as any, '/users')).toThrow(TypeError);
    expect(() => buildUrl('https://api.com', 123 as any)).toThrow(TypeError);
  });

  it('builds URL without query (empty query object)', () => {
    expect(buildUrl('https://api.com', '/users')).toBe('https://api.com/users');
  });
});

// ─── dirname – line 43 (path === '/' after normalizing) ───────────────────────
describe('dirname – root path edge case', () => {
  it('returns "/" for a path that reduces to just a slash', () => {
    // '/' after normalization hits line 43
    expect(dirname('/')).toBe('/');
  });
});

// ─── format – lines 42 and 52 ─────────────────────────────────────────────────
describe('format – remaining branches', () => {
  it('returns root alone when no base/name/ext provided (line 42)', () => {
    expect(format({ root: '/' })).toBe('/');
  });

  it('returns base alone when no dir or root provided (line 52)', () => {
    expect(format({ base: 'file.txt' })).toBe('file.txt');
  });
});

// ─── fromFileUrl – lines 29 and 41 ────────────────────────────────────────────
describe('fromFileUrl – extra branches', () => {
  it('returns "/" for empty path after prefix removal (line 29)', () => {
    // 'file://' followed by nothing → path is ''
    // The current implementation requires at least 'file:///' to reach line 29
    // 'file:///' → path = '/' which is truthy; we need path = ''
    // The only way is 'file://' with nothing after, but that fails the startsWith check
    // Instead test 'file:///' which gives path='/' not '' — already covered.
    // Line 29 is hit when path.slice(7) === '', i.e. url === 'file://'
    // But 'file://' starts with 'file://' so passes the check, slice(7)=''
    // fromFileUrl('file://') → path = '' → return '/'
    expect(fromFileUrl('file://')).toBe('/');
  });

  it('throws "Invalid URL encoding" for invalid percent-encoding (line 41)', () => {
    // decodeURIComponent throws for malformed sequences like %80
    expect(() => fromFileUrl('file:///%80invalid')).toThrow('Invalid URL encoding');
  });
});

// ─── getQueryParam – TypeError branch (line 16) ───────────────────────────────
describe('getQueryParam – TypeError', () => {
  it('throws TypeError for non-string arguments', () => {
    expect(() => getQueryParam(123 as any, 'key')).toThrow(TypeError);
    expect(() => getQueryParam('https://example.com', 123 as any)).toThrow(TypeError);
  });
});

// ─── isSameOrigin – TypeError branch (line 16) ────────────────────────────────
describe('isSameOrigin – TypeError', () => {
  it('throws TypeError for non-string arguments', () => {
    expect(() => isSameOrigin(123 as any, 'https://a.com')).toThrow(TypeError);
    expect(() => isSameOrigin('https://a.com', 123 as any)).toThrow(TypeError);
  });
});

// ─── join – line 71 (empty result from absolute path) ─────────────────────────
describe('join – absolute path resolving to empty result', () => {
  it('returns "/" when joined absolute segments collapse to empty', () => {
    // join('/') → strips trailing slash, result = '' → isAbsolute → return '/'
    expect(join('/')).toBe('/');
  });
});

// ─── nameWithoutExt – TypeError branch (line 18) ──────────────────────────────
describe('nameWithoutExt – TypeError', () => {
  it('throws TypeError for non-string input', () => {
    expect(() => nameWithoutExt(123 as any)).toThrow(TypeError);
    expect(() => nameWithoutExt(null as any)).toThrow(TypeError);
  });
});

// ─── parseUrl – TypeError and catch branches (lines 26, 58) ───────────────────
describe('parseUrl – extra branches', () => {
  it('throws TypeError for non-string input (line 26)', () => {
    expect(() => parseUrl(123 as any)).toThrow(TypeError);
    expect(() => parseUrl(null as any)).toThrow(TypeError);
  });

  it('throws Error for truly invalid URL strings (line 58)', () => {
    // A value that is not caught by the early guard but fails URL construction
    expect(() => parseUrl('://invalid')).toThrow(Error);
  });
});

// ─── queryString – TypeError branch (line 16) ─────────────────────────────────
describe('queryString – TypeError', () => {
  it('throws TypeError when separator is not a string', () => {
    expect(() => queryString({ a: '1' }, 123 as any)).toThrow(TypeError);
  });
});

// ─── queryStringParse – TypeError and empty pair (lines 15, 26) ───────────────
describe('queryStringParse – extra branches', () => {
  it('throws TypeError for non-string input (line 15)', () => {
    expect(() => queryStringParse(123 as any)).toThrow(TypeError);
    expect(() => queryStringParse(null as any)).toThrow(TypeError);
  });

  it('handles empty pair segments (line 26)', () => {
    // A query string with consecutive & creates empty pair segments
    expect(queryStringParse('a=1&&b=2')).toEqual({ a: '1', b: '2' });
    expect(queryStringParse('&&')).toEqual({});
  });
});

// ─── removeQueryParam – TypeError branch (line 16) ────────────────────────────
describe('removeQueryParam – TypeError', () => {
  it('throws TypeError for non-string arguments', () => {
    expect(() => removeQueryParam(123 as any, 'key')).toThrow(TypeError);
    expect(() => removeQueryParam('https://example.com', 123 as any)).toThrow(TypeError);
  });
});

// ─── replaceQueryParam – TypeError branch (line 17) ───────────────────────────
describe('replaceQueryParam – TypeError', () => {
  it('throws TypeError for non-string arguments', () => {
    expect(() => replaceQueryParam(123 as any, 'key', 'val')).toThrow(TypeError);
    expect(() => replaceQueryParam('https://example.com', 123 as any, 'val')).toThrow(TypeError);
    expect(() => replaceQueryParam('https://example.com', 'key', 123 as any)).toThrow(TypeError);
  });
});

// ─── resolve – lines 22, 74-75, 96 ────────────────────────────────────────────
describe('resolve – extra branches', () => {
  it('returns process.cwd() when called with no arguments (line 22)', () => {
    expect(resolve()).toBe(process.cwd());
  });

  it('returns "/" when absolute path segments cancel out (line 96, isAbsolute branch)', () => {
    // '/foo/..' → normalizedSegments = [] → result = '' → return '/'
    expect(resolve('/foo/..')).toBe('/');
  });
});

// ─── toFileUrl – line 31 (normalized path === '.') ────────────────────────────
describe('toFileUrl – normalized to dot', () => {
  it('returns "file:///" when normalize returns "." (line 31)', () => {
    // A relative path like '.' normalizes to '.'
    expect(toFileUrl('.')).toBe('file:///');
  });
});
