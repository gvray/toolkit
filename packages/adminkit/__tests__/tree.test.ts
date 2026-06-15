import {
  pruneEmptyChildren,
  withVirtualRoot,
  normalizeVirtualRoot,
  VIRTUAL_ROOT_ID,
} from '../src/tree';

describe('pruneEmptyChildren', () => {
  it('removes empty children arrays', () => {
    const tree = [{ id: 1, children: [] }];
    expect(pruneEmptyChildren(tree)).toEqual([{ id: 1 }]);
  });

  it('keeps non-empty children', () => {
    const tree = [{ id: 1, children: [{ id: 2, children: [] }] }];
    pruneEmptyChildren(tree);
    expect(tree[0].children).toHaveLength(1);
    expect((tree[0].children![0] as any).children).toBeUndefined();
  });

  it('handles nodes without children', () => {
    const tree = [{ id: 1 }, { id: 2 }];
    expect(pruneEmptyChildren(tree)).toEqual([{ id: 1 }, { id: 2 }]);
  });

  it('handles deeply nested empty children', () => {
    const tree = [{ id: 1, children: [{ id: 2, children: [{ id: 3, children: [] }] }] }];
    pruneEmptyChildren(tree);
    expect((tree[0].children![0].children![0] as any).children).toBeUndefined();
  });

  it('returns the same array reference', () => {
    const tree = [{ id: 1, children: [] }];
    expect(pruneEmptyChildren(tree)).toBe(tree);
  });

  it('handles empty input', () => {
    expect(pruneEmptyChildren([])).toEqual([]);
  });
});

describe('withVirtualRoot', () => {
  const config = {
    idField: 'id',
    idValue: VIRTUAL_ROOT_ID,
    nameField: 'name',
    nameValue: '顶级节点',
    parentIdField: 'parentId',
  };

  it('prepends a virtual root node', () => {
    const result = withVirtualRoot([{ id: '1', name: 'A', parentId: null }], config);
    expect(result[0].id).toBe(VIRTUAL_ROOT_ID);
    expect(result[0].name).toBe('顶级节点');
    expect(result[0].parentId).toBeNull();
  });

  it('remaps null parentId to virtualRootId', () => {
    const result = withVirtualRoot([{ id: '1', name: 'A', parentId: null }], config);
    expect(result[1].parentId).toBe(VIRTUAL_ROOT_ID);
  });

  it('remaps undefined parentId to virtualRootId', () => {
    const result = withVirtualRoot([{ id: '1', name: 'A', parentId: undefined }], config);
    expect(result[1].parentId).toBe(VIRTUAL_ROOT_ID);
  });

  it('leaves non-root parentId unchanged', () => {
    const result = withVirtualRoot([{ id: '2', name: 'B', parentId: '1' }], config);
    expect(result[1].parentId).toBe('1');
  });

  it('does not mutate original data', () => {
    const data = [{ id: '1', name: 'A', parentId: null }];
    withVirtualRoot(data, config);
    expect(data[0].parentId).toBeNull();
  });
});

describe('normalizeVirtualRoot', () => {
  it('converts virtualRootId back to null', () => {
    const result = normalizeVirtualRoot(
      { name: 'X', parentId: VIRTUAL_ROOT_ID },
      VIRTUAL_ROOT_ID,
      'parentId'
    );
    expect(result.parentId).toBeNull();
  });

  it('leaves non-virtual parentId unchanged', () => {
    const result = normalizeVirtualRoot(
      { name: 'X', parentId: '123' },
      VIRTUAL_ROOT_ID,
      'parentId'
    );
    expect(result.parentId).toBe('123');
  });

  it('does not mutate original values', () => {
    const values = { name: 'X', parentId: VIRTUAL_ROOT_ID };
    normalizeVirtualRoot(values, VIRTUAL_ROOT_ID, 'parentId');
    expect(values.parentId).toBe(VIRTUAL_ROOT_ID);
  });
});
