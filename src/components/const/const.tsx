export enum BlockchainNetworkId {
  ankrTest = 12077,
  baseTestnet = 84531,
  lineaTestnet = 59140,
}

const BlockChainExplorerAddress: {
  [key in BlockchainNetworkId]: string;
} = {
  [BlockchainNetworkId.ankrTest]: 'https://testnetscan.ankr.com',
  [BlockchainNetworkId.baseTestnet]: 'https://goerli.basescan.org',
  [BlockchainNetworkId.lineaTestnet]: 'https://goerli.lineascan.build',
};

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
