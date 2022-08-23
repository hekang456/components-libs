<template>
  <div class="demo-box">
    <button @click="changeColor">切换颜色</button>
    <z-tag :color="color" :closeable="true" @on-close="handleClose">标签</z-tag>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
defineOptions({
  name: 'TagDemo'
})
const colors = ['magenta', 'orange', 'green']
const color = ref('magenta')
let i = 0
const changeColor = () => {
  color.value =
    Math.random() > 0.5
      ? colors[i++ % 3]
      : '#' + Math.random().toString().split('.')[1].slice(0, 6)
}
const handleClose = () => {
  console.log('tag已经关闭')
}
</script>
