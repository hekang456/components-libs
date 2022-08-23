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
