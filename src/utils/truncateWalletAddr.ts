export const truncateWalletAddrLong = (address: string): string => {
  if (address.length <= 12) {
    return address;
  }
  if (typeof address !== 'string') {
    address = '';
  }
  const addrSymbols = address.split('');
  const firstPart = addrSymbols.slice(0, 10).join('');
  const lastPart = addrSymbols.slice(addrSymbols.length - 9, addrSymbols.length).join('');
  return `${firstPart}...${lastPart}`;
};

export const truncateWalletAddrTooLong = (address: string): string => {
  if (address.length <= 12) {
    return address;
  }
  if (typeof address !== 'string') {
    address = '';
  }
  const addrSymbols = address.split('');
  const firstPart = addrSymbols.slice(0, 18).join('');
  const lastPart = addrSymbols.slice(addrSymbols.length - 14, addrSymbols.length).join('');
  return `${firstPart}...${lastPart}`;
};
