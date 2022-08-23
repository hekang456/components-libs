# Button 按钮

## 基础使用

- Button 组件支持primary、success、warning、danger、info五种样式，支持loading属性


<div>
  <z-button>
    按钮
  </z-button>&nbsp;
  <z-button type="success">
    按钮
  </z-button>&nbsp;
  <z-button type="warning">
    按钮
  </z-button>&nbsp;
  <z-button type="danger">
    按钮
  </z-button>&nbsp;
  <z-button :loading="buttonLoading" type="info" @click="buttonClick">
    按钮
  </z-button>&nbsp;
</div>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
function useButton() {
  const buttonLoading = ref(true)
  onMounted(() => {
    setTimeout(() => {
      buttonLoading.value = false
    }, 2000)
  })
  const buttonClick = () => {
    alert('点击按钮')
  }
  return {
    buttonLoading,
    buttonClick
  }
}
export default defineComponent({
  name: 'ButtonDemo',
  setup() {
    return {
      ...useButton()
    }
  }
})
</script>


```vue
<template>
  <div>
    <z-button :loading="buttonLoading" type="danger" @click="buttonClick">
      按钮
    </z-button>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
function useButton() {
  const buttonLoading = ref(true)
  onMounted(() => {
    setTimeout(() => {
      buttonLoading.value = false
    }, 2000)
  })
  const buttonClick = () => {
    alert('点击按钮')
  }
  return {
    buttonLoading,
    buttonClick
  }
}
export default defineComponent({
  name: 'ButtonDemo',
  setup() {
    return {
      ...useButton()
    }
  }
})
</script>

```

## API

### Button Props

| 名称  | 类型           | 默认值    | 说明     |
| ----- | -------------- | --------- | -------- |
| type | string         | primary | 按钮颜色 |

### Tag Functions
| 名称  | 参数           | 返回值    | 说明     |
| ----- | -------------- | --------- | -------- |
| click | 无 | 无 | 点击按钮时候的回调|
