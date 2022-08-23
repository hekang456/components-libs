export type Direction = 'left' | 'right';
export interface TransferItem {
  checked?: boolean;
  key: string;
  value: string;
  disabled?: boolean;
}

export type KeyType = number | string
