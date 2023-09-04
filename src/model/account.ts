import { NftAsset } from './token';

export interface erc20Info {
  symbol: string;
  name: string;
  balance: string;
}

export interface AccountInfo {
  address: string;
  erc20AccountMap: Map<string, erc20Info>;
  erc721AccountMap: Map<string, NftAsset>;
  nativeBalance: string;
  isMultisig: boolean;
  isUpdate: boolean;
  name: string;
}
