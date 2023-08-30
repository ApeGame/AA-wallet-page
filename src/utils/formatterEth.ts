import { ethers } from 'ethers';

export const formatWeiToEth = (val: string) => {
  return ethers.formatEther(val).replace(/^(.*\..{4}).*$/, '$1');
};

export const formatWeiToEthComplete = (val: string) => {
  return ethers.formatEther(val);
};
