import { withInstall } from '@hk-libs/utils/with-install'
import _Message from './src/index'


const Message = withInstall(_Message)

// Icon 可以通过app.use来使用，也可以通过import方式单独使用
export default Message

// 这里添加的类型可以在模板里解析
declare module 'vue' {
  export interface GlobalComponents { // 同名接口可以自动合并
    ZMessage: typeof Message
  }
}