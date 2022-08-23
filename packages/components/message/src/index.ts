import { isFunction, isString } from "lodash"
import {  createVNode, isVNode, render, shallowReactive } from "vue"
import { MessageContext, MessageHandler, MessageOptions, MessageOptionsRequired, MessageParams } from "./types"
import MessageConstructor from './message.vue'


let seed = 1

const messageDefaults =  {
  customClass: '',
  center: false,
  dangerouslyUseHTMLString: false,
  duration: 3000,
  icon: '',
  id: '',
  message: '',
  onClose: undefined,
  showClose: false,
  type: 'info',
  offset: 16,
  zIndex: 2000,
  grouping: false,
  repeatNum: 1
} 

const normalizeOptions = (params?: MessageParams) => {
  const options: MessageOptions =
    !params || isString(params) || isVNode(params) || isFunction(params)
      ? { message: params as string }
      : params

  const normalized = {
    ...messageDefaults,
    ...options,
  }

  normalized.appendTo = document.body

  return normalized as MessageOptionsRequired
}


const instances: MessageContext[] = shallowReactive([])

export const getInstance = (id: string) => {
  const idx = instances.findIndex((instance) => instance.id === id)
  const current = instances[idx]
  let prev: MessageContext | undefined
  if (idx > 0) {
    prev = instances[idx - 1]
  }
  return { current, prev }
}

export const getLastOffset = (id: string): number => {
  const { prev } = getInstance(id)
  if (!prev) return 0
  return prev.vm.exposeProxy!.bottom
}

const closeMessage = (instance: MessageContext) => {
  const idx = instances.indexOf(instance)
  if (idx === -1) return

  instances.splice(idx, 1)
  const { handler } = instance
  handler.close()
}


const createMessage = (options: MessageOptionsRequired) => {

  const id = `message_${seed++}`
  const userOnClose = options.onClose

  const container = document.createElement('div')

  const props = {
    ...options,
    zIndex: 100 + options.zIndex,
    id,
    onClose: () => {      
      userOnClose?.()
      closeMessage(instance)
    },

    onDestroy: () => {
      render(null, container)
    },
  }
  const vnode = createVNode(
    MessageConstructor,
    props,
    isFunction(props.message) || isVNode(props.message)
      ? { default: props.message }
      : null
  )

  render(vnode, container)
  // instances will remove this item when close function gets called. So we do not need to worry about it.
  options.appendTo.appendChild(container.firstElementChild!)

  const vm = vnode.component!

  const handler: MessageHandler = {
    // instead of calling the onClose function directly, setting this value so that we can have the full lifecycle
    // for out component, so that all closing steps will not be skipped.
    close: () => {
      vm.exposeProxy!.visible = false
    },
  }

  const instance: MessageContext = {
    id,
    vnode,
    vm,
    handler,
    props: (vnode.component as any).props,
  }

  return instance
}


const message = (options = {}) => {

  const normalized = normalizeOptions(options)

  if (normalized.grouping && instances.length) {
    const instance = instances.find(
      ({ vnode: vm }) => vm.props?.message === normalized.message
    )
    if (instance) {
      instance.props.repeatNum += 1
      instance.props.type = normalized.type
      return instance.handler
    }
  }

  const instance = createMessage(normalized)

  instances.push(instance)
  return instance.handler
}
export default message
