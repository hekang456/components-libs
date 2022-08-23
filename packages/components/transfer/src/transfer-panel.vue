<template>
  <div class="ant-transfer-panel">
    <div class="ant-transfer-panel-header">
      <z-checkbox
        :model-value="checkedCount === list.length && !!list.length"
        :half-checked="halfChecked"
        @change="handleChecked"
      >
        <slot></slot>
      </z-checkbox>
      <span class="count">{{ checkedCount }} / {{ list.length }}</span>
    </div>
    <div class="ant-transfer-panel-body">
      <div class="content">
        <div v-for="item in list" :key="item.key" class="content-item">
          <z-checkbox
            :model-value="item.checked"
            :disabled="item.disabled"
            @change="handleItemChecked(item)"
          >
            {{ item.value }}
          </z-checkbox>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { computed } from 'vue'
import { PropType } from 'vue'
import { TransferItem } from './types'

defineOptions({
  name: 'ZTransferPanel'
})
const props = defineProps({
  list: {
    type: Array as PropType<TransferItem[]>,
    default: () => []
  }
})
const halfChecked = computed(() => {
  return (
    props.list.some(item => item.checked) &&
    props.list.some(item => !item.checked)
  )
})

const checkedCount = computed(
  () => props.list.filter(item => item.checked).length || 0
)

const handleChecked = (value: boolean) => {
  props.list.forEach(item => {
    if (!item.disabled) {
      item.checked = value
    }
  })
}
const handleItemChecked = (item: TransferItem) => {
  item.checked = !item.checked
}
</script>
