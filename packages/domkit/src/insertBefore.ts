/**
 * Inserts a node before a reference node.
 *
 * @param newNode - The node to insert.
 * @param referenceNode - The reference node.
 * @returns The inserted node.
 *
 * @example
 * const parent = document.createElement('div')
 * const a = document.createElement('span')
 * const b = document.createElement('span')
 * parent.appendChild(a)
 * insertBefore(b, a)
 * parent.children.length // => 2
 *
 * @since 1.0.0
 */
const insertBefore = <T extends Node>(newNode: T, referenceNode: Node): T => {
  if (!referenceNode.parentNode) {
    throw new Error('referenceNode must have a parentNode');
  }

  referenceNode.parentNode.insertBefore(newNode, referenceNode);
  return newNode;
};

export default insertBefore;
