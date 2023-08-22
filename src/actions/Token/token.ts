/* eslint-disable @typescript-eslint/no-explicit-any */
import { request, ResponseType } from '@/request/request';
import { ethers } from 'ethers';
import { getUserInfo } from '@/utils/localStorage';
import { sendType } from '@/store/send';
import { AccountStore } from '@/store/account';

export const GetAccountAsset = function (): Promise<ResponseType<any>> {
  return request<any>({
    url: `/aa/v1/token/wallet/assets`,
    method: 'get',
  });
};

export const UpdateToken = function (tokenAddress: string): Promise<ResponseType<any>> {
  return request<any>({
    url: `/aa/v1/token/wallet/assets`,
    method: 'post',
    data: {
      erc_20: [tokenAddress],
    },
  });
};

export const SendNativeToken = function (toAddress: string, value: string): Promise<ResponseType<any>> {
  console.log('current account', AccountStore.currentAccount);
  //return {} as any;
  return request<any>({
    url: `/aa/v1/token/wallet/user_operation`,
    method: 'post',
    data: {
      to: toAddress,
      value: '0x' + ethers.parseEther(value).toString(16),
      sender: AccountStore.currentAccount.isMultisig ? AccountStore.currentAccount.address : '',
    },
  });
};

export const SendErc20Token = function (toAddress: string, data: string): Promise<ResponseType<any>> {
  console.log('current account', AccountStore.currentAccount);
  //return {} as any;
  return request<any>({
    url: `/aa/v1/token/wallet/user_operation`,
    method: 'post',
    data: {
      to: toAddress,
      value: '0x0',
      data: data,
      sender: AccountStore.currentAccount.isMultisig ? AccountStore.currentAccount.address : '',
    },
  });
};
