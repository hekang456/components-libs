import { App } from "vue";
import ZIcon from '@hk-libs/components/icon'
import ZButton from '@hk-libs/components/button'
import ZInput from '@hk-libs/components/input'
import ZTabs from '@hk-libs/components/tabs'
import ZTabPanel from '@hk-libs/components/tabPanel'
import ZCheckbox from '@hk-libs/components/checkBox'
import ZTree from '@hk-libs/components/tree'
import ZForm from '@hk-libs/components/form'
import ZVirtualList from '@hk-libs/components/virtualList'
import ZTransfer from '@hk-libs/components/transfer'
import ZTag from '@hk-libs/components/tag'
import ZPagination from '@hk-libs/components/pagination'
import ZRate from '@hk-libs/components/rate'
import ZTable from '@hk-libs/components/table'
import ZMessage from '@hk-libs/components/message'

const plugins = [
  ZIcon,
  ZButton,
  ZInput,
  ZTabs,
  ZTabPanel,
  ZCheckbox,
  ZTree,
  ZForm,
  ZVirtualList,
  ZTransfer,
  ZTag,
  ZPagination,
  ZRate,
  ZTable,
  ZMessage
]
export {
  ZIcon,
  ZButton,
  ZInput,
  ZTabs,
  ZTabPanel,
  ZCheckbox,
  ZTree,
  ZForm,
  ZVirtualList,
  ZTransfer,
  ZTag,
  ZPagination,
  ZRate,
  ZTable,
  ZMessage
}
export default function (app: App) {
  plugins.forEach(item => app.component(item.name, item));
}