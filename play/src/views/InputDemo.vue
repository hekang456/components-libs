<template>
  <div class="demo-box">
    <p>text: {{ text }}</p>
    <z-input v-model="text" placeholder="请输入内容..." type="text"></z-input>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

defineOptions({
  name: 'InputDemo'
})
const text = ref('')
</script>

<style scoped lang="scss"></style>
