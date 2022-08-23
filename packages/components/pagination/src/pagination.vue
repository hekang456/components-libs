<template>
  <div class="ant-page-wrap">
    <ul class="ant-pages">
      <li
        v-for="(item, i) in listOfPageItems"
        :key="item.type + i"
        :class="[
          'ant-page',
          { disabled: item.disabled, checked: item.num === pageNum }
        ]"
        @click="pageClick(item)"
      >
        <template v-if="item.type === 'prev'">
          <z-icon>
            <ArrowLeftBold />
          </z-icon>
        </template>
        <template v-else-if="item.type === 'prev5'">
          <z-icon>
            <MoreFilled />
          </z-icon>
        </template>
        <template v-else-if="item.type === 'page'">
          <span>{{ item.num }}</span>
        </template>
        <template v-else-if="item.type === 'next5'">
          <z-icon>
            <MoreFilled />
          </z-icon>
        </template>
        <template v-else-if="item.type === 'next'">
          <z-icon>
            <ArrowRightBold />
          </z-icon>
        </template>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { clamp } from 'lodash'
import { PageItem } from './types'

defineOptions({
  name: 'ZPagination'
})

const props = defineProps({
  total: {
    type: Number,
    default: 0
  },
  pageNum: {
    type: Number,
    default: 1
  },
  pageSize: {
    type: Number,
    default: 10
  }
})
const emit = defineEmits(['onPageChange'])
const lastNum = computed(() => Math.ceil(props.total / props.pageSize))
const listOfPageItems = ref<PageItem[]>([])

const generatePage = (start: number, end: number): PageItem[] => {
  const list: PageItem[] = []
  for (let i = start; i <= end; i++) {
    list.push({
      num: i,
      type: 'page'
    })
  }
  return list
}

const concatWithPrevNext = (
  listOfPage: PageItem[],
  pageNum: number,
  lastNum: number
): PageItem[] => {
  return [
    {
      type: 'prev',
      disabled: pageNum === 1
    },
    ...listOfPage,
    {
      type: 'next',
      disabled: pageNum === lastNum
    }
  ]
}

const getListOfPageItems = (pageNum: number, lastNum: number): PageItem[] => {
  if (lastNum <= 9) {
    return concatWithPrevNext(generatePage(1, lastNum), pageNum, lastNum)
  } else {
    let listOfRange: PageItem[] = []
    const firstPageItem = generatePage(1, 1)
    const lastPageItem = generatePage(lastNum, lastNum)
    const prev5Item: PageItem = { type: 'prev5' }
    const next5Item: PageItem = { type: 'next5' }

    if (pageNum < 4) {
      listOfRange = [...generatePage(2, 5), next5Item]
    } else if (pageNum > lastNum - 4) {
      listOfRange = [prev5Item, ...generatePage(lastNum - 4, lastNum - 1)]
    } else {
      listOfRange = [
        prev5Item,
        ...generatePage(pageNum - 2, pageNum + 2),
        next5Item
      ]
    }
    return concatWithPrevNext(
      [...firstPageItem, ...listOfRange, ...lastPageItem],
      pageNum,
      lastNum
    )
  }
}

const pageClick = (page: PageItem) => {
  const diff = {
    next: 1,
    prev: -1,
    next5: 5,
    prev5: -5
  }
  if (!page.disabled) {
    let newPageNum = props.pageNum
    if (page.type === 'page') {
      newPageNum = page.num!
    } else {
      newPageNum += diff[page.type]
    }
    emit('onPageChange', clamp(newPageNum, 1, lastNum.value))
  }
}

watch(
  props,
  newValue => {
    listOfPageItems.value = getListOfPageItems(newValue.pageNum, lastNum.value)
  },
  { immediate: true }
)
</script>
<style lang="scss">
li {
  list-style: none;
}
.ant-page-wrap {
  width: 100%;
  min-width: 436px;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;

  .ant-pages {
    display: flex;
    .ant-page {
      font-size: 16px;
      text-align: center;
      vertical-align: middle;
      color: #a3a3ac;
      width: 40px;
      height: 40px;
      line-height: 40px;
      background-color: #fff;
      border: 1px solid #e8e8e8;
      border-right: none;
      cursor: pointer;
      transition: all 0.2s;
      margin: 0;
      display: flex;
      align-items: center;
      justify-content: center;

      .z-icon {
        font-size: 24px;
        border: none;
      }

      a {
        display: block;
        height: 100%;
        width: 100%;
        color: inherit;
      }
      &:last-child {
        border-right: 1px solid #e8e8e8;
      }
      &:hover,
      &.checked {
        border: 1px solid #409eff;
        border-right: none;
        background-color: #409eff;
        color: #fff;
        &:last-child {
          border-right: 1px solid #e8e8e8;
        }
      }
      &.disabled {
        color: rgba(0, 0, 0, 0.25);
        background-color: #f5f5f5;
        border-color: #d9d9d9;
        cursor: not-allowed;
      }
    }
  }
  .ant-page-navigate {
    margin-left: 16px;
    .ant-input {
      width: 100px;
      border-right: none;
      border-radius: 0;
      vertical-align: -1px;
    }
    .ant-btn {
      padding: 13px 20px;
    }
  }
}
</style>
