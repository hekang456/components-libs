<template>
  <div class="ant-transfer">
    <z-transfer-panel :list="leftShowList">列表一</z-transfer-panel>
    <div class="ant-transfer-buttons">
      <div
        :class="['ant-button', { disabled: disableBtn('right') }]"
        @click="to('right')"
      >
        &gt;
      </div>
      <div
        :class="['ant-button', { disabled: disableBtn('left') }]"
        @click="to('left')"
      >
        &lt;
      </div>
    </div>
    <z-transfer-panel :list="rightShowList">列表二</z-transfer-panel>
  </div>
</template>
<script lang="ts" setup>
import { PropType, Ref, ref } from 'vue'
import { cloneDeep } from 'lodash'
import ZTransferPanel from './transfer-panel.vue'
import { TransferItem, KeyType, Direction } from './types'
defineOptions({
  name: 'ZTransfer'
})
const props = defineProps({
  data: {
    type: Array as PropType<TransferItem[]>,
    default: () => []
  },
  targetKeys: {
    type: Array as PropType<KeyType[]>,
    default: () => []
  }
})
const emit = defineEmits(['update:targetKeys'])
const leftShowList = ref<TransferItem[]>([])
const rightShowList = ref<TransferItem[]>([])

props.data.forEach(item => {
  item.disabled = item.disabled || false
  item.checked = item.checked || false
  if (props.targetKeys.includes(item.key)) {
    rightShowList.value.push(item)
  } else {
    leftShowList.value.push(item)
  }
})

const trueMove = (
  fromList: Ref<TransferItem[]>,
  toList: Ref<TransferItem[]>
) => {
  const moveList = cloneDeep(fromList.value.filter(item => item.checked))
  moveList.forEach(item => (item.checked = false))
  fromList.value = fromList.value.filter(item => !item.checked)
  toList.value = toList.value.concat(moveList)
}

const to = (direction: Direction) => {
  if (direction === 'right') {
    trueMove(leftShowList, rightShowList)
  } else {
    trueMove(rightShowList, leftShowList)
  }
  const remainKeys: KeyType[] = []
  rightShowList.value.map(item => remainKeys.push(item.key))
  emit('update:targetKeys', remainKeys)
}

const disableBtn = (direction: Direction) => {
  const targetDatas = direction === 'left' ? rightShowList : leftShowList
  return targetDatas.value.findIndex(item => item.checked) === -1
}
</script>
<style lang="scss">
.ant-transfer {
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;

  .ant-transfer-panel {
    border: 1px solid #ebeef5;
    border-radius: 4px;
    overflow: hidden;
    background: #fff;
    display: inline-block;
    vertical-align: middle;
    width: 200px;
    max-height: 100%;
    box-sizing: border-box;
    position: relative;

    .ant-transfer-panel-header {
      height: 40px;
      line-height: 40px;
      background: #f5f7fa;
      margin: 0;
      padding: 0 12px;
      border-bottom: 1px solid #ebeef5;
      box-sizing: border-box;
      color: #000;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .count {
        font-size: 12px;
        font-weight: 400;
        color: #909399;
      }
    }

    .ant-transfer-panel-body {
      height: 260px;
      overflow-y: auto;

      .content {
        .content-item {
          margin-top: 8px;
          margin-left: 12px;
          height: 22px;
          line-height: 22px;
        }
      }
    }
  }
  .ant-transfer-buttons {
    width: 100px;
    display: inline-flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .ant-button {
      width: 42px;
      height: 36px;
      line-height: 36px;
      margin: 12px 0;
      border-radius: 4px;
      color: #fff;
      background-color: #409eff;
      border-color: #409eff;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;

      &.disabled {
        background-color: #a0cfff;
        border-color: #a0cfff;
        cursor: not-allowed;
      }
    }
  }
}
</style>
