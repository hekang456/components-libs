<template>
  <z-table :columns="columns" :data="data" row-key="id" :max-height="300" />
</template>

<script setup lang="tsx">
import { onMounted, ref } from 'vue'
import { TableData } from '@hk-libs/components/table/src/types'
import { genTableData, genColumns } from '@hk-libs/components/table/src/mock'

defineOptions({
  name: 'TableDemo'
})

const data = ref<TableData[]>([])
const columns = genColumns()

onMounted(() => {
  data.value = genTableData(20)
})
</script>
