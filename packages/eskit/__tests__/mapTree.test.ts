import mapTree from '../src/mapTree'

interface TreeNode {
  id: number
  name: string
  children?: TreeNode[]
}

interface TransformedNode {
  id: number
  name: string
  level: number
  path: string
  children?: TransformedNode[]
}

describe('mapTree', () => {
  const createNode = (id: number, name: string, children?: TreeNode[]): TreeNode => ({
    id,
    name,
    ...(children && children.length > 0 && { children })
  })

  describe('basic functionality', () => {
    it('should map over a simple tree structure', () => {
      const tree: TreeNode[] = [createNode(1, 'Root', [createNode(2, 'Child 1'), createNode(3, 'Child 2')])]

      const result = mapTree(tree, (node) => ({
        ...node,
        name: node.name.toUpperCase()
      }))

      expect(result).toHaveLength(1)
      expect(result[0].name).toBe('ROOT')
      expect(result[0].children).toHaveLength(2)
      expect(result[0].children![0].name).toBe('CHILD 1')
      expect(result[0].children![1].name).toBe('CHILD 2')
    })

    it('should handle empty tree', () => {
      const tree: TreeNode[] = []

      const result = mapTree(tree, (node) => ({
        ...node,
        name: node.name.toUpperCase()
      }))

      expect(result).toEqual([])
    })

    it('should handle tree with no children', () => {
      const tree: TreeNode[] = [createNode(1, 'Root'), createNode(2, 'Leaf')]

      const result = mapTree(tree, (node) => ({
        ...node,
        name: node.name.toUpperCase()
      }))

      expect(result).toHaveLength(2)
      expect(result[0].name).toBe('ROOT')
      expect(result[1].name).toBe('LEAF')
      expect(result[0].children).toBeUndefined()
      expect(result[1].children).toBeUndefined()
    })
  })

  describe('level and index parameters', () => {
    it('should pass correct level and index to mapper function', () => {
      const tree: TreeNode[] = [
        createNode(1, 'Root', [createNode(2, 'Child 1', [createNode(4, 'Grandchild')]), createNode(3, 'Child 2')])
      ]

      const result = mapTree(tree, (node, level, index) => ({
        ...node,
        level,
        index,
        path: `${level}-${index}`
      }))

      expect(result[0].level).toBe(0)
      expect(result[0].index).toBe(0)
      expect(result[0].path).toBe('0-0')
      expect(result[0].children![0].level).toBe(1)
      expect(result[0].children![0].index).toBe(0)
      expect(result[0].children![0].path).toBe('1-0')
      expect(result[0].children![0].children![0].level).toBe(2)
      expect(result[0].children![0].children![0].index).toBe(0)
      expect(result[0].children![0].children![0].path).toBe('2-0')
    })
  })

  describe('custom children key', () => {
    it('should work with custom children key', () => {
      const tree = [
        {
          id: 1,
          name: 'Root',
          items: [
            { id: 2, name: 'Child 1' },
            { id: 3, name: 'Child 2' }
          ]
        }
      ]

      const result = mapTree(
        tree,
        (node) => ({
          ...node,
          name: node.name.toUpperCase()
        }),
        { childrenKey: 'items' }
      )

      expect(result).toHaveLength(1)
      expect(result[0].name).toBe('ROOT')
      expect((result[0] as any).items).toHaveLength(2)
      expect((result[0] as any).items[0].name).toBe('CHILD 1')
      expect((result[0] as any).items[1].name).toBe('CHILD 2')
    })
  })

  describe('keepEmptyChildren option', () => {
    it('should keep empty children arrays when keepEmptyChildren is true', () => {
      const tree = [{ id: 1, name: 'Root', children: [] }]

      const result = mapTree(
        tree,
        (node) => ({
          ...node,
          name: node.name.toUpperCase()
        }),
        { keepEmptyChildren: true }
      )

      expect(result[0].children).toEqual([])
    })

    it('should remove empty children arrays when keepEmptyChildren is false', () => {
      const tree: TreeNode[] = [createNode(1, 'Root', [])]

      const result = mapTree(
        tree,
        (node) => ({
          ...node,
          name: node.name.toUpperCase()
        }),
        { keepEmptyChildren: false }
      )

      expect(result[0].children).toBeUndefined()
    })

    it('should preserve non-empty children regardless of keepEmptyChildren setting', () => {
      const tree: TreeNode[] = [createNode(1, 'Root', [createNode(2, 'Child 1')])]

      const result = mapTree(
        tree,
        (node) => ({
          ...node,
          name: node.name.toUpperCase()
        }),
        { keepEmptyChildren: false }
      )

      expect(result[0].children).toBeDefined()
      expect(result[0].children).toHaveLength(1)
      expect(result[0].children![0].name).toBe('CHILD 1')
    })
  })

  describe('complex transformations', () => {
    it('should handle complex node transformations', () => {
      const tree: TreeNode[] = [
        createNode(1, 'Root', [createNode(2, 'Child 1'), createNode(3, 'Child 2', [createNode(4, 'Grandchild')])])
      ]

      const result = mapTree(tree, (node, level, index) => ({
        id: node.id * 10,
        name: `${node.name} (Level ${level})`,
        level,
        index,
        isLeaf: !node.children || node.children.length === 0
      }))

      expect(result[0].id).toBe(10)
      expect(result[0].name).toBe('Root (Level 0)')
      expect(result[0].level).toBe(0)
      expect(result[0].isLeaf).toBe(false)
      expect(result[0].children![0].id).toBe(20)
      expect(result[0].children![0].name).toBe('Child 1 (Level 1)')
      expect(result[0].children![0].isLeaf).toBe(true)
      expect(result[0].children![1].children![0].id).toBe(40)
      expect(result[0].children![1].children![0].name).toBe('Grandchild (Level 2)')
    })

    it('should preserve original tree structure', () => {
      const tree: TreeNode[] = [
        createNode(1, 'Root', [
          createNode(2, 'Child 1'),
          createNode(3, 'Child 2', [createNode(4, 'Grandchild 1'), createNode(5, 'Grandchild 2')])
        ]),
        createNode(6, 'Root 2')
      ]

      const result = mapTree(tree, (node) => ({
        ...node,
        name: node.name.toUpperCase()
      }))

      // Check structure is preserved
      expect(result).toHaveLength(2)
      expect(result[0].children).toHaveLength(2)
      expect(result[0].children![1].children).toHaveLength(2)
      expect(result[1].children).toBeUndefined()

      // Check all names are transformed
      const getAllNames = (nodes: any[]): string[] => {
        const names: string[] = []
        nodes.forEach((node) => {
          names.push(node.name)
          if (node.children) {
            names.push(...getAllNames(node.children))
          }
        })
        return names
      }

      const allNames = getAllNames(result)
      expect(allNames).toEqual(['ROOT', 'CHILD 1', 'CHILD 2', 'GRANDCHILD 1', 'GRANDCHILD 2', 'ROOT 2'])
    })
  })

  describe('edge cases', () => {
    it('should handle nodes with undefined children', () => {
      const tree: TreeNode[] = [createNode(1, 'Root', undefined)]

      const result = mapTree(tree, (node) => ({
        ...node,
        name: node.name.toUpperCase()
      }))

      expect(result[0].children).toBeUndefined()
    })

    it('should handle nodes with null children', () => {
      const tree = [{ id: 1, name: 'Root', children: null }] as any

      const result = mapTree(tree, (node) => ({
        ...node,
        name: node.name.toUpperCase()
      }))

      expect(result[0].children).toBeUndefined()
    })

    it('should handle mixed children types', () => {
      const tree = [
        {
          id: 1,
          name: 'Root',
          children: [
            { id: 2, name: 'Child 1' },
            { id: 3, name: 'Child 2', children: null }
          ]
        }
      ] as any

      const result = mapTree(tree, (node) => ({
        ...node,
        name: node.name.toUpperCase()
      }))

      expect(result[0].children![0].children).toBeUndefined()
      expect(result[0].children![1].children).toBeUndefined()
    })
  })
})
