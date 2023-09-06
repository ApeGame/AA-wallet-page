/* eslint-disable @typescript-eslint/no-explicit-any */
import { getRefreshToken, setRefreshToken, setJWTToken } from '@/utils/localStorage';
import axios from 'axios';
import { request, ResponseType, UrlByNetwork } from '@/request/request';
import { removeUserInfo } from '@/utils/localStorage';

export const RefreshAccessToken = async () => {
  const token = getRefreshToken() ?? '';
  let res;
  await axios({
    method: 'post',
    url: `${import.meta.env.VITE_REFRESH_BASE_BASE}/token/v1/auth/refresh`,
    params: {},
    headers: {
      platform: 'web',
      token: token,
    },
  }).then(
    (response) => {
      res = response.data;
      if (res.code === 200) {
        setRefreshToken(res.data.refreshToken);
        setJWTToken(res.data.accessToken);
      }
    },
    (error) => {
      console.log(error.response);
      if (error.response.status === 401) {
        removeUserInfo();
        window.location.pathname = '/login';
      }
    }
  );
};

export const RecoverLogin = async (email: string, code: string): Promise<ResponseType<any>> => {
  return request<any>({
    url: `/aa${UrlByNetwork()}/v1/recover/login`,
    method: 'post',
    data: {
      email_address: email,
      verify_code: code,
    },
  });
};

export const GetCode = function (address: string): Promise<ResponseType<any>> {
  return request<any>({
    url: `/aa${UrlByNetwork()}/v1/email/${address}/code`,
    method: 'get',
  });
};

export const BindRecoverEmail = function (email: string, code: string): Promise<ResponseType<any>> {
  return request<any>({
    url: `/aa${UrlByNetwork()}/v1/token/user/email`,
    method: 'post',
    data: {
      email_address: email,
      verify_code: code,
    },
  });
};

export const RequestGoogleLogin = function (
  credential: string,
  serverId: string,
  playerId: string
): Promise<ResponseType<any>> {
  let url = '';
  if (serverId.length !== 0 && playerId.length !== 0) {
    url = `/aa${UrlByNetwork()}/v1/google/login?type=game&serverid=${serverId}&playerid=${playerId}`;
  } else {
    url = `/aa${UrlByNetwork()}/v1/google/login`;
  }
  const data = new FormData();
  data.append('credential', credential);
  return request<any>({
    url: url,
    method: 'post',
    data: data,
  });
};

export const RequestFBLogin = function (
  credential: string,
  serverId: string,
  playerId: string
): Promise<ResponseType<any>> {
  let url = '';
  if (serverId.length !== 0 && playerId.length !== 0) {
    url = `/aa${UrlByNetwork()}/v1/facebook/login?type=game&serverid=${serverId}&playerid=${playerId}`;
  } else {
    url = `/aa${UrlByNetwork()}/v1/facebook/login`;
  }
  const data = new FormData();
  data.append('credential', credential);
  return request<any>({
    url: url,
    method: 'post',
    data: data,
  });
};

export const BindGoogleLogin = function (credential: string): Promise<ResponseType<any>> {
  const data = new FormData();
  data.append('credential', credential);
  return request<any>({
    url: `/aa${UrlByNetwork()}/v1/token/user/google`,
    method: 'post',
    data: data,
  });
};

export const BindFBLogin = function (credential: string): Promise<ResponseType<any>> {
  const data = new FormData();
  data.append('credential', credential);
  return request<any>({
    url: `/aa${UrlByNetwork()}/v1/token/user/facebook`,
    method: 'post',
    data: data,
  });
};
