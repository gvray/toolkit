import treeToList, { TreeNode } from '../src/treeToList'

describe('treeToList', () => {
  interface Item extends TreeNode<Item> {
    value: string
  }

  const createItem = (value: string, children?: Item[]): Item => {
    const item: Item = { value } as Item
    if (children) {
      item.children = children
    }
    return item
  }

  // it('should flatten a trees into a list', () => {
  //   const trees = [
  //     new Item('a', [new Item('b', [new Item('d')]), new Item('c', [new Item('e'), new Item('f')])]),
  //     new Item('g')
  //   ]

  //   const expected = [
  //     new Item('d'),
  //     new Item('b'),
  //     new Item('e'),
  //     new Item('f'),
  //     new Item('c'),
  //     new Item('a'),
  //     new Item('g')
  //   ]

  //   const result = treeToList<Item>(trees)
  //   console.dir(result)

  //   expect(result).toEqual(expected)
  // })

  it('should handle an empty trees', () => {
    const trees: Item[] = []
    const result = treeToList<Item>(trees)
    expect(result).toEqual([])
  })

  // it('should handle a trees with a single node', () => {
  //   const trees = [new Item('a')]
  //   const result = treeToList<Item>(trees)
  //   expect(result).toEqual(trees)
  // })
})
