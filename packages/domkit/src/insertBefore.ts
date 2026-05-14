/**
 * Inserts a node before a reference node.
 *
 * @param newNode - The node to insert.
 * @param referenceNode - The reference node.
 * @returns The inserted node.
 *
 * @example
 * insertBefore(newEl, refEl)
 * // -> newEl
 */
const insertBefore = <T extends Node>(newNode: T, referenceNode: Node): T => {
  if (!referenceNode.parentNode) {
    throw new Error('referenceNode must have a parentNode')
  }

  referenceNode.parentNode.insertBefore(newNode, referenceNode)
  return newNode
}

export default insertBefore
