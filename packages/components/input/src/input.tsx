import { defineComponent } from "vue"
import './index.scss'

export default defineComponent({
  name: 'ZInput',
  inheritAttrs: false,
  props: {
    modelValue: {
      type: String,
      default: ''
    },
    type: {
      validator: (value: string) => {
        return ['text', 'password', 'number', 'tel', 'textarea', 'time'].includes(value)
      },
      default: 'text'
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit, attrs }) {
    const onInput = (e: Event) => {
      const value = (e.target as HTMLInputElement).value
      if (value !== props.modelValue) {
        emit('update:modelValue', value)
      }
    }
    return () => {
      return (
        <div class="ant-field-wrap">
          <input
            class="ant-field"
            type={props.type}
            value={props.modelValue}
            onInput={onInput}
            placeholder={attrs.placeholder as string || '请输入内容...'}
          />
        </div>
      )
    }
  }
})