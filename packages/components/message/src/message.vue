<template>
  <Transition
    name="fade"
    @before-leave="$emit('close')"
    @after-leave="$emit('destroy')"
  >
    <div
      v-show="visible"
      :id="id"
      class="message"
      :style="customStyle"
      @mouseenter="clearTimer"
      @mouseleave="startTimer"
    >
      <z-icon v-if="iconComponent" :size="16" class="icon" :class="type">
        <component :is="iconComponent" />
      </z-icon>
      <p class="content">{{ message }}</p>
      <z-icon v-if="showClose" class="closeBtn" @click.stop="close">
        <CircleClose />
      </z-icon>
    </div>
  </Transition>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onMounted,
  PropType,
  ref,
  VNode,
  watch
} from 'vue'
import ZIcon from '../../icon'
import {
  CircleClose,
  CircleCheckFilled,
  WarningFilled,
  InfoFilled,
  CircleCloseFilled
} from '@element-plus/icons-vue'
import { getLastOffset } from './index'
import './index.scss'
import { MessageType } from './types'

export default defineComponent({
  name: 'ZMessage',
  components: {
    ZIcon,
    CircleClose,
    CircleCheckFilled,
    WarningFilled,
    InfoFilled,
    CircleCloseFilled
  },
  props: {
    id: {
      type: String,
      default: ''
    },
    type: {
      type: String as PropType<MessageType>,
      default: 'info'
    },
    message: {
      type: [String, Object, Function] as PropType<
        string | VNode | (() => VNode)
      >,
      default: ''
    },
    duration: {
      type: Number,
      default: 300
    },
    repeatNum: {
      type: Number,
      default: 0
    },
    icon: {
      type: String,
      default: ''
    },
    showClose: {
      type: Boolean,
      default: false
    },
    offset: {
      type: Number,
      default: 16
    },
    onClose: {
      type: Function as PropType<() => void>,
      required: false
    }
  },
  emits: ['destroy', 'close'],
  setup(props, { expose }) {
    // eslint-disable-next-line vue/no-setup-props-destructure
    const { duration } = props
    const height = 45
    const visible = ref(false)
    let stopTimer: number

    const startTimer = () => {
      if (duration === 0) return
      stopTimer = setTimeout(() => {
        close()
      }, duration)
    }
    const close = () => {
      visible.value = false
    }
    const clearTimer = () => {
      clearTimeout(stopTimer)
    }

    const TypeComponentsMap = {
      success: 'CircleCheckFilled',
      warning: 'WarningFilled',
      info: 'InfoFilled',
      error: 'CircleCloseFilled'
    }

    const iconComponent = computed(
      () => props.icon || TypeComponentsMap[props.type] || ''
    )

    const lastOffset = computed(() => getLastOffset(props.id))
    const offset = computed(() => props.offset + lastOffset.value)
    const bottom = computed((): number => height + offset.value)
    const customStyle = computed(() => ({
      top: `${offset.value}px`
    }))

    watch(
      () => props.repeatNum,
      () => {
        clearTimer()
        startTimer()
      }
    )

    onMounted(() => {
      startTimer()
      visible.value = true
    })

    expose({
      visible,
      bottom,
      close
    })
    return {
      visible,
      startTimer,
      clearTimer,
      iconComponent,
      close,
      customStyle
    }
  }
})
</script>
