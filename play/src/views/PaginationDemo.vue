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

defineOptions({
  name: 'TabsDemo'
})
const pageNum = ref(1)
const handleChange = (newPageNum: number): void => {
  if (pageNum.value !== newPageNum) {
    pageNum.value = newPageNum
  }
}
</script>
