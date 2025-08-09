import listToTree from '../src/listToTree'

describe('listToTree', () => {
  test('should convert flat list to tree structure', () => {
    const arr = [
      { id: 1, label: 'a1', pid: null },
      { id: 2, label: 'b1', pid: 1 },
      { id: 3, label: 'b2', pid: 1 }
    ]
    const expectedTree = [
      {
        children: [
          { children: [], id: 2, label: 'b1', pid: 1 },
          { children: [], id: 3, label: 'b2', pid: 1 }
        ],
        id: 1,
        label: 'a1',
        pid: null
      }
    ]
    const result = listToTree(arr, { parentKey: 'pid' })
    expect(result).toEqual(expectedTree)
  })

  test('should work with custom keys', () => {
    const arr = [
      { key: 1, name: 'a1', parent: null },
      { key: 2, name: 'b1', parent: 1 },
      { key: 3, name: 'b2', parent: 1 }
    ]
    const expectedTree = [
      {
        subItems: [
          { subItems: [], key: 2, name: 'b1', parent: 1 },
          { subItems: [], key: 3, name: 'b2', parent: 1 }
        ],
        key: 1,
        name: 'a1',
        parent: null
      }
    ]
    const result = listToTree(arr, {
      idKey: 'key',
      parentKey: 'parent',
      childrenKey: 'subItems'
    })
    expect(result).toEqual(expectedTree)
  })

  test('should remove empty children when keepEmptyChildren is false', () => {
    const arr = [
      { id: 1, name: 'a1', parentId: null },
      { id: 2, name: 'b1', parentId: 1 },
      { id: 3, name: 'b2', parentId: 1 }
    ]
    const result = listToTree(arr, { keepEmptyChildren: false })
    // 有子节点的节点应该保留children属性
    expect((result[0] as any).children).toBeDefined()
    expect((result[0] as any).children).toHaveLength(2)
    // 没有子节点的节点不应该有children属性
    expect((result[0] as any).children[0].children).toBeUndefined()
    expect((result[0] as any).children[1].children).toBeUndefined()
    expect(result[0].id).toBe(1)
  })

  test('should transform nodes when transformNode is provided', () => {
    const arr = [
      { id: 1, name: 'a1', parentId: null },
      { id: 2, name: 'b1', parentId: 1 }
    ]
    const result = listToTree(arr, {
      transformNode: (node) => ({
        ...node,
        label: node.name,
        value: node.id
      })
    })
    expect((result[0] as any).label).toBe('a1')
    expect((result[0] as any).value).toBe(1)
    expect((result[0] as any).children?.[0].label).toBe('b1')
    expect((result[0] as any).children?.[0].value).toBe(2)
  })

  test('should handle empty array', () => {
    const result = listToTree([])
    expect(result).toEqual([])
  })

  test('should handle single item without parent', () => {
    const arr = [{ id: 1, name: 'a1', parentId: null }]
    const result = listToTree(arr)
    expect(result).toHaveLength(1)
    expect(result[0].id).toBe(1)
    expect((result[0] as any).children).toEqual([])
  })

  test('should handle items with string IDs', () => {
    const arr = [
      { id: '1', name: 'a1', parentId: null },
      { id: '2', name: 'b1', parentId: '1' }
    ]
    const result = listToTree(arr)
    expect(result).toHaveLength(1)
    expect(result[0].id).toBe('1')
    expect((result[0] as any).children).toHaveLength(1)
    expect((result[0] as any).children?.[0].id).toBe('2')
  })
})
