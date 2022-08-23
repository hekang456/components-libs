# Message 全局提示

## 基础用法

<div class='demo-box'>
  <z-button @click="handleClick('info', true)">info</z-button>&nbsp;
  <z-button @click="handleClick('success', true)" type='success'>success</z-button>&nbsp;
  <z-button @click="handleClick('warning', true)" type='warning'>warning</z-button>&nbsp;
  <z-button @click="handleClick('error', true)" type='danger'>error</z-button>&nbsp;
  <z-button @click="handleClick('info', false)">no close</z-button>
</div>

<script setup lang="ts">

import message from '@hk-libs/components/message/src/index'
import { MessageType } from '@hk-libs/components/message/src/types'
const handleClick = (type: MessageType, showClose: boolean) => {
  message({
    type,
    message: 'this is a message',
    showClose: showClose
  })
}
</script>

```vue
<template>
  <z-button @click="handleClick('info', true)">info</z-button>
  <z-button @click="handleClick('success', true)">success</z-button>
  <z-button @click="handleClick('warning', true)">warning</z-button>
  <z-button @click="handleClick('error', true)">error</z-button>
  <z-button @click="handleClick('info', false)">no close</z-button>
</template>

<script setup lang="ts">
import message from '@hk-libs/components/message/src/index'
import { MessageType } from '@hk-libs/components/message/src/types'

const handleClick = (type: MessageType, showClose: boolean) => {
  message({
    type,
    message: 'this is a message',
    showClose: showClose
  })
}
</script>
```

## API

### Input Props

| 名称  | 类型           | 默认值    | 说明     |
| ----- | -------------- | --------- | -------- |
| type | 'success' 'info' 'warning' 'info' '' | '' | 特殊样式 |
| message | string | VNode | '' | 显示的内容 |
| showClose | boolean | false | 是否显示关闭按钮 |
| icon | string | '' | 信息前的图标 |
| duration | number | 3000 | 提示存在的时间 |
| onClose | function | ()=>void | 点击关闭的回调 |
