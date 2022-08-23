# Icon 图标

此处使用element-ui提供的图标库

## 使用图标

- 如果你想像用例一样直接使用，你需要全局注册组件，才能直接在项目中使用

<script lang="ts" setup>
  import {Briefcase} from '@element-plus/icons-vue'
</script>
<z-icon color="red" size="40">
  <Briefcase />
</z-icon>
<z-icon color="green" size="40">
  <Briefcase />
</z-icon>
<z-icon color="blue" size="40">
  <Briefcase />
</z-icon>

<div>
<z-icon color="red" size="60">
  <Briefcase />
</z-icon>
<z-icon color="green" size="60">
  <Briefcase />
</z-icon>
<z-icon color="blue" size="60">
  <Briefcase />
</z-icon>
</div>

```vue
<script lang="ts" setup>
import {Briefcase} from '@element-plus/icons-vue'
</script>
<template>
  <z-icon color="red" size="40">
    <Briefcase />
  </z-icon>
</template>
```

## API

### Icon Props

| 名称  | 类型           | 默认值    | 说明     |
| ----- | -------------- | --------- | -------- |
| color | string         | undefined | 图标颜色 |
| size  | string\|number | undefined | 图标大小 |
