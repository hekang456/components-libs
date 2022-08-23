<template>
  <div class="demo-box">
    <z-tree :source="list">
      <template #icon="loading">
        <i v-if="loading" class="iconfont iconcustom-icon ico-loading"></i>
        <i v-else class="iconfont iconzhankai"></i>
      </template>
    </z-tree>
  </div>
</template>

<script lang="ts" setup>
import { TreeNodeOptions } from '@hk-libs/components/tree/src/types'
import { onMounted, ref } from 'vue';
function recursion(path = '0', level = 2): TreeNodeOptions[] {
  const list: TreeNodeOptions[] = [];
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
onMounted(() => {
  list.value = recursion();
})

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
defineOptions({
  name: 'TreeDemo'
})
</script>