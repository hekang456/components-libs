# Transfer 穿梭框
更加自由的数据选择列表

## 基础使用
tips: Transfer 的数据通过 data 属性传入。 数据需要是一个对象数组，每个对象有以下属性：key 为数据的唯一性标识，value 为显示文本，disabled 表示该项数据是否禁止被操作。 目标列表中的数据项会同步到绑定至 v-model 的变量，值为数据项的 key 所组成的数组。 当然，如果希望在初始状态时目标列表不为空，可以像本例一样为 v-model 绑定的变量赋予一个初始值。

<div class="demo-box">
  <z-transfer v-model:targetKeys="targetKeys" :data="data"></z-transfer>
</div>

<script setup lang="ts">
import { TransferItem, KeyType } from '@hk-libs/components/transfer/src/types'
import { ref, watch } from 'vue'

const generateData = (num: number): TransferItem[] => {
  const res: TransferItem[] = []
  for (let i = 0; i < num; i++) {
    res.push({
      key: 'key' + i,
      value: `备选项 ${i}`,
      checked: false,
      disabled: i % 6 === 0
    })
  }
  return res
}

const data = ref<TransferItem[]>(generateData(20))
const targetKeys = ref<KeyType[]>(['key3'])
watch(targetKeys, newValue => {
  console.log(newValue)
})
</script>


```vue
<template>
  <div class="demo-box">
    <z-transfer v-model:targetKeys="targetKeys" :data="data"></z-transfer>
  </div>
</template>

<script setup lang="ts">
import { TransferItem, KeyType } from '@hk-libs/components/transfer/src/types'
import { ref, watch } from 'vue'

defineOptions({
  name: 'TabsDemo'
})
const generateData = (num: number): TransferItem[] => {
  const res: TransferItem[] = []
  for (let i = 0; i < num; i++) {
    res.push({
      key: 'key' + i,
      value: `备选项 ${i}`,
      checked: false,
      disabled: i % 6 === 0
    })
  }
  return res
}

const data = ref<TransferItem[]>(generateData(20))
const targetKeys = ref<KeyType[]>(['key3'])
watch(targetKeys, newValue => {
  console.log(newValue)
})
</script>
```

## API

### Transfer Props

| 名称  | 类型           | 默认值    | 说明     |
| ----- | -------------- | --------- | -------- |
| data | TransferItem[]  | [ ] | 需要渲染的数据 |
| targetKeys  | KeyType[] | [ ] | 目标框中保存的数据的key组成的数组 |
