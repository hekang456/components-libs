<template>
  <div
    :class="[
      'ant-rate-item',
      {
        'ant-rate-item-full': rateStyle.full,
        'ant-rate-item-half': rateStyle.half,
        'ant--rate-item-readonly': rateStyle.readonly
      }
    ]"
  >
    <div
      class="star-wrap back"
      @click="clickRate(false)"
      @mouseenter="hoverRate(false)"
    >
      <z-icon :size="22">
        <StarFilled />
      </z-icon>
    </div>
    <div
      class="star-wrap front"
      @click="clickRate(true)"
      @mouseenter="hoverRate(true)"
    >
      <z-icon :size="22">
        <StarFilled />
      </z-icon>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { Star } from '@vicons/ionicons5'
import { PropType } from 'vue'
import { RateItemState } from './types'

defineOptions({
  name: 'ZRateItem'
})
const props = defineProps({
  rateStyle: {
    type: Object as PropType<RateItemState>,
    default: () => {
      return {
        full: false,
        half: false
      }
    }
  }
})
const emit = defineEmits(['onClickRate', 'onHoverRate'])

const clickRate = (ishalf: boolean) => {
  emit('onClickRate', ishalf)
}
const hoverRate = (ishalf: boolean) => {
  emit('onHoverRate', ishalf)
}
</script>
<style lang="scss">
$hostCls: ant-rate-item;
.#{$hostCls} {
  position: relative;
  display: inline-block;
  color: #f0f0f0;
  margin-right: 2px;
  cursor: pointer;
  transition: transform 0.3s;
  &.#{$hostCls}-full {
    .back {
      color: #fa8c16;
    }
    .front {
      opacity: 0;
    }
  }
  &.#{$hostCls}-half {
    .front {
      opacity: 1;
    }
  }
  &:hover {
    transform: scale(1.2);
  }
  &.#{$hostCls}-readonly {
    &:hover {
      transform: scale(1);
    }
  }
  .star-wrap {
    transition: color 0.3s, opacity 0.3s;
    // .icon {
    //   font-size: 22px;
    // }
  }
  .front {
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
    width: 50%;
    height: 100%;
    overflow: hidden;
    color: #fa8c16;
  }
}
</style>
