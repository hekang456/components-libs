type nodeKey = string | number; // 唯一索引

/*
* 用户传入的source必须要有 nodeKey, name
* */

interface TreeNodeOptions {
  nodeKey: nodeKey;
  name: string;
  level?: number; // 控制缩进
  loading?: boolean;
  disabled?: boolean;
  expanded?: boolean;
  selected?: boolean; // 被选中，同一时间只有一个可以被选中
  checked?: boolean; // 勾选
  hasChildren?: boolean; // 如果hasChildren是false，那么就是叶子节点
  children?: TreeNodeOptions[];
  parentKey?: nodeKey | null;
}

// 组件内部用的
type RequiredTreeNodeOptions = Required<TreeNodeOptions>;

interface TreeInstance {
  getSelectedNode: () => RequiredTreeNodeOptions | undefined;
  getCheckedNodes: () => RequiredTreeNodeOptions[];
  getHalfCheckedNodes: () => RequiredTreeNodeOptions[];
}

interface TreeNodeInstance {
  node: RequiredTreeNodeOptions;
  halfChecked: () => boolean;
}


export {
  nodeKey,
  TreeNodeOptions,
  RequiredTreeNodeOptions,
  TreeInstance,
  TreeNodeInstance
}