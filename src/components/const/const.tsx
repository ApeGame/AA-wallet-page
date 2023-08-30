export enum BlockchainNetworkId {
  ankrTest = 12077,
  basMainnet = 16350,
  baseTestnet = 84531,
  baseMainnet = 8453,
  lineaTestnet = 59140,
  lineaMainnet = 59144,
}

const BlockChainExplorerAddress: {
  [key in BlockchainNetworkId]: string;
} = {
  [BlockchainNetworkId.ankrTest]: 'https://testnetscan.ankr.com',
  [BlockchainNetworkId.basMainnet]: 'https://explorer.bas.metaapesgame.com',

  [BlockchainNetworkId.baseTestnet]: 'https://goerli.basescan.org',
  [BlockchainNetworkId.baseMainnet]: 'https://base.blockscout.com',

  [BlockchainNetworkId.lineaTestnet]: 'https://goerli.lineascan.build',
  [BlockchainNetworkId.lineaMainnet]: 'https://lineascan.build',
};

const NativeTokens: {
  [key in BlockchainNetworkId]: string;
} = {
  [BlockchainNetworkId.ankrTest]: 'COQ',
  [BlockchainNetworkId.basMainnet]: 'PEEL',

  [BlockchainNetworkId.baseTestnet]: 'ETH',
  [BlockchainNetworkId.baseMainnet]: 'ETH',

  [BlockchainNetworkId.lineaTestnet]: 'ETH',
  [BlockchainNetworkId.lineaMainnet]: 'ETH',
};

export function getNativeTokenSymbol(chainId: BlockchainNetworkId) {
  return NativeTokens[chainId];
}

const userOperationScan = 'https://userscan-dev.metaapesgame.com';

export const getBlockChainExplorerAddress = (chainId: BlockchainNetworkId) => BlockChainExplorerAddress[chainId];

export const getTransactionScanLink = (chainId: BlockchainNetworkId, txhash: string) => {
  return (
    <a target="_blank" href={`${getBlockChainExplorerAddress(chainId)}/tx/${txhash}`}>
      View on block explorer
    </a>
  );
};

export const getUserOperationScanLink = (chainId: BlockchainNetworkId, hash: string) => {
  return (
    <a target="_blank" href={`${userOperationScan}/user_operation/${hash}?chainId=${chainId}`}>
      View on user operation explorer
    </a>
  );
};
