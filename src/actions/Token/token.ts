/* eslint-disable @typescript-eslint/no-explicit-any */
import { request, ResponseType } from '@/request/request';
import { ethers } from 'ethers';

export const GetNativeToken = function (): Promise<ResponseType<any>> {
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
  return request<any>({
    url: `/aa/v1/token/wallet/user_operation`,
    method: 'post',
    data: {
      to: toAddress,
      value: '0x' + ethers.parseEther(value).toString(16),
    },
  });
};

export const SendErc20Token = function (toAddress: string, data: string): Promise<ResponseType<any>> {
  return request<any>({
    url: `/aa/v1/token/wallet/user_operation`,
    method: 'post',
    data: {
      to: toAddress,
      value: '0x0',
      data: data,
    },
  });
};
