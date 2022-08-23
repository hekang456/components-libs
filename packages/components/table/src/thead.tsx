import { defineComponent, PropType } from 'vue'
import { tableRowKey } from './helper'
import { ColStyleWithCls, ColumnOptions } from './types'

export default defineComponent({
  name: 'ZTableThead',
  props: {
    columns: {
      type: Array as PropType<ColumnOptions[]>,
      default: () => []
    },
    colStyleWithCls: {
      type: Array as PropType<Partial<ColStyleWithCls>[]>,
      default: () => []
    }
  },
  setup(props) {
    return () => (
      <thead class="table-head">
        {/* colgroup
      如果总宽度大于col的width的和，那么width代表了每一列的比例
      如果总宽度不足，那么每一列的width就是实际宽度
     */}
        {/* <colgroup>
          <col width="300" />
          <col width="300" />
          <col width="300" />
        </colgroup> */}
        <tr class="table-row">
          {props.columns.map((col, index) => {
            return (
              // position: sticky
              // left: 0
              // 可以让某一列粘在左边距为0的位置
              <th
                class={props.colStyleWithCls[index].cls}
                style={props.colStyleWithCls[index].style}
                key={tableRowKey(col, index)}
              >
                <span class="cell-text">{col.title}</span>
              </th>
            )
          })}
        </tr>
      </thead>
    )
  }
})
