import { getCurrentNetwork } from '@/utils/localStorage';
import { BlockchainNetworkId, getTransactionScanLink, getUserOperationScanLink } from '@/components/const/const';

export const moveToBlockScan = (hash: string) => {
  if (getCurrentNetwork() === 'Base Testnet') {
    return getTransactionScanLink(BlockchainNetworkId.baseTestnet, hash);
  } else if (getCurrentNetwork() === 'Linea Testnet') {
    return getTransactionScanLink(BlockchainNetworkId.lineaTestnet, hash);
  } else if (getCurrentNetwork() === 'Coq Testnet') {
    return getTransactionScanLink(BlockchainNetworkId.ankrTest, hash);
  } else if (getCurrentNetwork() === 'Base Mainnet') {
    return getTransactionScanLink(BlockchainNetworkId.baseMainnet, hash);
  } else if (getCurrentNetwork() === 'Linea Mainnet') {
    return getTransactionScanLink(BlockchainNetworkId.lineaMainnet, hash);
  }
};

export const moveToUserOperationScan = (hash: string) => {
  if (getCurrentNetwork() === 'Base Testnet') {
    return getUserOperationScanLink(BlockchainNetworkId.baseTestnet, hash);
  } else if (getCurrentNetwork() === 'Linea Testnet') {
    return getUserOperationScanLink(BlockchainNetworkId.lineaTestnet, hash);
  } else if (getCurrentNetwork() === 'Coq Testnet') {
    return getUserOperationScanLink(BlockchainNetworkId.ankrTest, hash);
  } else if (getCurrentNetwork() === 'Base Mainnet') {
    return getUserOperationScanLink(BlockchainNetworkId.baseMainnet, hash);
  } else if (getCurrentNetwork() === 'Linea Mainnet') {
    return getUserOperationScanLink(BlockchainNetworkId.lineaMainnet, hash);
  }
};
