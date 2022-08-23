import { RequiredTreeNodeOptions } from "./types";

function updateDownwards(checked: boolean, node: RequiredTreeNodeOptions) {
  const update = (children: RequiredTreeNodeOptions[]) => {
    if (children.length) {
      children.forEach(item => {
        item.checked = checked
        if (item.children.length) {
          update(item.children as RequiredTreeNodeOptions[])
        }
      })
    }
  }
  update(node.children as RequiredTreeNodeOptions[])
}

const updateUpwards = (node: RequiredTreeNodeOptions, flatList: RequiredTreeNodeOptions[]) => {
  const update = (curNode: RequiredTreeNodeOptions) => {
    if (curNode.parentKey) { // 到顶级节点就不需要递归了
      const parentNode = flatList.find(item => item.nodeKey === curNode.parentKey)
      if (parentNode) {
        // 看他的孩子是否都被选中了。表示parentNode应有的checked状态
        const parentChecked = !parentNode.children.some(child => !child.checked)
        if (parentNode.checked !== parentChecked) {
          parentNode.checked = parentChecked
          update(parentNode)
        }
      }
    }
  }
  update(node)
}

export {
  updateDownwards,
  updateUpwards
}