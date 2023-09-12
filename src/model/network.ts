import { BlockchainNetworkId } from '@/components/const/const';

export interface NetworkInfo {
  name: string;
  symbol: string;
}

export interface NetworkConfig {
  icon: JSX.Element;
  name: string;
  symbol: string;
  networkId: BlockchainNetworkId;
}
