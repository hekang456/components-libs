# VirtualList 虚拟滚动
高性能的大数据量渲染方案

## 基础使用
tips: data是需要渲染的数据，row-height是每一行的高度，remain是需要显示的行数

<z-virtual-list :data="list" :row-height="42" :remain="10">
  <template #default="{ item, i }">
    <div class="virtual-item">{{ item }} -- {{ i }}</div>
  </template>
</z-virtual-list>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'

function generateList(num: number) {
  const res: string[] = []
  for (let i = 0; i < num; i++) {
    res.push(`item ${i}`)
  }
  return res
}
export default defineComponent({
  name: 'ZVirtualListDemo',
  setup(props) {
    const list = ref<string[]>([])

    onMounted(() => {
      list.value = generateList(200)
    })

    return {
      list
    }
  }
})
</script>

<style lang="scss">
.virtual-item {
  padding: 10px 20px;
  background-color: #e8e5d8;
  color: #222;
  border-bottom: 1px solid #999;

  &:hover {
    background-color: #777;
  }
}
</style>


```vue
<template>
  <z-virtual-list :data="list" :row-height="42" :remain="10" :start="10">
    <template #default="{ item, i }">
      <div class="virtual-item">{{ item }} -- {{ i }}</div>
    </template>
  </z-virtual-list>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'

function generateList(num: number) {
  const res: string[] = []
  for (let i = 0; i < num; i++) {
    res.push(`item ${i}`)
  }
  return res
}
export default defineComponent({
  name: 'ZVirtualListDemo',
  setup(props) {
    const list = ref<string[]>([])

    onMounted(() => {
      list.value = generateList(200)
    })

    return {
      list
    }
  }
})
</script>

<style lang="scss">
.virtual-item {
  padding: 10px 20px;
  background-color: #e8e5d8;
  color: #222;
  border-bottom: 1px solid #999;

  &:hover {
    background-color: #777;
  }
}
</style>

```

## API

### VirtualList Props

| 名称  | 类型           | 默认值    | 说明     |
| ----- | -------------- | --------- | -------- |
| data | any[]  | [ ] | 需要渲染的数据 |
| remain  | number | 10 | 需要渲染多少行 |
| row-height  | number | 42 | 每行的高度，配合remain可以算出总高度 |
| extra-remain  | number | 10 | 额外渲染的行数，有助于滚动的流畅 |
| start  | number | 0 | 初始时从第几行开始渲染 |
