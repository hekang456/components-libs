import { withInstall } from '@hk-libs/utils/with-install'
import _Tree from './src/tree'


const Tree = withInstall(_Tree)

// Icon 可以通过app.use来使用，也可以通过import方式单独使用
export default Tree

// 这里添加的类型可以在模板里解析
declare module 'vue' {
  export interface GlobalComponents { // 同名接口可以自动合并
    ZTree: typeof Tree
  }
}