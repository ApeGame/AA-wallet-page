export const getJWTToken = () => {
  return localStorage.token;
};

export const getRefreshToken = () => {
  return localStorage.refreshToken;
};

export const getAbstractAccount = () => {
  return localStorage.abstractAccount;
};

export const setRefreshToken = (token: string) => {
  localStorage.refreshToken = token;
};

export const setJWTToken = (token: string) => {
  localStorage.token = token;
};

export const setAbstractAccount = (account: string) => {
  localStorage.abstractAccount = account;
};
