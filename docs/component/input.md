# Input 输入框

## 基础用法

demo 使用`type`属性来定义类型，通过ts声明的`text`来拿到输入的值

<div>
text: {{text}}
<z-input v-model="text"></z-input>
</div>

<script lang="ts" setup>
import { ref } from 'vue';
const text = ref(''); 
</script>

```vue
<template>
  text: {{text}}
  <z-input v-model="text"></z-input>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
const text = ref(''); 
</script>
```


## API

### Input Props

| 名称  | 类型           | 默认值    | 说明     |
| ----- | -------------- | --------- | -------- |
| text | string         | '' | 输入框内容，双向绑定 |
