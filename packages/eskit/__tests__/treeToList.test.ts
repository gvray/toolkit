import treeToList, { TreeNode } from '../src/treeToList'

describe('treeToList', () => {
  interface Item extends TreeNode<Item> {
    id: number
    name: string
    value?: string
  }

  const createItem = (id: number, name: string, children?: Item[]): Item => {
    const item: Item = { id, name }
    if (children) {
      item.children = children
    }
    return item
  }

  test('should flatten a tree into a list (breadth-first)', () => {
    const trees: Item[] = [
      createItem(1, 'a', [
        createItem(2, 'b', [createItem(4, 'd')]),
        createItem(3, 'c', [createItem(5, 'e'), createItem(6, 'f')])
      ]),
      createItem(7, 'g')
    ]

    const result = treeToList(trees)
    expect(result).toHaveLength(7)
    expect(result[0].id).toBe(1) // 根节点
    expect(result[1].id).toBe(7) // 第二个根节点
    expect(result[2].id).toBe(2) // 第一个子节点
    expect(result[3].id).toBe(3) // 第二个子节点
    expect(result[4].id).toBe(4) // 孙子节点
    expect(result[5].id).toBe(5) // 孙子节点
    expect(result[6].id).toBe(6) // 孙子节点
  })

  test('should handle an empty trees', () => {
    const trees: Item[] = []
    const result = treeToList(trees)
    expect(result).toEqual([])
  })

  test('should handle a tree with a single node', () => {
    const trees = [createItem(1, 'a')]
    const result = treeToList(trees)
    expect(result).toHaveLength(1)
    expect(result[0].id).toBe(1)
    expect(result[0].name).toBe('a')
    expect((result[0] as any).children).toBeUndefined()
  })

  test('should work with custom children key', () => {
    const trees = [
      {
        id: 1,
        name: 'a',
        subItems: [
          { id: 2, name: 'b', subItems: [] },
          { id: 3, name: 'c', subItems: [] }
        ]
      }
    ]

    const result = treeToList(trees, { childrenKey: 'subItems' })
    expect(result).toHaveLength(3)
    expect(result[0].id).toBe(1)
    expect(result[1].id).toBe(2)
    expect(result[2].id).toBe(3)
    expect((result[0] as any).subItems).toBeUndefined()
  })

  test('should transform nodes when transformNode is provided', () => {
    const trees = [createItem(1, 'a', [createItem(2, 'b')])]

    const result = treeToList(trees, {
      transformNode: (node) => ({
        ...node,
        label: node.name,
        value: node.id.toString()
      })
    })

    expect(result).toHaveLength(2)
    expect((result[0] as any).label).toBe('a')
    expect((result[0] as any).value).toBe('1')
    expect((result[1] as any).label).toBe('b')
    expect((result[1] as any).value).toBe('2')
  })

  test('should handle nodes without children', () => {
    const trees = [createItem(1, 'a'), createItem(2, 'b'), createItem(3, 'c')]

    const result = treeToList(trees)
    expect(result).toHaveLength(3)
    expect(result[0].id).toBe(1)
    expect(result[1].id).toBe(2)
    expect(result[2].id).toBe(3)
  })

  test('should handle deep nested trees', () => {
    const trees = [createItem(1, 'a', [createItem(2, 'b', [createItem(3, 'c', [createItem(4, 'd')])])])]

    const result = treeToList(trees)
    expect(result).toHaveLength(4)
    expect(result[0].id).toBe(1)
    expect(result[1].id).toBe(2)
    expect(result[2].id).toBe(3)
    expect(result[3].id).toBe(4)
  })

  test('should handle string IDs', () => {
    const trees = [
      {
        id: '1',
        name: 'a',
        children: [{ id: '2', name: 'b', children: [] }]
      }
    ]

    const result = treeToList(trees)
    expect(result).toHaveLength(2)
    expect(result[0].id).toBe('1')
    expect(result[1].id).toBe('2')
  })
})
