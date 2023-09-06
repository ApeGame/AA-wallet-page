/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosRequestConfig } from 'axios';
import { getJWTToken } from '@/utils/localStorage';
import { RefreshAccessToken } from '@/actions/Login/login';
import { getCurrentNetwork } from '@/utils/localStorage';
import { getNetworkByName } from '@/components/Account/hooks/chainConfig';
import { BlockchainNetworkId } from '@/components/const/const';

export interface ResponseType<T = any> {
  code: number;
  msg: string;
  data: T;
}

const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    platform: 'web',
  },
});

instance.interceptors.request.use(
  function (config: any) {
    const token = getJWTToken() ?? '';
    config.headers.token = token;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response) {
    const { status } = response;
    if (status === 200) {
      return response;
    } else if (status === 401) {
      window.location.pathname = '/index';
    } else {
      // console.log('this reject', response);
      return Promise.reject(response);
    }
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    console.log('error.response.status', error.response);
    if ((error.response.status === 403 || error.response.status === 401) && !originalRequest._retry) {
      originalRequest._retry = true;
      await RefreshAccessToken();
      const token = getJWTToken() ?? '';
      axios.defaults.headers.token = token;
      return instance(originalRequest);
    } else {
      return Promise.reject({
        code: error.response.status,
        msg: error.response.data,
        data: error.response.data,
      });
    }
  }
);

export const UrlByNetwork = (): string => {
  if (getNetworkByName(getCurrentNetwork()).networkId === BlockchainNetworkId.ankrTest) {
    return `/${BlockchainNetworkId.ankrTest}`;
  } else if (getNetworkByName(getCurrentNetwork()).networkId === BlockchainNetworkId.basMainnet) {
    return `/${BlockchainNetworkId.basMainnet}`;
  } else if (getNetworkByName(getCurrentNetwork()).networkId === BlockchainNetworkId.baseTestnet) {
    return `/${BlockchainNetworkId.baseTestnet}`;
  } else if (getNetworkByName(getCurrentNetwork()).networkId === BlockchainNetworkId.baseMainnet) {
    return `/${BlockchainNetworkId.baseMainnet}`;
  } else if (getNetworkByName(getCurrentNetwork()).networkId === BlockchainNetworkId.lineaTestnet) {
    return `/${BlockchainNetworkId.lineaTestnet}`;
  } else if (getNetworkByName(getCurrentNetwork()).networkId === BlockchainNetworkId.lineaMainnet) {
    return `/${BlockchainNetworkId.lineaMainnet}`;
  } else {
    return `/${BlockchainNetworkId.ankrTest}`;
  }

  //   getNetworkByName(getCurrentNetwork()).networkId === BlockchainNetworkId.basMainnet
  // ) {
  //   return '/coq';
  // } else if (
  //   getNetworkByName(getCurrentNetwork()).networkId === BlockchainNetworkId.baseTestnet ||
  //   getNetworkByName(getCurrentNetwork()).networkId === BlockchainNetworkId.baseMainnet
  // ) {
  //   return '/base';
  // } else if (
  //   getNetworkByName(getCurrentNetwork()).networkId === BlockchainNetworkId.lineaTestnet ||
  //   getNetworkByName(getCurrentNetwork()).networkId === BlockchainNetworkId.lineaMainnet
  // ) {
  //   return '/linea';
  // } else {
  //   return '';
  // }
};

export const request = async <T = any>(config: AxiosRequestConfig): Promise<ResponseType<T>> => {
  try {
    const { data } = await instance.request<ResponseType<T>>(config);
    // console.log('data', data);
    if (!data) {
      return {
        code: 200,
        msg: 'success',
        data: {} as any,
      };
    } else if ((data as any).code) {
      (data as any).code === 200
        ? console.log('request', (data as any).msg)
        : console.error('request', (data as any).msg);
      return data;
    } else {
      return {
        code: 200,
        msg: 'success',
        data: data as any,
      };
    }
  } catch (err) {
    console.error('request err', err);
    return {
      code: (err as any).code,
      msg: (err as any).msg,
      data: (err as any).data,
    };
  }
};
