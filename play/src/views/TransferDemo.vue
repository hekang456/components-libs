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
