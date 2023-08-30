import { BlockchainNetworkId, getNativeTokenSymbol } from '@/components/const/const';
import coqIcon from '@/assets/img/ankr.svg';
import apeIcon from '@/assets/img/ankr.svg';
import baseIcon from '@/assets/img/base.svg';
import lineaIcon from '@/assets/img/linea.svg';
import { NetworkConfig } from '@/model/network';

export type ChainType =
  | BlockchainNetworkId.ankrTest
  | BlockchainNetworkId.basMainnet
  | BlockchainNetworkId.baseMainnet
  | BlockchainNetworkId.baseTestnet
  | BlockchainNetworkId.lineaMainnet
  | BlockchainNetworkId.lineaTestnet;

const baseEnv = import.meta.env.MODE;

export const getNetworkList = (): NetworkConfig[] => {
  if (baseEnv === 'dev') {
    return [
      {
        icon: <img style={{ height: 40, width: 40 }} src={coqIcon} alt="" />,
        name: 'Coq Testnet',
        symbol: getNativeTokenSymbol(BlockchainNetworkId.ankrTest),
        networkId: BlockchainNetworkId.ankrTest,
      },
      {
        icon: <img style={{ height: 40, width: 40 }} src={baseIcon} alt="" />,
        name: 'Base Testnet',
        symbol: getNativeTokenSymbol(BlockchainNetworkId.baseTestnet),
        networkId: BlockchainNetworkId.baseTestnet,
      },
      {
        icon: <img style={{ height: 40, width: 40 }} src={lineaIcon} alt="" />,
        name: 'Lines Testnet',
        symbol: getNativeTokenSymbol(BlockchainNetworkId.lineaTestnet),
        networkId: BlockchainNetworkId.lineaTestnet,
      },
    ];
  } else if (baseEnv === 'production') {
    return [
      {
        icon: <img style={{ height: 40, width: 40 }} src={apeIcon} alt="" />,
        name: 'Ape Chain',
        symbol: getNativeTokenSymbol(BlockchainNetworkId.basMainnet),
        networkId: BlockchainNetworkId.basMainnet,
      },
      {
        icon: <img style={{ height: 40, width: 40 }} src={baseIcon} alt="" />,
        name: 'Base Mainnet',
        symbol: getNativeTokenSymbol(BlockchainNetworkId.baseMainnet),
        networkId: BlockchainNetworkId.baseMainnet,
      },
      {
        icon: <img style={{ height: 40, width: 40 }} src={lineaIcon} alt="" />,
        name: 'Lines Mainnet',
        symbol: getNativeTokenSymbol(BlockchainNetworkId.lineaMainnet),
        networkId: BlockchainNetworkId.lineaMainnet,
      },
    ];
  } else {
    return [];
  }
};

export const getNetworkById = (id: BlockchainNetworkId): NetworkConfig => {
  if (getNetworkList()) {
    for (let i = 0; i < getNetworkList().length; i++) {
      if (getNetworkList()[i].networkId === id) {
        return getNetworkList()[i];
      }
    }
  } else {
    return {} as NetworkConfig;
  }
  return {} as NetworkConfig;
};

export const getNetworkByName = (name: string): NetworkConfig => {
  if (getNetworkList()) {
    for (let i = 0; i < getNetworkList().length; i++) {
      if (getNetworkList()[i].name === name) {
        return getNetworkList()[i];
      }
    }
  } else {
    return {} as NetworkConfig;
  }
  return {} as NetworkConfig;
};
