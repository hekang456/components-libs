<template>
  <div>
    <div v-show="props.name === name" class="panel">
      <slot></slot>
    </div>
  </div>
</template>
<script setup lang="ts">
import { inject, Ref } from 'vue'
import { KeyType, TabKey } from './types'
defineOptions({
  name: 'ZTabPanel'
})
const props = defineProps({
  name: {
    type: [String, Number],
    required: true
  }
})
const name = inject<Ref<KeyType>>(TabKey)
</script>
