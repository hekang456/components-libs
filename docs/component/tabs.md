# Tabs 标签页
分隔内容上有关联但属于不同类别的数据集合。

## 基础使用
tips: z-tabs 必须和 z-tab-panel组合使用

<div style="padding: 12px; border: solid 1px #ebebeb;">
  <z-tabs v-model="activeName">
    <z-tab-panel label="用户管理" name="tabOne">
      content 用户管理
    </z-tab-panel>
    <z-tab-panel label="角色管理" name="tabTwo">
      content 角色管理
    </z-tab-panel>
    <z-tab-panel label="配置管理" name="tabThree">
      content 配置管理
    </z-tab-panel>
  </z-tabs>
</div>

<script setup lang="ts">
import { ref, watch } from 'vue'
const activeName = ref('tabTwo')
watch(
  activeName,
  newValue => {
    console.log(newValue)
  },
  { immediate: true }
)
</script>

```vue
<template>
  <div class="demo-box">
    <z-tabs v-model="activeName">
      <z-tab-panel label="用户管理" name="tabOne">
        content 用户管理
      </z-tab-panel>
      <z-tab-panel label="角色管理" name="tabTwo">
        content 角色管理
      </z-tab-panel>
      <z-tab-panel label="配置管理" name="tabThree">
        content 配置管理
      </z-tab-panel>
    </z-tabs>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
defineOptions({
  name: 'TabsDemo'
})
const activeName = ref('tabTwo')
watch(
  activeName,
  newValue => {
    console.log(newValue)
  },
  { immediate: true }
)
</script>
```

## API

### Tab Props

| 名称  | 类型           | 默认值    | 说明     |
| ----- | -------------- | --------- | -------- |
| v-model | string\|number  | '' | 选中的name |
| name  | string\|number | '' | 每一个tab的唯一标识 |
| label  | string\|number | '' | 标签页显示的内容 |
