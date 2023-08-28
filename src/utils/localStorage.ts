import { UserInfo } from '@/model/user';

export const getJWTToken = () => {
  return localStorage.token;
};

export const getRefreshToken = () => {
  return localStorage.refreshToken;
};

export const setRefreshToken = (token: string) => {
  localStorage.refreshToken = token;
};

export const setJWTToken = (token: string) => {
  localStorage.token = token;
};

export const getUserInfo = (): UserInfo => {
  if (localStorage.userProfile) {
    const res = JSON.parse(localStorage.userProfile);
    return res;
  } else {
    return {} as UserInfo;
  }
};

export const setUserInfo = (userInfo: UserInfo) => {
  localStorage.userProfile = JSON.stringify(userInfo);
};

export const setUserRecoverEmail = (recover_email: string) => {
  localStorage.recoverEmail = recover_email;
};

export const getUserRecoverEmail = () => {
  return localStorage.recoverEmail;
};

export const setCurrentAddress = (address: string) => {
  localStorage.currentAddress = address;
};

export const getCurrentAddress = () => {
  return localStorage.currentAddress;
};

export const getSendTransactionType = (): string => {
  if (!localStorage.sendTransactionType) {
    localStorage.sendTransactionType = '0';
    return '0';
  } else {
    return localStorage.sendTransactionType;
  }
};

export const removeUserInfo = () => {
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('token');
  localStorage.removeItem('userProfile');
  localStorage.removeItem('recoverEmail');
  localStorage.removeItem('currentAddress');
};

export const setCurrentNetworkName = (networkName: string) => {
  localStorage.currentNetwork = networkName;
};

export const getCurrentNetwork = () => {
  return localStorage.currentNetwork;
};

export const removeCurrentAddress = () => {
  localStorage.removeItem('currentAddress');
};
