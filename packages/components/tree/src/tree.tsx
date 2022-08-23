import { defineComponent, PropType, ref, watch } from 'vue'
import { cloneDeep } from 'lodash'
import {
  nodeKey,
  RequiredTreeNodeOptions,
  TreeNodeInstance,
  TreeNodeOptions
} from './types'
import './index.scss'
import ZTreeNode from './node'
import { updateDownwards, updateUpwards } from './utils'

export default defineComponent({
  name: 'ZTree',
  props: {
    source: {
      type: Array as PropType<TreeNodeOptions[]>,
      default: () => []
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
    lazyLoad: Function as PropType<
      (
        node: RequiredTreeNodeOptions,
        callback: (children: TreeNodeOptions[]) => void
      ) => void
    >,
    render: Function as PropType<(node: TreeNodeOptions) => JSX.Element>
  },
  emits: ['select-change', 'check-change'],
  setup(props, { emit, slots, expose }) {
    const flatList = ref<RequiredTreeNodeOptions[]>([])
    const loading = ref(false)
    const selectedKey = ref<nodeKey>('')
    const nodeRefs = ref<TreeNodeInstance[]>([])
    const setNodesRef = (index: number, node: TreeNodeInstance) => {
      if (node) {
        nodeRefs.value[index] = node
      }
    }
    const flattenTree = (
      source: TreeNodeOptions[]
    ): RequiredTreeNodeOptions[] => {
      const result: RequiredTreeNodeOptions[] = []
      const recursion = (
        list: TreeNodeOptions[],
        level = 0,
        parent: RequiredTreeNodeOptions | null
      ): RequiredTreeNodeOptions[] => {
        return list.map(item => {
          const node: RequiredTreeNodeOptions = {
            nodeKey: item.nodeKey,
            name: item.name,
            level,
            loading: false,
            disabled: item.disabled || false,
            expanded: item.expanded || false,
            selected: item.selected || false,
            checked: item.checked || parent?.checked || false,
            hasChildren: item.hasChildren || false,
            children: item.children || [],
            parentKey: parent?.nodeKey || null
          }
          if (node.selected) {
            selectedKey.value = node.nodeKey
          }
          result.push(node)
          if (node.expanded && node.children.length) {
            node.children = recursion(node.children, level + 1, node)
          }
          return node
        })
      }
      if (source.length) {
        recursion(source, 0, null)
      }
      return result
    }
    const expandNode = (
      node: RequiredTreeNodeOptions,
      children: TreeNodeOptions[] = []
    ) => {
      const cloneNode = children.length ? children : cloneDeep(node.children)
      node.children = cloneNode.map(item => {
        return {
          nodeKey: item.nodeKey,
          name: item.name,
          level: item.level || node.level + 1,
          loading: false,
          disabled: item.disabled || false,
          expanded: item.expanded || false,
          selected: item.selected || false,
          checked: item.checked ?? node.checked,
          hasChildren: item.hasChildren || false,
          children: item.children || [],
          parentKey: node.nodeKey || null
        }
      })
      const targetIndex = flatList.value.findIndex(
        item => item.nodeKey === node.nodeKey
      )
      if (targetIndex > -1) {
        flatList.value.splice(
          targetIndex + 1,
          0,
          ...(node.children as RequiredTreeNodeOptions[])
        )
      }
    }
    const collapseNode = (node: RequiredTreeNodeOptions) => {
      const delKeys: nodeKey[] = []
      const recursion = (curNode: RequiredTreeNodeOptions) => {
        if (curNode.children.length) {
          curNode.children.forEach(item => {
            delKeys.push(item.nodeKey)
            if (item.expanded) {
              // 如果子节点也展开了
              item.expanded = false
              recursion(item as RequiredTreeNodeOptions)
            }
          })
        }
      }
      recursion(node)
      if (delKeys.length) {
        flatList.value = flatList.value.filter(
          item => !delKeys.includes(item.nodeKey)
        )
      }
    }
    const handleToggleExpand = (node: RequiredTreeNodeOptions) => {
      if (loading.value) return // loading期间，不响应点击事件
      node.expanded = !node.expanded
      if (node.expanded) {
        // 展开
        if (node.children.length) {
          // 首次展开可能是用户自带的，需要格式化
          expandNode(node)
        } else {
          // 懒加载
          if (props.lazyLoad && node.hasChildren) {
            node.loading = true // 控制图标啊
            loading.value = true // 防止重复点击
            props.lazyLoad(node, children => {
              if (children.length) {
                expandNode(node, children)
              }
              node.loading = false
              loading.value = false
            })
          } else {
            // 用户没有给回调，那就永远无法有children
            node.expanded = !node.expanded
          }
        }
      } else {
        // 收起
        collapseNode(node)
      }
    }
    const handleSelectChange = (node: RequiredTreeNodeOptions) => {
      node.selected = !node.selected
      // 默认是单选，因此点到选中的节点，把选中效果取消，点的不同的节点，更换选中的节点
      let newSelectKey: nodeKey = ''
      if (selectedKey.value !== node.nodeKey) {
        const preSelectedIndex = flatList.value.findIndex(
          item => item.nodeKey === selectedKey.value
        )
        if (preSelectedIndex > -1) {
          flatList.value[preSelectedIndex].selected = false
        }
        newSelectKey = node.nodeKey
      }
      selectedKey.value = newSelectKey
      // 发射给用户一个事件，拿到选中的节点
      emit('select-change', selectedKey.value)
    }
    const handleCheckChange = ([checked, node]: [
      boolean,
      RequiredTreeNodeOptions
    ]) => {
      node.checked = checked
      if (!props.checkStrictly) {
        // 父子联动
        updateDownwards(checked, node)
        updateUpwards(node, flatList.value)
      }
      emit('check-change', node)
    }
    // 每次source改变，都要重新拍平整棵树
    watch(
      () => props.source,
      newValue => {
        flatList.value = flattenTree(newValue)
      },
      { immediate: true }
    )

    expose({
      getSelectedNode: (): RequiredTreeNodeOptions | undefined => {
        return flatList.value.find(item => item.selected)
      },
      getCheckedNodes: (): RequiredTreeNodeOptions[] => {
        return flatList.value.filter(item => item.checked)
      },
      getHalfCheckedNodes: (): RequiredTreeNodeOptions[] => {
        return nodeRefs.value
          .filter(item => item.halfChecked())
          .map(item => item.node)
      }
    })
    return () => (
      <div class="ant-tree-wrap">
        <div class="ant-tree">
          {flatList.value.map((node, index) => {
            return (
              <ZTreeNode
                node={node}
                key={node.nodeKey}
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                ref={setNodesRef.bind(null, index)}
                render={props.render}
                iconSlot={slots.icon}
                showCheckbox={props.showCheckbox}
                checkStrictly={props.checkStrictly}
                onToggleExpand={handleToggleExpand}
                onSelectChange={handleSelectChange}
                onCheckChange={handleCheckChange}
              />
            )
          })}
        </div>
      </div>
    )
  }
})
