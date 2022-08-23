import {
  computed,
  defineComponent,
  nextTick,
  onMounted,
  PropType,
  ref,
  watch
} from 'vue'
import { findIndex, findLastIndex, partition, sumBy } from 'lodash'
import './index.scss'
import {
  ColStyleWithCls,
  ColumnOptions,
  TableData,
  TableSectionEls
} from './types'
import ZTableThead from './thead'
import ZTableTbody from './tbody'
import { getColStyle, tableRowKey } from './helper'
import ScrollServe, { IsReachBoundary } from './scroll'

export default defineComponent({
  name: 'ZTable',
  props: {
    columns: {
      type: Array as PropType<ColumnOptions[]>,
      default: () => []
    },
    data: {
      type: Array as PropType<TableData[]>,
      default: () => []
    },
    rowKey: {
      type: String,
      required: true
    },
    maxHeight: {
      type: Number,
      default: 0
    }
  },
  setup(props) {
    // body部分渲染的数据
    const tableData = ref<TableData[]>([])
    // 头部和身体是否需要分离
    const separateHeight = ref(false)
    const tableRootHtml = ref<HTMLElement | null>()
    const tableWidth = ref(0)
    const baseCls = 'ant-table-wrap'
    const scrollBaseCls = 'scroll-position-'
    const rootCls = ref(`${baseCls} ${scrollBaseCls + 'left'}`)
    // 横向滚动条是否到[左, 右]边界
    const scrollBoundary = ref<IsReachBoundary>([true, false])

    const bodyHeadDom = (): Partial<TableSectionEls> => {
      if (tableRootHtml.value instanceof HTMLElement) {
        const head =
          (tableRootHtml.value.querySelector('.table-head') as HTMLElement) ||
          undefined // .table-head
        const body =
          (tableRootHtml.value.querySelector(
            '.sec-body .ant-table'
          ) as HTMLElement) || undefined
        return { head, body }
      }
      return {}
    }

    const setSeparateHeight = () => {
      const { head, body } = bodyHeadDom()
      if (head && body) {
        // 可能需要再减去横向滚动条的高度
        // 这里的body实际上是head和body没有分离的情况
        separateHeight.value =
          props.maxHeight > 0 &&
          body.clientHeight - head.clientHeight > props.maxHeight
        console.log('separateHeight', separateHeight.value)
      }
    }

    // 设置每一列的宽度，计算table总宽度
    const setColumnsWidth = () => {
      const { head, body } = bodyHeadDom()
      if (head && body) {
        const containerWidth = body.clientWidth
        // partition lodash方法，用来把对象按照是否有特定的值分组
        const [hasWidthColumns, noWidthColumns] = partition(
          props.columns,
          'width'
        )
        // sumBy lodash方法，把对象中的某个属性相加
        const colCountWidth = sumBy(hasWidthColumns, 'width')
        const restWidth = Math.max(0, containerWidth - colCountWidth)
        const restAverageWidth = restWidth / (noWidthColumns.length || 1)
        props.columns.forEach(col => {
          let width = col.width || 0
          if (typeof col.width !== 'number') {
            width = restAverageWidth
            if (col.minWidth) {
              width = Math.max(col.minWidth, width)
            }
            if (col.maxWidth) {
              width = Math.min(col.maxWidth, width)
            }
          }
          col.width = width
        })
        tableWidth.value = sumBy(props.columns, 'width')
      }
    }

    const updateScrollBoundary = (state: IsReachBoundary) => {
      for (let a = 0; a < state.length; a++) {
        if (state[a] !== scrollBoundary.value[a]) {
          scrollBoundary.value = state
          const boundary = state[0] ? 'left' : state[1] ? 'right' : 'middle'
          rootCls.value = `${baseCls} ${scrollBaseCls + boundary}`
          break
        }
      }
    }

    const handleBodyScroll = (event: Event) => {
      const target = event.target as HTMLElement
      const direction = ScrollServe.getDirection(target)
      if (direction === 'horizontal') {
        const headSec = tableRootHtml.value?.querySelector(
          '.sec-header'
        ) as HTMLElement
        updateScrollBoundary(ScrollServe.hasReachBoundary(target, direction))
        if (headSec) {
          ScrollServe.setScroll(headSec, target.scrollLeft, false)
        }
      }
    }

    const bodyStyle = computed(() => {
      const result: {
        maxHeight?: string
        overflow?: string
      } = { overflow: 'auto' }
      if (separateHeight.value) {
        result.maxHeight = props.maxHeight + 'px'
      }
      return result
    })

    const hfStyle = computed(() => {
      const result: {
        overflow?: string
      } = { overflow: 'hidden' }
      if (separateHeight.value) {
        result.overflow += ' scroll'
      }
      return result
    })

    const colStyleWithCls = computed<Partial<ColStyleWithCls>[]>(() => {
      const base = 'table-cell'
      // lodash 方法
      const leftEdgeFixedIndex = findLastIndex(props.columns, { fixed: 'left' })
      const rightEdgeFixedIndex = findIndex(props.columns, { fixed: 'right' })
      return props.columns.map((col, index) => {
        let style = {}
        let cls = base
        if (col.fixed) {
          cls += ' fixed'
          style = getColStyle(props.columns, index, tableWidth.value)
          if (index === leftEdgeFixedIndex || index === rightEdgeFixedIndex) {
            cls += ' fixed-' + col.fixed
          }
        }
        return { style, cls }
      })
    })

    const init = async () => {
      tableData.value = props.data
      await nextTick()
      setSeparateHeight()
      setColumnsWidth()
    }

    onMounted(() => {
      init()
    })
    watch(
      () => props.data,
      () => {
        init()
      }
    )

    // colgroup 可以设置每一列的宽度
    const renderColgroup = (): JSX.Element[] => {
      return props.columns.map((col, index) => {
        return (
          <colgroup>
            <col key={tableRowKey(col, index)} width={col.width} />
          </colgroup>
        )
      })
    }

    return () => (
      <div class={rootCls.value} ref={tableRootHtml}>
        <div class="ant-tables">
          {separateHeight.value && (
            <div class="ant-table-section sec-header" style={hfStyle.value}>
              <table
                class="ant-table"
                cellspacing="0"
                style={{
                  width: tableWidth.value + 'px',
                  marginTop: 0,
                  marginBottom: 0
                }}
              >
                {/* table-layout
                table-layout: fixed; 如果空间足够，每一列均匀分配可用空间；
                如果空间不足，fixed会保证按照给定宽度分配空间，允许横向滚动。
                如果是auto，则不会出现滚动条
              */}
                {renderColgroup()}
                <ZTableThead
                  columns={props.columns}
                  colStyleWithCls={colStyleWithCls.value}
                />
              </table>
            </div>
          )}

          <div
            class="ant-table-section sec-body"
            style={bodyStyle.value}
            onScroll={handleBodyScroll}
          >
            <table
              class="ant-table"
              cellspacing="0"
              style={{
                width: tableWidth.value + 'px',
                marginTop: 0,
                marginBottom: 0
              }}
            >
              {renderColgroup()}
              {!separateHeight.value && (
                <ZTableThead
                  columns={props.columns}
                  colStyleWithCls={colStyleWithCls.value}
                />
              )}
              <ZTableTbody
                columns={props.columns}
                data={tableData.value}
                rowKey={props.rowKey}
                colStyleWithCls={colStyleWithCls.value}
              />
            </table>
          </div>
        </div>
      </div>
    )
  }
})
