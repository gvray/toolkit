import { filterTree, findTreeNode, treeDepth } from '../src'

const tree = [
  {
    id: 1,
    visible: true,
    children: [
      { id: 2, visible: false, children: [] },
      { id: 3, visible: true, children: [{ id: 4, visible: true, children: [] }] }
    ]
  }
]

describe('tree utilities', () => {
  it('findTreeNode finds the first matching node', () => {
    expect(findTreeNode(tree, (node) => node.id === 4)?.id).toBe(4)
  })

  it('filterTree preserves ancestor chains for matched nodes', () => {
    expect(filterTree(tree, (node) => Boolean(node.visible))).toEqual([
      {
        id: 1,
        visible: true,
        children: [
          {
            id: 3,
            visible: true,
            children: [{ id: 4, visible: true, children: [] }]
          }
        ]
      }
    ])
    expect(filterTree(tree, (node) => node.id === 4)).toEqual([
      {
        id: 1,
        visible: true,
        children: [
          {
            id: 3,
            visible: true,
            children: [{ id: 4, visible: true, children: [] }]
          }
        ]
      }
    ])
  })

  it('treeDepth returns the maximum depth', () => {
    expect(treeDepth(tree)).toBe(3)
    expect(treeDepth([])).toBe(0)
  })
})
