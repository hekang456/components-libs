<template>
  <div class="demo-box">
    <z-tabs v-model="activeName">
      <z-tab-panel label="用户管理" name="tabOne">
        content 用户管理
      </z-tab-panel>
      <z-tab-panel label="角色管理" name="tabTwo">
        content 角色管理
      </z-tab-panel>
      <z-tab-panel label="配置管理" name="tabThree">
        content 配置管理
      </z-tab-panel>
    </z-tabs>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
defineOptions({
  name: 'TabsDemo'
})

const activeName = ref('tabTwo')
watch(
  activeName,
  newValue => {
    console.log(newValue)
  },
  { immediate: true }
)
</script>
