<template>
  <div class="demo-box">
    <z-button @click="randomClick">随机一个分数</z-button>
    {{ rate }}
    <z-rate v-model="rate"></z-rate>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
defineOptions({
  name: 'RateDemo'
})
const rate = ref(2.4)
const randomClick = () => {
  rate.value = Math.random() * 5
}
</script>
