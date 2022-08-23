import { ComponentInternalInstance, VNode } from "vue";

export type MessageType = 'info' | 'success' | 'warning' | 'error'

export interface MessageProps {
  customClass: string;
  center: boolean;
  dangerouslyUseHTMLString: boolean;
  duration: number;
  icon: string;
  id: string;
  message: string;
  onClose: () => void;
  showClose: boolean;
  type: string;
  offset: number;
  zIndex: number;
  grouping: boolean;
  repeatNum: number;
  appendTo: HTMLElement;
}

export type MessageOptions = Partial<Omit<MessageProps, 'id'>>
export type MessageOptionsRequired = Required<MessageOptions>
export type MessageParams = MessageOptions | MessageOptions['message']

export interface MessageHandler {
  close: () => void
}

export type MessageContext = {
  id: string
  vnode: VNode
  handler: MessageHandler
  vm: ComponentInternalInstance
  props: MessageProps
}