<template>
  <div class="ant-tabs">
    <div class="ant-tabs-header">
      <div class="ant-nav-wrap">
        <div class="navs">
          <div
            v-for="pane in panels"
            :key="pane.props!.name"
            :class="[
              'ant-tab-panel',
              { active: activeName === pane.props!.name }
            ]"
            @click="tabClick(pane.props!.name)"
          >
            {{ pane.props!.label }}
          </div>
        </div>
      </div>
    </div>
    <div class="ant-tabs-content">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, useSlots, ref, watch, provide, VNode } from 'vue'
import { KeyType, TabKey } from './types'

defineOptions({
  name: 'ZTabs'
})
const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: ''
  }
})
const emit = defineEmits(['update:modelValue'])
const slots = useSlots()

const activeName = ref<KeyType>('')
const panels = ref<VNode[]>([])
const tabClick = (name: KeyType) => {
  activeName.value = name
  emit('update:modelValue', name)
}

onMounted(() => {
  // 本来就是一个VNode数组，但是VNode类型比较弱，需要加强一下
  panels.value = slots.default?.() as VNode[]
  if (!activeName.value && panels.value.length) {
    activeName.value = panels.value[0].props?.name
    emit('update:modelValue', panels.value[0].props?.name)
  }
})
watch(
  () => props.modelValue,
  newVal => {
    activeName.value = newVal
  },
  { immediate: true }
)
provide(TabKey, activeName)
</script>

<style lang="scss">
@import '@hk-libs/theme-chalk/src/styles/variable.scss';

.#{$ant-pre}tabs {
  position: relative;
  user-select: none;

  .#{$ant-pre}tabs-header {
    border-bottom: 1px solid #e4e7ed;
    padding: 0;
    position: relative;
    margin: 0 0 15px;
    .#{$ant-pre}nav-wrap {
      overflow: hidden;
      margin-bottom: -1px;
      position: relative;
      .navs {
        display: inline-flex;
        align-items: center;
        border: 1px solid #e4e7ed;
        border-bottom: none;
        border-radius: 4px 4px 0 0;
        .ant-tab-panel {
          flex-shrink: 0;
          padding: 8px 16px;
          text-align: center;
          cursor: pointer;
          transition: color 0.2s ease-in-out;
          border-bottom: 1px solid transparent;
          border-left: 1px solid #e4e7ed;
          &:first-child {
            border-left: none;
          }
          &.hover {
            color: $primary-color;
          }
          &.active {
            color: $primary-color;
            border-bottom: 1px solid #fff;
          }
        }
      }
    }
  }
}
</style>
