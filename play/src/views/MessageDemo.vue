<template>
  <z-button @click="handleClick('info', true)">info</z-button>&nbsp;
  <z-button @click="handleClick('success', true)">success</z-button>&nbsp;
  <z-button @click="handleClick('warning', true)">warning</z-button>&nbsp;
  <z-button @click="handleClick('error', true)">error</z-button>&nbsp;
  <z-button @click="handleClick('info', false)">no close</z-button>
</template>

<script setup lang="ts">
import message from '@hk-libs/components/message/src/index'
import { MessageType } from '@hk-libs/components/message/src/types'

defineOptions({
  name: 'MessageDemo'
})
const handleClick = (type: MessageType, showClose: boolean) => {
  message({
    type,
    message: 'this is a message',
    showClose: showClose
  })
}
</script>
