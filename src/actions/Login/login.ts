/* eslint-disable @typescript-eslint/no-explicit-any */
import { getRefreshToken, setRefreshToken, setJWTToken } from '@/utils/localStorage';
import axios from 'axios';
import { request, ResponseType } from '@/request/request';

export const refreshAccessToken = async () => {
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
        localStorage.clear();
        window.location.pathname = '/login';
      }
    }
  );
};

export const RequestGoogleLogin = function (credential: string): Promise<ResponseType<any>> {
  const data = new FormData();
  data.append('credential', credential);
  return request<any>({
    url: `/aa/v1/google/login`,
    method: 'post',
    data: data,
  });
};

export const RequestFBLogin = function (credential: string): Promise<ResponseType<any>> {
  const data = new FormData();
  data.append('credential', credential);
  return request<any>({
    url: `/aa/v1/facebook/login`,
    method: 'post',
    data: data,
  });
};
