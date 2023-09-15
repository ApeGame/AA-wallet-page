import { truncateWalletAddrLong } from '@/utils/truncateWalletAddr';
import { CopyIcon } from '../CopyToClip/CopyIcon';

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

export const getBlockChainExplorerAddress = (chainId: BlockchainNetworkId) => BlockChainExplorerAddress[chainId];

export const getTransactionScanLink = (chainId: BlockchainNetworkId, txhash: string) => {
  return (
    <div style={{ display: 'flex' }}>
      <a target="_blank" href={`${getBlockChainExplorerAddress(chainId)}/tx/${txhash}`}>
        {truncateWalletAddrLong(txhash)}
      </a>
      <CopyIcon address={txhash || ''} />
    </div>
  );
};

export const getUserOperationScanLink = (chainId: BlockchainNetworkId, hash: string) => {
  return (
    <div style={{ display: 'flex' }}>
      <a target="_blank" href={`${import.meta.env.VITE_OPERATION_SCAN_URL}/user_operation/${hash}?chainId=${chainId}`}>
        {truncateWalletAddrLong(hash)}
      </a>
      <CopyIcon address={hash || ''} />
    </div>
  );
};
