import { BlockchainNetworkId, getNativeTokenSymbol } from '@/components/const/const';
import coqIcon from '@/assets/img/ankr.svg';
// import apeIcon from '@/assets/img/ankr.svg';
import baseIcon from '@/assets/img/base.svg';
import lineaIcon from '@/assets/img/linea.svg';
import { NetworkConfig } from '@/model/network';
import { getCurrentNetwork, setCurrentNetworkName } from '@/utils/localStorage';

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
        icon: <img style={{ height: '100%', width: '100%' }} src={coqIcon} alt="" />,
        name: 'Coq Testnet',
        symbol: getNativeTokenSymbol(BlockchainNetworkId.ankrTest),
        networkId: BlockchainNetworkId.ankrTest,
      },
      {
        icon: <img style={{ height: '100%', width: '100%' }} src={baseIcon} alt="" />,
        name: 'Base Testnet',
        symbol: getNativeTokenSymbol(BlockchainNetworkId.baseTestnet),
        networkId: BlockchainNetworkId.baseTestnet,
      },
      {
        icon: <img style={{ height: '100%', width: '100%' }} src={lineaIcon} alt="" />,
        name: 'Linea Testnet',
        symbol: getNativeTokenSymbol(BlockchainNetworkId.lineaTestnet),
        networkId: BlockchainNetworkId.lineaTestnet,
      },
    ];
  } else if (baseEnv === 'production') {
    return [
      // {
      //   icon: <img style={{ height: '100%', width: '100%' }} src={apeIcon} alt="" />,
      //   name: 'Ape Chain',
      //   symbol: getNativeTokenSymbol(BlockchainNetworkId.basMainnet),
      //   networkId: BlockchainNetworkId.basMainnet,
      // },
      {
        icon: <img style={{ height: '100%', width: '100%' }} src={lineaIcon} alt="" />,
        name: 'Linea Mainnet',
        symbol: getNativeTokenSymbol(BlockchainNetworkId.lineaMainnet),
        networkId: BlockchainNetworkId.lineaMainnet,
      },
      {
        icon: <img style={{ height: '100%', width: '100%' }} src={baseIcon} alt="" />,
        name: 'Base Mainnet',
        symbol: getNativeTokenSymbol(BlockchainNetworkId.baseMainnet),
        networkId: BlockchainNetworkId.baseMainnet,
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

export const setDefaultNetwork = () => {
  setCurrentNetworkName(getNetworkList()[0].name);
};

export const getCurrentNetworkWithStorage = (): NetworkConfig => {
  if (getCurrentNetwork()) {
    if (getNetworkByName(getCurrentNetwork()).name) {
      return getNetworkByName(getCurrentNetwork());
    } else {
      setCurrentNetworkName(getNetworkList()[0].name);
      return getNetworkByName(getCurrentNetwork());
    }
  } else {
    setCurrentNetworkName(getNetworkList()[0].name);
    return getNetworkByName(getCurrentNetwork());
  }
};
