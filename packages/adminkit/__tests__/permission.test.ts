import { getPermissionAction, hasPermissions, parsePermissionCode } from '../src';

describe('adminkit/permission', () => {
  it('parses permission code', () => {
    expect(parsePermissionCode('system:user:create')).toEqual({
      domain: 'system',
      resource: 'user',
      action: 'create',
    });
  });

  it('handles empty code', () => {
    expect(parsePermissionCode('')).toEqual({ domain: '', resource: '', action: '' });
    expect(parsePermissionCode(null)).toEqual({ domain: '', resource: '', action: '' });
  });

  it('extracts action', () => {
    expect(getPermissionAction('system:user:create')).toBe('create');
  });

  describe('hasPermissions', () => {
    it('returns true when no permissions required', () => {
      expect(hasPermissions([], [])).toBe(true);
      expect(hasPermissions(undefined, [])).toBe(true);
    });

    it('returns false when user has no permissions', () => {
      expect(hasPermissions([], ['system:user:create'])).toBe(false);
    });

    it('matches wildcard', () => {
      expect(hasPermissions(['*:*:*'], ['system:user:create'])).toBe(true);
    });

    it('supports every and some modes', () => {
      const userPerms = ['a:b:c', 'a:b:d'];
      expect(hasPermissions(userPerms, ['a:b:c', 'a:b:d'])).toBe(true);
      expect(hasPermissions(userPerms, ['a:b:c', 'a:b:x'])).toBe(false);
      expect(hasPermissions(userPerms, ['a:b:c', 'a:b:x'], { matchMode: 'some' })).toBe(true);
    });
  });
});
