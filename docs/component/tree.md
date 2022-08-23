# Tree 树组件


## 基础使用
- list 是 TreeNodeOptions[]，数组的每一项都需要nodeKey和name
- hasChildren 表示node左边的图标，children 表示子节点
<div style="padding: 12px; border: solid 1px #ebebeb;">
  <z-tree :source="list" />
</div>

<script lang="ts" setup>
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
</script>

```vue
<template>
  <div class="demo-box">
    <z-tree :source="list" />
  </div>
</template>

<script lang="ts" setup>
import { TreeNodeOptions } from '@hk-libs/components/tree/src/types'
import { onMounted, ref } from 'vue';
// 生成tree类型的数组
function recursion(path = '0', level = 2): TreeNodeOptions[] {
  const list = [];
  for (let i = 0; i < 5; i += 1) {
    const nodeKey = `${path}-${i}`;
    const treeNode: TreeNodeOptions = {
      nodeKey,
      name: nodeKey,
      children: [],
      hasChildren: true,
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
</script>
```

## API

### Tree Props

| 名称  | 类型           | 默认值    | 说明     |
| ----- | -------------- | --------- | -------- |
| source | TreeNodeOptions[]         | [] | 数据源 |
| showCheckbox  | boolean | false | 是否显示多选框 |
| checkStrictly  | boolean | false | 是否严格模式（不支持半选） |
| lazyLoad  | function | (node: RequiredTreeNodeOptions, callback: (children: TreeNodeOptions[]) => void) => void | 是否需要懒加载 |
| render  | function | (node: TreeNodeOptions) => JSX.Element | 自定义每个节点的内容选择区 |

