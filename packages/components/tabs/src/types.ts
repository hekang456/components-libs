const TabKey = 'tabkey'
type KeyType = string | number
interface PropsOptions {
  label: string | number;
  name: string | number;
}
interface TabPanelCxt {
  props: PropsOptions
}

export {TabKey, TabPanelCxt, KeyType}