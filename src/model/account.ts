export interface AccountInfo {
  address: string;
  erc20AccountMap: Map<string, string>;
  nativeBalance: string;
  isMultisig: boolean;
}
