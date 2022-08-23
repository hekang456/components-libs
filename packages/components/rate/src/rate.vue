<template>
  <div class="ant-rate-wrap" @mouseleave="handleMouseLeave">
    <z-rate-item
      v-for="(item, i) in count"
      :key="i"
      :rate-style="rateStyles[i]"
      @on-click-rate="handleClickRate($event, i)"
      @on-hover-rate="handleHoverRate($event, i)"
    ></z-rate-item>
  </div>
</template>
<script lang="ts" setup>
import { ref, watch } from 'vue'
import ZRateItem from './rate-item.vue'
import { RateItemState } from './types'

defineOptions({
  name: 'ZRate'
})
const props = defineProps({
  count: {
    type: Number,
    default: 5
  },
  modelValue: {
    type: Number,
    default: 0
  },
  readonly: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits(['update:modelValue'])

let actualValue = 0
let hoverValue = 0
let hasHalf = false
const rateStyles = ref<RateItemState[]>(new Array(props.count))
for (let i = 0; i < props.count; i++) {
  rateStyles.value[i] = { full: false, half: false, readonly: false }
}

const updateStarStyle = () => {
  for (let i = 0; i < props.count; i++) {
    rateStyles.value[i].full = false
    rateStyles.value[i].half = false
    const value = i + 1
    if (value < hoverValue || (!hasHalf && value === hoverValue)) {
      rateStyles.value[i].full = true
    } else if (hasHalf && value === hoverValue) {
      rateStyles.value[i].half = true
    }
    rateStyles.value[i].readonly = props.readonly
  }
}

const setActualValue = (value: number) => {
  if (actualValue !== value) {
    actualValue = value
    emit('update:modelValue', value)
  }
}

const handleClickRate = (ishalf: boolean, index: number) => {
  if (props.readonly) {
    return
  }
  hoverValue = index + 1
  hasHalf = ishalf
  setActualValue(ishalf ? index + 0.5 : hoverValue)
  updateStarStyle()
}
const handleHoverRate = (ishalf: boolean, index: number) => {
  if (props.readonly || (hoverValue === index + 1 && ishalf === hasHalf)) {
    return
  }
  hoverValue = index + 1
  hasHalf = ishalf
  updateStarStyle()
}
const handleMouseLeave = () => {
  hasHalf = !Number.isInteger(actualValue)
  hoverValue = Math.ceil(actualValue)
  updateStarStyle()
}

watch(
  () => props.modelValue,
  newValue => {
    actualValue = newValue
    handleMouseLeave()
  },
  { immediate: true }
)
</script>
<style lang="scss">
.ant-rate-wrap {
  xm-rate-item:last-child {
    .ant-rate-item {
      margin-right: 0;
    }
  }
}
</style>
