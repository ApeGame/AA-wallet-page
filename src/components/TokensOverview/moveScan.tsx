import { getCurrentNetwork } from '@/utils/localStorage';
import { BlockchainNetworkId, getTransactionScanLink, getUserOperationScanLink } from '@/components/const/const';

export const moveToBlockScan = (hash: string) => {
  if (getCurrentNetwork() === 'Base') {
    return getTransactionScanLink(BlockchainNetworkId.baseTestnet, hash);
  } else if (getCurrentNetwork() === 'Linea') {
    return getTransactionScanLink(BlockchainNetworkId.lineaTestnet, hash);
  } else if (getCurrentNetwork() === 'Coq Testnet') {
    return getTransactionScanLink(BlockchainNetworkId.ankrTest, hash);
  }
};

export const moveToUserOperationScan = (hash: string) => {
  if (getCurrentNetwork() === 'Base') {
    return getUserOperationScanLink(BlockchainNetworkId.baseTestnet, hash);
  } else if (getCurrentNetwork() === 'Linea') {
    return getUserOperationScanLink(BlockchainNetworkId.lineaTestnet, hash);
  } else if (getCurrentNetwork() === 'Coq Testnet') {
    return getUserOperationScanLink(BlockchainNetworkId.ankrTest, hash);
  }
};
