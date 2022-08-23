import {
  computed,
  defineComponent,
  nextTick,
  onMounted,
  reactive,
  ref,
  watch
} from 'vue'
import './index.scss'

export default defineComponent({
  name: 'ZVirtualList',
  props: {
    data: {
      type: Array,
      default: () => []
    },
    rowHeight: {
      type: Number,
      default: 20
    },
    remain: {
      // 默认窗口渲染的条数
      type: Number,
      default: 10
    },
    extraRemain: {
      // 额外需要渲染多少
      type: Number,
      default: 10
    },
    start: {
      // 从第几条开始
      type: Number,
      default: 0
    }
  },
  setup(props, { slots }) {
    const scrollBoxTem = ref<HTMLElement | null>()
    const state = reactive({
      // 展示的数据范围
      // 如果data.length === 200, start === 10, remain === 10 ==> state = {10, 20}
      // 如果data.length === 15, start === 10, remain === 10 ==> state = {5, 15}
      // 如果data.length === 8, start === 10, remain === 10 ==> state = {0, 8}
      start: 0,
      end: props.remain
    })

    const scrollBoxHeight = computed(() => {
      return props.rowHeight * props.remain
    })

    const extraState = computed(() => {
      return {
        prev: Math.min(state.start, props.extraRemain),
        next: Math.min(props.extraRemain, props.data.length - state.end)
      }
    })

    const scrollState = computed(() => {
      return {
        top: (state.start - extraState.value.prev) * props.rowHeight,
        bottom: Math.max(
          0,
          (props.data.length -
            state.start -
            extraState.value.prev -
            extraState.value.next -
            props.remain) *
            props.rowHeight
        )
      }
    })

    const needRenderedData = computed(() => {
      return props.data.slice(
        state.start - extraState.value.prev,
        state.end + extraState.value.next
      )
    })

    const handleScroll = () => {
      const scrollTop = scrollBoxTem.value!.scrollTop
      state.start = Math.floor(scrollTop / props.rowHeight)
      state.end = state.start + props.remain
      console.log(state)
    }

    onMounted(() => {
      nextTick(() => {
        const top = props.start > props.data.length ? 0 : props.start
        scrollBoxTem.value!.scrollTo(0, top * props.rowHeight)
      })
    })

    return () => (
      <div
        ref={scrollBoxTem}
        class="scroll-box"
        style={{
          maxHeight: `${scrollBoxHeight.value}px`
        }}
        onScroll={handleScroll}
      >
        <div
          class="list"
          style={{
            paddingTop: `${scrollState.value.top}px`,
            paddingBottom: `${scrollState.value.bottom}px`
          }}
        >
          {needRenderedData.value.map((item, i) =>
            slots.default?.({
              item,
              i: state.start - extraState.value.prev + i
            })
          )}
        </div>
      </div>
    )
  }
})
