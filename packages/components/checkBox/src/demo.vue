<template>
  <div class="demo-box">
    <div class="form-item" style="width: 206px">
      value: {{ value }}
      <z-checkbox v-model="value" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent({
  name: 'CheckboxDemo',
  setup(props, context) {
    const value = ref(false)
    return {
      value
    }
  }
})
</script>
