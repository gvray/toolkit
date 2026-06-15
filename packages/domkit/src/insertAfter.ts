/**
 * Inserts a node after a reference node.
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
 * insertAfter(b, a)
 * parent.children.length // => 2
 *
 * @since 1.0.0
 */
const insertAfter = <T extends Node>(newNode: T, referenceNode: Node): T => {
  if (!referenceNode.parentNode) {
    throw new Error('referenceNode must have a parentNode');
  }

  referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
  return newNode;
};

export default insertAfter;
