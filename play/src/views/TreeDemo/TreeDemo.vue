<template>
  <div class="demo-box">
    <!-- <z-tree :source="list" :render="renderNode" /> -->
    <z-tree :source="list" show-checkbox />
  </div>
</template>

<script lang="tsx" setup>
import { TreeNodeOptions } from '@hk-libs/components/tree/src/types'
import { onMounted, ref } from 'vue';
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
// const renderNode = (node: TreeNodeOptions) => {
//   return <div style="padding: 0 4px;" ><b style="color: #f60;">{node.name}</b></div>
// }
onMounted(() => {
  list.value = recursion();
})

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
defineOptions({
  name: 'TreeDemo'
})
</script>