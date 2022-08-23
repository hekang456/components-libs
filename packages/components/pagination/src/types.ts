export type PageItemType = 'page' | 'prev' | 'next' | 'prev5' | 'next5';
export interface PageItem {
  type: PageItemType;
  num?: number;
  disabled?: boolean;
}
