# Pagination 分页组件
分页显示数据，适合数据量较大的情况

## 基础使用
tips: 必须指定total


<div>
  <z-pagination
    :total="490"
    :page-num="pageNum"
    @on-page-change="handleChange"
  ></z-pagination>
</div>

<script setup lang="ts">
import { ref } from 'vue'

const pageNum = ref(1)
const handleChange = (newPageNum: number): void => {
  if (pageNum.value !== newPageNum) {
    pageNum.value = newPageNum
  }
}
</script>

```vue
<template>
  <div class="demo-box">
    <z-pagination
      :total="490"
      :page-num="pageNum"
      @on-page-change="handleChange"
    ></z-pagination>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const pageNum = ref(1)
const handleChange = (newPageNum: number): void => {
  if (pageNum.value !== newPageNum) {
    pageNum.value = newPageNum
  }
}
</script>

```

## API

### Pagination Props

| 名称  | 类型           | 默认值    | 说明     |
| ----- | -------------- | --------- | -------- |
| total | number  | 0 | 数据总条数，用于计算页数 |
| pageNum  | number | 1 | 当前显示的页数 |
| pageSize  | number | 10 | 每页展示的条数 |

### Pagination Functions
| 名称  | 参数           | 返回值    | 说明     |
| ----- | -------------- | --------- | -------- |
|onPageChange | newPageNum | 无 | 可以使用这个函数拿到新的页数 |