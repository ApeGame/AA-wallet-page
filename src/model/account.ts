export interface erc20Info {
  symbol: string;
  name: string;
  balance: string;
}

export interface AccountInfo {
  address: string;
  erc20AccountMap: Map<string, erc20Info>;
  nativeBalance: string;
  isMultisig: boolean;
  isUpdate: boolean;
  name: string;
}
