import { getCurrentNetwork } from '@/utils/localStorage';
import { truncateWalletAddrLong } from '@/utils/truncateWalletAddr';

export const moveToBlockScan = (hash: string) => {
  let url = import.meta.env.VITE_BLOCK_SCAN_URL;
  if (getCurrentNetwork() === 'Base') {
    url = 'https://goerli.basescan.org';
  } else if (getCurrentNetwork() === 'Linea') {
    url = 'https://goerli.lineascan.build';
  }
  return (
    <a target="_blank" href={`${url}/tx/${hash}`}>
      {truncateWalletAddrLong(hash)}
    </a>
  );
};

export const moveToUserOperationScan = (hash: string) => {
  let url = import.meta.env.VITE_SCAN_URL;
  if (getCurrentNetwork() === 'Base') {
    url = import.meta.env.VITE_SCAN_URL;
  } else if (getCurrentNetwork() === 'Linea') {
    url = import.meta.env.VITE_SCAN_URL;
  }
  return (
    <a target="_blank" href={`${url}/user_operation/${hash}`}>
      {truncateWalletAddrLong(hash)}
    </a>
  );
};
