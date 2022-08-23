<template>
  <div>
    <z-button :loading="buttonLoading" type="danger" @click="buttonClick">
      按钮
    </z-button>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
function useButton() {
  const buttonLoading = ref(true)
  onMounted(() => {
    setTimeout(() => {
      buttonLoading.value = false
    }, 2000)
  })
  const buttonClick = () => {
    alert('点击按钮')
  }
  return {
    buttonLoading,
    buttonClick
  }
}
export default defineComponent({
  name: 'ButtonDemo',
  setup() {
    return {
      ...useButton()
    }
  }
})
</script>
