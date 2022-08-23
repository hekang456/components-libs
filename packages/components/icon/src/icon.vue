<template>
  <i :class="bem.b()" :style="style">
    <slot></slot>
  </i>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { createNamespace } from '@hk-libs/utils/create'
import { iconProps } from './icon'

defineOptions({
  name: 'z-icon'
})

const bem = createNamespace('icon')
const props = defineProps(iconProps)

const style = computed(() => {
  if (!props.color && !props.size) return {}
  return {
    ...(props.size
      ? { 'font-size': props.size + 'px' }
      : { 'font-size': 16 + 'px' }),
    ...(props.color ? { color: props.color } : {})
  }
})
</script>

<style lang="scss" scoped></style>
