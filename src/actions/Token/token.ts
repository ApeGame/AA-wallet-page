/* eslint-disable @typescript-eslint/no-explicit-any */
import { request, ResponseType, UrlByNetwork } from '@/request/request';
import { ethers } from 'ethers';
import { AccountStore } from '@/store/account';
import { CreatePaymasterRequest } from '@/model/token';
import axios from 'axios';

export const GetAccountAsset = function (): Promise<ResponseType<any>> {
  return request<any>({
    url: `${UrlByNetwork()}/v1/token/wallet/assets`,
    method: 'get',
  });
};

export const GetAccountNftAsset = function (): Promise<ResponseType<any>> {
  return request<any>({
    url: `${UrlByNetwork()}/v1/token/wallet/assets_721?refresh=true`,
    method: 'get',
  });
};

export const UpdateNfts = function (
  walletAddress: string,
  tokenAddress: string,
  tokenId: number
): Promise<ResponseType<any>> {
  const erc721map = new Map();
  erc721map.set(tokenAddress, [tokenId]);

  console.log('erc721map!!!', erc721map);

  return request<any>({
    url: `${UrlByNetwork()}/v1/token/wallet/assets_721`,
    method: 'post',
    data: {
      owner: walletAddress,
      erc_721: Object.fromEntries(erc721map.entries()),
    },
  });
};

export const DeleteNfts = function (
  walletAddress: string,
  tokenAddress: string,
  tokenId: number
): Promise<ResponseType<any>> {
  const erc721map = new Map();
  erc721map.set(tokenAddress, [tokenId]);
  console.log('erc721map!!!', erc721map);

  return request<any>({
    url: `${UrlByNetwork()}/v1/token/wallet/assets_721`,
    method: 'delete',
    data: {
      owner: walletAddress,
      erc_721: Object.fromEntries(erc721map.entries()),
    },
  });
};

export const UpdateToken = function (tokenAddress: string): Promise<ResponseType<any>> {
  return request<any>({
    url: `${UrlByNetwork()}/v1/token/wallet/assets`,
    method: 'post',
    data: {
      erc_20: [tokenAddress],
    },
  });
};

export const DeleteToken = function (tokenAddress: string): Promise<ResponseType<any>> {
  return request<any>({
    url: `${UrlByNetwork()}/v1/token/wallet/assets`,
    method: 'delete',
    data: {
      erc_20: [tokenAddress],
    },
  });
};

export const SendNativeToken = function (
  toAddress: string,
  value: string,
  paymentType: number
): Promise<ResponseType<any>> {
  console.log('current account', AccountStore.currentAccount);
  //return {} as any;
  return request<any>({
    url: `${UrlByNetwork()}/v1/token/wallet/user_operation`,
    method: 'post',
    data: {
      to: toAddress,
      value: '0x' + ethers.parseEther(value).toString(16),
      sender: AccountStore.currentAccount.isMultisig ? AccountStore.currentAccount.address : '',
      paymaster: paymentType === 0 ? undefined : CreatePaymasterRequest(),
    },
  });
};

export const SendErc20Token = function (
  toAddress: string,
  data: string,
  paymentType: number
): Promise<ResponseType<any>> {
  console.log('current account', AccountStore.currentAccount);
  //return {} as any;
  return request<any>({
    url: `${UrlByNetwork()}/v1/token/wallet/user_operation`,
    method: 'post',
    data: {
      to: toAddress,
      value: '0x0',
      data: data,
      sender: AccountStore.currentAccount.isMultisig ? AccountStore.currentAccount.address : '',
      paymaster: paymentType === 0 ? undefined : CreatePaymasterRequest(),
    },
  });
};

export const SendApproveRequest = function (toAddress: string, data: string): Promise<ResponseType<any>> {
  console.log('current account', AccountStore.currentAccount);
  //return {} as any;
  return request<any>({
    url: `${UrlByNetwork()}/v1/token/wallet/user_operation`,
    method: 'post',
    data: {
      to: toAddress,
      value: '0x0',
      data: data,
      sender: AccountStore.currentAccount.isMultisig ? AccountStore.currentAccount.address : '',
      paymaster: CreatePaymasterRequest(),
    },
  });
};

export const GetNftAttribute = async (uri: string) => {
  let data;
  await axios({
    method: 'get',
    url: uri,
    params: {},
  }).then(
    (res) => {
      data = JSON.stringify(res.data);
    },
    (err) => {
      console.log(err);
    }
  );
  return data;
};
