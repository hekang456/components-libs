<template>
  <div class="demo-box">
    <button @click="selectedNode">获取选中的节点</button> |
    <button @click="checkedNodes">获取勾选的节点</button> |
    <button @click="halfCheckedNodes">获取半选的节点</button> |
    <!-- <z-tree ref="tree" :source="list" /> -->
    <z-tree ref="tree" :source="list" show-checkbox />
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { TreeNodeOptions, TreeInstance } from '@hk-libs/components/tree/src/types'


function recursion(path = '0', level = 2): TreeNodeOptions[] {
  const list = [];
  for (let i = 0; i < 5; i += 1) {
    const nodeKey = `${path}-${i}`;
    const treeNode: TreeNodeOptions = {
      nodeKey,
      name: nodeKey,
      children: [],
      hasChildren: true,
      // expanded: true
      // disabled: i % 2 === 0
    };

    if (level > 0) {
      treeNode.children = recursion(nodeKey, level - 1);
    } else {
      treeNode.hasChildren = false;
    }

    list.push(treeNode);
  }
  return list;
}

const list = ref<TreeNodeOptions[]>([])
const tree = ref<TreeInstance>()
const selectedNode = () => {
  const node = tree.value?.getSelectedNode();
  console.log('selected node', node);
}
const checkedNodes = () => {
  const nodes = tree.value?.getCheckedNodes();
  console.log('checkedNodes', nodes);
}
const halfCheckedNodes = () => {
  const nodes = tree.value?.getHalfCheckedNodes();
  console.log('halfCheckedNodes', nodes);
}


onMounted(() => {
  list.value = recursion();
})

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
defineOptions({
  name: 'TreeDemo'
})
</script>