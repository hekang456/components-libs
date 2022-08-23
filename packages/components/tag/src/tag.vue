<template>
  <div :class="['ant-tag', colorCls, tagModeCls]" :style="customStyle">
    <!-- <div class="ant-tag ant-tag-green"> -->
    <slot></slot>
    <z-icon v-if="closeable" class="icon-close" @click="handleClose">
      <Close />
    </z-icon>
  </div>
</template>

<script setup lang="ts">
import { PropType, computed } from 'vue'
import { TagMode, ColorPresets } from './types'

defineOptions({
  name: 'ZTag'
})
const props = defineProps({
  color: {
    type: String,
    default: ''
  },
  tagMode: {
    type: String as PropType<TagMode>,
    default: 'default'
  },
  closeable: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['onClose'])

const handleClose = () => {
  emit('onClose')
}

const customStyle = computed(() => {
  if (props.color && !ColorPresets.includes(props.color)) {
    return {
      color: props.color,
      backgroundColor: '#fff',
      borderColor: props.color
    }
  }
  return {}
})
const colorCls = computed(() => {
  if (props.color && ColorPresets.includes(props.color)) {
    return `ant-tag-${props.color}`
  }
  return ''
})
const tagModeCls = computed(() => {
  if (props.tagMode === 'circle') {
    return 'ant-tag-circle'
  }
  return ''
})
</script>

<style lang="scss">
.ant-tag {
  display: inline-block;
  color: rgba(0, 0, 0, 0.65);
  font-variant: tabular-nums;
  font-feature-settings: 'tnum';
  padding: 2px 8px 2px 8px;
  font-size: 12px;
  line-height: 20px;
  white-space: nowrap;
  background-color: #fafafa;
  border: 1px solid #d9d9d9;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.78, 0.14, 0.15, 0.86);

  .icon-close {
    vertical-align: -2px;
    margin-left: 4px;
    margin-right: -4px;
  }
  &.ant-tag-circle {
    border-radius: 26px;
  }
  &.ant-tag-close {
    padding: 0 6px 0 10px;
    .content {
      margin-right: 4px;
    }
  }
  &.ant-tag-magenta {
    color: #eb2f96;
    background-color: #fff0f6;
    border-color: #ffadd2;
  }
  &.ant-tag-orange {
    color: #fa8c16;
    background-color: #fff7e6;
    border-color: #ffd591;
  }
  &.ant-tag-green {
    color: #52c41a;
    background-color: #f6ffed;
    border-color: #b7eb8f;
  }
}
</style>
