export const getErc20Info = () => {
  return localStorage.erc20;
};

export const setErc20Info = (erc20: string) => {
  localStorage.erc20 = erc20;
};
