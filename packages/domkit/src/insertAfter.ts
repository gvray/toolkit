/**
 * Inserts a node after a reference node.
 *
 * @param newNode - The node to insert.
 * @param referenceNode - The reference node.
 * @returns The inserted node.
 *
 * @example
 * insertAfter(newEl, refEl)
 * // -> newEl
 */
const insertAfter = <T extends Node>(newNode: T, referenceNode: Node): T => {
  if (!referenceNode.parentNode) {
    throw new Error('referenceNode must have a parentNode')
  }

  referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling)
  return newNode
}

export default insertAfter
