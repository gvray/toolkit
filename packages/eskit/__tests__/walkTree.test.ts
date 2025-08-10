import walkTree from '../src/walkTree'

interface TreeNode {
  id: number
  name: string
  children?: TreeNode[]
}

describe('walkTree', () => {
  const createNode = (id: number, name: string, children?: TreeNode[]): TreeNode => ({
    id,
    name,
    ...(children && children.length > 0 && { children })
  })

  describe('basic functionality', () => {
    it('should walk through all nodes in depth-first order', () => {
      const tree: TreeNode[] = [
        createNode(1, 'Root', [createNode(2, 'Child 1'), createNode(3, 'Child 2', [createNode(4, 'Grandchild')])])
      ]

      const visited: string[] = []
      const result = walkTree(tree, (node, level, index) => {
        visited.push(`${node.name} (L${level}, I${index})`)
      })

      expect(result).toBe(true)
      expect(visited).toEqual(['Child 1 (L1, I0)', 'Grandchild (L2, I0)', 'Child 2 (L1, I1)', 'Root (L0, I0)'])
    })

    it('should handle empty tree', () => {
      const tree: TreeNode[] = []

      const visited: string[] = []
      const result = walkTree(tree, (node) => {
        visited.push(node.name)
      })

      expect(result).toBe(true)
      expect(visited).toEqual([])
    })

    it('should handle tree with no children', () => {
      const tree: TreeNode[] = [createNode(1, 'Root'), createNode(2, 'Leaf')]

      const visited: string[] = []
      const result = walkTree(tree, (node, level, index) => {
        visited.push(`${node.name} (L${level}, I${index})`)
      })

      expect(result).toBe(true)
      expect(visited).toEqual(['Root (L0, I0)', 'Leaf (L0, I1)'])
    })
  })

  describe('traversal order', () => {
    it('should traverse in depth-first order by default', () => {
      const tree: TreeNode[] = [
        createNode(1, 'Root', [
          createNode(2, 'Child 1', [createNode(4, 'Grandchild 1')]),
          createNode(3, 'Child 2', [createNode(5, 'Grandchild 2')])
        ])
      ]

      const visited: string[] = []
      walkTree(tree, (node) => {
        visited.push(node.name)
      })

      expect(visited).toEqual(['Grandchild 1', 'Child 1', 'Grandchild 2', 'Child 2', 'Root'])
    })

    it('should traverse in breadth-first order when depthFirst is false', () => {
      const tree: TreeNode[] = [
        createNode(1, 'Root', [
          createNode(2, 'Child 1', [createNode(4, 'Grandchild 1')]),
          createNode(3, 'Child 2', [createNode(5, 'Grandchild 2')])
        ])
      ]

      const visited: string[] = []
      walkTree(
        tree,
        (node) => {
          visited.push(node.name)
        },
        { depthFirst: false }
      )

      expect(visited).toEqual(['Root', 'Child 1', 'Child 2', 'Grandchild 1', 'Grandchild 2'])
    })
  })

  describe('stopping traversal', () => {
    it('should stop traversal when visitor returns false', () => {
      const tree: TreeNode[] = [
        createNode(1, 'Root', [createNode(2, 'Child 1'), createNode(3, 'Child 2'), createNode(4, 'Child 3')])
      ]

      const visited: string[] = []
      const result = walkTree(tree, (node) => {
        visited.push(node.name)
        if (node.id === 2) {
          return false
        }
      })

      expect(result).toBe(false)
      expect(visited).toEqual(['Child 1'])
    })

    it('should continue traversal when stopOnFalse is false', () => {
      const tree: TreeNode[] = [createNode(1, 'Root', [createNode(2, 'Child 1'), createNode(3, 'Child 2')])]

      const visited: string[] = []
      const result = walkTree(
        tree,
        (node) => {
          visited.push(node.name)
          if (node.id === 2) {
            return false
          }
        },
        { stopOnFalse: false }
      )

      expect(result).toBe(true)
      expect(visited).toEqual(['Child 1', 'Child 2', 'Root'])
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

      const visited: string[] = []
      const result = walkTree(
        tree,
        (node) => {
          visited.push(node.name)
        },
        { childrenKey: 'items' }
      )

      expect(result).toBe(true)
      expect(visited).toEqual(['Child 1', 'Child 2', 'Root'])
    })
  })

  describe('level and index parameters', () => {
    it('should pass correct level and index to visitor function', () => {
      const tree: TreeNode[] = [
        createNode(1, 'Root', [createNode(2, 'Child 1', [createNode(4, 'Grandchild')]), createNode(3, 'Child 2')])
      ]

      const visited: Array<{ name: string; level: number; index: number }> = []
      walkTree(tree, (node, level, index) => {
        visited.push({ name: node.name, level, index })
      })

      expect(visited).toEqual([
        { name: 'Grandchild', level: 2, index: 0 },
        { name: 'Child 1', level: 1, index: 0 },
        { name: 'Child 2', level: 1, index: 1 },
        { name: 'Root', level: 0, index: 0 }
      ])
    })
  })

  describe('complex scenarios', () => {
    it('should handle complex tree structure', () => {
      const tree: TreeNode[] = [
        createNode(1, 'Root 1', [
          createNode(2, 'Child 1.1', [createNode(5, 'Grandchild 1.1.1')]),
          createNode(3, 'Child 1.2')
        ]),
        createNode(4, 'Root 2', [
          createNode(6, 'Child 2.1'),
          createNode(7, 'Child 2.2', [createNode(8, 'Grandchild 2.2.1')])
        ])
      ]

      const visited: string[] = []
      walkTree(tree, (node) => {
        visited.push(node.name)
      })

      expect(visited).toEqual([
        'Grandchild 1.1.1',
        'Child 1.1',
        'Child 1.2',
        'Root 1',
        'Child 2.1',
        'Grandchild 2.2.1',
        'Child 2.2',
        'Root 2'
      ])
    })

    it('should collect all node IDs', () => {
      const tree: TreeNode[] = [
        createNode(1, 'Root', [createNode(2, 'Child 1'), createNode(3, 'Child 2', [createNode(4, 'Grandchild')])])
      ]

      const ids: number[] = []
      walkTree(tree, (node) => {
        ids.push(node.id)
      })

      expect(ids).toEqual([2, 4, 3, 1])
    })

    it('should find specific node and stop', () => {
      const tree: TreeNode[] = [
        createNode(1, 'Root', [
          createNode(2, 'Child 1'),
          createNode(3, 'Child 2', [createNode(4, 'Target')]),
          createNode(5, 'Child 3')
        ])
      ]

      let foundNode: TreeNode | null = null
      const visited: string[] = []

      walkTree(tree, (node) => {
        visited.push(node.name)
        if (node.name === 'Target') {
          foundNode = node
          return false
        }
      })

      expect(foundNode).toEqual({ id: 4, name: 'Target' })
      expect(visited).toEqual(['Child 1', 'Target'])
    })
  })

  describe('edge cases', () => {
    it('should handle nodes with undefined children', () => {
      const tree: TreeNode[] = [createNode(1, 'Root', undefined)]

      const visited: string[] = []
      const result = walkTree(tree, (node) => {
        visited.push(node.name)
      })

      expect(result).toBe(true)
      expect(visited).toEqual(['Root'])
    })

    it('should handle nodes with null children', () => {
      const tree = [{ id: 1, name: 'Root', children: null }] as any

      const visited: string[] = []
      const result = walkTree(tree, (node) => {
        visited.push(node.name)
      })

      expect(result).toBe(true)
      expect(visited).toEqual(['Root'])
    })

    it('should handle empty children arrays', () => {
      const tree = [{ id: 1, name: 'Root', children: [] }]

      const visited: string[] = []
      const result = walkTree(tree, (node) => {
        visited.push(node.name)
      })

      expect(result).toBe(true)
      expect(visited).toEqual(['Root'])
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

      const visited: string[] = []
      const result = walkTree(tree, (node) => {
        visited.push(node.name)
      })

      expect(result).toBe(true)
      expect(visited).toEqual(['Child 1', 'Child 2', 'Root'])
    })
  })
})
