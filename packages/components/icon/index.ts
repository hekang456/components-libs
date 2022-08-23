import { withInstall } from '@hk-libs/utils/with-install'
import _Icon from './src/icon.vue'


const Icon = withInstall(_Icon)

// Icon 可以通过app.use来使用，也可以通过import方式单独使用
export default Icon

export * from './src/icon'

// 这里添加的类型可以在模板里解析
declare module 'vue' {
  export interface GlobalComponents { // 同名接口可以自动合并
    ZIcon: typeof Icon
  }
}

