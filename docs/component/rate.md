# Rate 评分

## 基础用法

<div class="demo-box">
  <z-button @click="randomClick">随机一个分数</z-button>
  {{ rate }}
  <z-rate v-model="rate"></z-rate>
</div>

<script setup lang="ts">
import { ref } from 'vue'

const rate = ref(2.4)
const randomClick = () => {
  rate.value = Math.random() * 5
}
</script>


```vue
<template>
  <div class="demo-box">
    <z-button @click="randomClick">随机一个分数</z-button>
    {{ rate }}
    <z-rate v-model="rate"></z-rate>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const rate = ref(2.4)
const randomClick = () => {
  rate.value = Math.random() * 5
}
</script>


```

## API

### Rate Props

| 名称  | 类型           | 默认值    | 说明     |
| ----- | -------------- | --------- | -------- |
| v-model | number   | 0 | 实际分数，双向绑定 |
| readonly | boolean   | false | 是否可以修改 |
| count | number   | 5 | star个数，一个代表一分 |

