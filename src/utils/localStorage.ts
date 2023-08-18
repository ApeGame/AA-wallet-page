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

export const getSendTransactionType = (): string => {
  if (!localStorage.sendTransactionType) {
    return '0';
  } else {
    return localStorage.sendTransactionType;
  }
};

export const setSendTransactionType = (type: string) => {
  localStorage.sendTransactionType = type;
};
