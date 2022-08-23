import { withInstall } from "@hk-libs/utils/with-install"
import _Form from "./src/form.vue"

const Form = withInstall(_Form)

export default Form

// 这里添加的类型可以在模板里解析
declare module 'vue' {
  export interface GlobalComponents { // 同名接口可以自动合并
    ZForm: typeof Form
  }
}

