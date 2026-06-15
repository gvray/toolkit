export type TreeNode = {
  children?: TreeNode[];
  [key: string]: any;
};

export interface VirtualRootConfig {
  idField?: string;
  idValue?: string;
  nameField?: string;
  nameValue?: string;
  parentIdField?: string;
  id?: string;
  label?: string;
  parentField?: string;
}

/**
 * 常用的虚拟根节点 ID（全零 UUID）。
 * @since 1.0.0
 */
export const VIRTUAL_ROOT_ID = '00000000-0000-0000-0000-000000000000';

/**
 * 为扁平树形数据添加虚拟根节点，并将所有顶级节点（parentId 为 null/undefined）挂到虚拟根下。
 *
 * @example
 * const result = withVirtualRoot(
 *   [{ id: '1', name: 'A', parentId: null }],
 *   { idField: 'id', idValue: VIRTUAL_ROOT_ID, nameField: 'name', nameValue: 'Root', parentIdField: 'parentId' }
 * )
 * result // => [{ id: '00000000-...', name: 'Root', children: [{ id: '1', name: 'A', ... }] }]
 *
 * @since 1.0.0
 */
export const withVirtualRoot = <T extends Record<string, any>>(
  data: T[],
  config: VirtualRootConfig = {}
): T[] => {
  const idField = config.idField ?? 'id';
  const idValue = config.idValue ?? config.id ?? VIRTUAL_ROOT_ID;
  const nameField = config.nameField ?? 'label';
  const nameValue = config.nameValue ?? config.label ?? 'Virtual Root';
  const parentIdField = config.parentIdField ?? config.parentField ?? 'parentId';

  const virtualRoot = {
    [idField]: idValue,
    [nameField]: nameValue,
    [parentIdField]: null,
  } as T;

  const processedData = data.map((item) => ({
    ...item,
    [parentIdField]:
      item[parentIdField] === null || item[parentIdField] === undefined
        ? idValue
        : item[parentIdField],
  }));

  return [virtualRoot, ...processedData];
};

/**
 * 将表单数据中的虚拟根节点 ID 转换回 null（提交到后端前调用）。
 *
 * @example
 * normalizeVirtualRoot({ name: 'X', parentId: VIRTUAL_ROOT_ID }, VIRTUAL_ROOT_ID, 'parentId')
 * // => { name: 'X', parentId: null } *
 * @since 1.0.0
 */
export function normalizeVirtualRoot<T extends Record<string, any>>(
  values: T[],
  virtualRootId?: string,
  parentIdField?: string
): T[];
export function normalizeVirtualRoot<T extends Record<string, any>>(
  values: T,
  virtualRootId: string,
  parentIdField: string
): T;
export function normalizeVirtualRoot<T extends Record<string, any>>(
  values: T | T[],
  virtualRootId = VIRTUAL_ROOT_ID,
  parentIdField = 'parentId'
): T | T[] {
  if (Array.isArray(values)) {
    return values
      .filter((node) => node.id !== virtualRootId)
      .map((node) => ({
        ...node,
        [parentIdField]: node[parentIdField] === virtualRootId ? null : node[parentIdField],
      }));
  }

  return {
    ...values,
    [parentIdField]: values[parentIdField] === virtualRootId ? null : values[parentIdField],
  };
}

/**
 * 删除树中每个节点的空 children 数组（原地修改）。
 *
 * @example
 * pruneEmptyChildren([{ id: 1, children: [] }])
 * // => [{ id: 1 }] *
 * @since 1.0.0
 */
export function pruneEmptyChildren(tree: TreeNode[]): TreeNode[] {
  const stack: TreeNode[] = [...tree];

  while (stack.length) {
    const node = stack.pop()!;

    if (Array.isArray(node.children)) {
      if (node.children.length === 0) {
        delete node.children;
      } else {
        for (let i = 0; i < node.children.length; i++) {
          stack.push(node.children[i]);
        }
      }
    }
  }

  return tree;
}
