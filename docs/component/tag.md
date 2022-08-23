# Tag 标签
给某些内容打标签，突出显示

## 基础使用
tips: 可以不指定任何属性

<div class="demo-box">
  <div>默认样式: </div>
  <z-tag>标签</z-tag>
</div>
<br/>
<div class="demo-box">
  <div @click="changeColor">切换颜色: </div>
  <z-tag :color="color" :closeable="true" @on-close="handleClose">标签</z-tag>
</div>

<script setup lang="ts">
import { ref } from 'vue'
const colors = ['magenta', 'orange', 'green']
const color = ref('magenta')
let i = 0
const changeColor = () => {
  color.value = Math.random() > 0.5 ? colors[i++ % 3] : '#' + Math.random().toString().split('.')[1].slice(0, 6)
}
const handleClose = () => {
  console.log('tag已经关闭')
}
</script>


```vue
<template>
  <div class="demo-box">
    <div>默认样式: </div>
    <z-tag>标签</z-tag>
  </div>
  <div class="demo-box">
    <div @click="changeColor">切换颜色</div>
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
  color.value = Math.random() > 0.5 ? colors[i++ % 3] : '#' + Math.random().toString().split('.')[1].slice(0, 6)
}
const handleClose = () => {
  console.log('tag已经关闭')
}
</script>
```

## API

### Tag Props

| 名称  | 类型           | 默认值    | 说明     |
| ----- | -------------- | --------- | -------- |
| color | string  | '' | 推荐使用系统自带的颜色，也可以自定义自己的颜色 |
| closeable  | boolean | false | 是否显示关闭按钮 |
| tagMode  | string | 'default' | 是否圆角，'circle'为圆角 |

### Tag Functions
| 名称  | 参数           | 返回值    | 说明     |
| ----- | -------------- | --------- | -------- |
|onClose | 无 | 无 | 点击关闭按钮时候的回调|