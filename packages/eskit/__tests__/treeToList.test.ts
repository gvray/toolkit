import { treeToList } from '../src'
import { TreeNode } from '../src/tree-to-list'
describe('treeToList', () => {
  interface IItem<T> {
    children?: T[]
  }

  class Item implements IItem<Item> {
    constructor(public value: string, public children?: Item[]) {}
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
