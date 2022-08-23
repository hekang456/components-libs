import { defineComponent, PropType } from 'vue'
import { tableRowKey } from './helper'
import { ColStyleWithCls, ColumnOptions, TableData } from './types'

export default defineComponent({
  name: 'ZTableTbody',
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
    colStyleWithCls: {
      type: Array as PropType<Partial<ColStyleWithCls>[]>,
      default: () => []
    }
  },
  setup(props) {
    return () => (
      <thead class="table-body">
        {props.data.map(row => {
          return (
            <tr class="table-row" key={row[props.rowKey]}>
              {props.columns.map((col, cIndex) => {
                return (
                  // align 可以控制每一列的对齐方式
                  <td
                    align="center"
                    class={props.colStyleWithCls[cIndex].cls}
                    style={props.colStyleWithCls[cIndex].style}
                    key={tableRowKey(col, cIndex)}
                  >
                    <span class="cell-text">{row[col['key']]}</span>
                  </td>
                )
              })}
            </tr>
          )
        })}
      </thead>
    )
  }
})
