import DefaultTheme from 'vitepress/theme'
/**
 * register-components.js使用脚本自动创建
 * // package.json
 * "scripts": {
    "register:components": "vitepress-rc"
    }
 */
// 插件的主题
import ZIcon from '@hk-libs/components/icon'
import ZButton from '@hk-libs/components/button'
import ZInput from '@hk-libs/components/input'
import ZCheckbox from '@hk-libs/components/checkBox'
import ZTree from '@hk-libs/components/tree'
import ZTabs from '@hk-libs/components/tabs'
import ZTabPanel from '@hk-libs/components/tabPanel'
import ZVirtualList from '@hk-libs/components/virtualList'
import ZTransfer from '@hk-libs/components/transfer'
import ZTag from '@hk-libs/components/tag'
import ZPagination from '@hk-libs/components/pagination'
import ZRate from '@hk-libs/components/rate'
import ZTable from '@hk-libs/components/table'
import ZMessage from '@hk-libs/components/message'
import '@hk-libs/theme-chalk/src/index.scss'

import * as ElementPlusIconsVue from '@element-plus/icons-vue'




const components = [
  ZIcon,
  ZButton,
  ZInput,
  ZCheckbox,
  ZTree,
  ZTabs,
  ZTabPanel,
  ZVirtualList,
  ZTransfer,
  ZTag,
  ZPagination,
  ZRate,
  ZTable,
  ZMessage
]

export default {
  ...DefaultTheme,
  enhanceApp ({ app }) {
    components.forEach(item => {
      app.use(item)
    })
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component)
    }
  }
  // enhanceApp ({ app }) {
  //   app.use(ZIcon) // 在vitepress中注册全局组件
  //   app.use(ZInput)
  // }
}