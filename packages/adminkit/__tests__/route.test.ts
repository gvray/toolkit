import { createRoutePattern, getParentPaths, matchRoutePath } from '../src';

describe('adminkit/route', () => {
  it('creates route pattern', () => {
    expect(createRoutePattern('/user/:id')).toBe('/user/[^/]+');
  });

  it('matches exact and param routes', () => {
    expect(matchRoutePath('/user', '/user')).toBe(true);
    expect(matchRoutePath('/user/:id', '/user/123')).toBe(true);
    expect(matchRoutePath('/user/:id', '/user/123/profile')).toBe(false);
    expect(matchRoutePath('/user', '/profile')).toBe(false);
  });

  it('generates parent paths', () => {
    expect(getParentPaths('/system/user/list')).toEqual(['/system', '/system/user']);
    expect(getParentPaths('/')).toEqual([]);
  });
});
