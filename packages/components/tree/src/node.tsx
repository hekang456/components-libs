import { computed, defineComponent, PropType, Slot } from 'vue'
import { RequiredTreeNodeOptions, TreeNodeOptions } from './types'

export default defineComponent({
  name: 'ZTreeNode',
  props: {
    node: {
      type: Object as PropType<RequiredTreeNodeOptions>,
      required: true
    },
    showCheckbox: {
      type: Boolean,
      default: false
    },
    checkStrictly: {
      // 是否严格，默认不严格，即父子联动
      type: Boolean,
      default: false
    },
    onToggleExpand: Function as PropType<
      (arg: RequiredTreeNodeOptions) => void
    >,
    onSelectChange: Function as PropType<
      (arg: RequiredTreeNodeOptions) => void
    >,
    onCheckChange: Function as PropType<
      (arg: [boolean, RequiredTreeNodeOptions]) => void
    >,
    render: Function as PropType<(node: TreeNodeOptions) => JSX.Element>,
    iconSlot: Function as PropType<Slot>
  },
  emits: ['toggle-expand', 'select-change', 'check-change'],
  setup(props, { emit, expose }) {
    // eslint-disable-next-line vue/no-setup-props-destructure
    const { node, render, iconSlot, showCheckbox, checkStrictly } = props
    const textCls = computed(() => {
      let res = 'node-title'
      if (node.selected && !showCheckbox) {
        res += ' selected'
      }
      if (node.disabled) {
        res += ' disabled'
      }
      return res
    })
    const halfChecked = computed(() => {
      let result = false
      if (!checkStrictly && node.children) {
        const checkedChildren = node.children.filter(child => child.checked)
        if (
          checkedChildren.length > 0 &&
          checkedChildren.length < node.children.length
        ) {
          result = true
        }
      }
      return result
    })
    const handleExpand = () => {
      emit('toggle-expand', props.node)
    }
    const handleSelected = (event: MouseEvent) => {
      event.stopPropagation() // 取消冒泡的展开事件
      if (!node.disabled) {
        emit('select-change', props.node)
      }
    }
    const handleCheckChange = (checked: boolean) => {
      emit('check-change', [checked, props.node])
    }

    const renderArrow = (): JSX.Element => {
      return (
        <div class={['node-arrow', node.expanded ? 'expanded' : '']}>
          {node.hasChildren ? (
            iconSlot ? (
              iconSlot(node.loading)
            ) : node.loading ? (
              <i class="iconfont iconloading ico-loading" />
            ) : (
              <i class="iconfont iconExpand" />
            )
          ) : null}
        </div>
      )
    }
    const renderNormalContent = (): JSX.Element => {
      return render ? (
        render(node)
      ) : (
        <span class={textCls.value}>{node.name}</span>
      )
    }
    const renderContent = (): JSX.Element => {
      console.log(showCheckbox)

      if (showCheckbox) {
        return (
          <z-checkbox
            class="node-content node-checkbox"
            disabled={node.disabled}
            modelValue={node.checked}
            halfChecked={halfChecked.value}
            onChange={handleCheckChange}
          >
            {renderNormalContent()}
          </z-checkbox>
        )
      } else {
        return (
          <div class="node-content node-text" onClick={handleSelected}>
            {/* 样式包括选中和禁用等情况  */}
            {renderNormalContent()}
          </div>
        )
      }
    }

    expose({
      node,
      halfChecked: () => halfChecked.value
    })

    return () => (
      <div
        class="ant-tree-node"
        key={node.nodeKey}
        style={{ paddingLeft: node.level * 18 + 'px' }}
        onClick={handleExpand}
      >
        {renderArrow()}
        {renderContent()}
      </div>
    )
  }
})
