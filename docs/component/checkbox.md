# Checkbox 选择框

## 基础用法

<div class="demo-box">
  <div class="form-item" style="width: 206px">
    value: {{ value1 }}
    <div><z-checkbox v-model="value1">选择一</z-checkbox></div>
    <div><z-checkbox v-model="value2" halfChecked>选择二</z-checkbox></div>
    <div><z-checkbox v-model="value3" disabled>选择三</z-checkbox></div>
  </div>
</div>

<script lang="ts" setup>
import { ref } from 'vue'
const value1 = ref(false)
const value2 = ref(false)
const value3 = ref(false)
</script>

```vue
<template>
  <div class="demo-box">
    <div class="form-item" style="width: 206px">
      value: {{ value }}
      <div><z-checkbox v-model="value1">选择一</z-checkbox></div>
      <div><z-checkbox v-model="value2" halfChecked>选择二</z-checkbox></div>
      <div><z-checkbox v-model="value3" disabled>选择三</z-checkbox></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const value1 = ref(false)
const value2 = ref(false)
const value3 = ref(false)
</script>

```

## API

### Checkbox Props

| 名称  | 类型           | 默认值    | 说明     |
| ----- | -------------- | --------- | -------- |
| text | string         | '' | 输入框内容，双向绑定 |
