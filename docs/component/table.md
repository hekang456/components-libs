# Table 表格
## 基础用法

<z-table :columns="columns" :data="data" row-key="id" :max-height="300" />

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { TableData } from '@hk-libs/components/table/src/types'
import { genTableData, genColumns } from '@hk-libs/components/table/src/mock'

const data = ref<TableData[]>([])
const columns = genColumns()

onMounted(() => {
  data.value = genTableData(20)
})
</script>


```vue
<template>
  <z-table :columns="columns" :data="data" row-key="id" :max-height="300" />
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { TableData } from '@hk-libs/components/table/src/types'
import { genTableData, genColumns } from '@hk-libs/components/table/src/mock'

const data = ref<TableData[]>([])
const columns = genColumns()

onMounted(() => {
  data.value = genTableData(20)
})
</script>


```

## API

### Table Props

| 名称  | 类型           | 默认值    | 说明     |
| ----- | -------------- | --------- | -------- |
| columns | ColumnOptions[]    | [] | 必需，控制表头的显示和宽度等 |
| data | TableData[]   | [] | 必需，控制表格主体内容 |
| row-key | string   | ' ' | 必需，表格循环需要的key |
| max-height | number   | 0 | 控制表格的高度，如果不传，则不会出现滚动条 |

