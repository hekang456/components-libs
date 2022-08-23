import { createApp } from 'vue'
import App from './App.vue'

import '@hk-libs/theme-chalk/src/index.scss'
import '@hk-libs/theme-chalk/src/styles/index.scss'
import libs from '@hk-libs/components/index'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(libs)
app.mount('#app')
