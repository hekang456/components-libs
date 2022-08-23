import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import DefineOptions from 'unplugin-vue-define-options/vite'
import VueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), DefineOptions(), VueJsx(),],
  // css: {
  //   //css预处理
  //   preprocessorOptions: {
  //     scss: {
  //       additionalData: '@import "@hk-libs/theme-chalk/src/styles/variable.scss";'
  //     }
  //   }
  // }
})
