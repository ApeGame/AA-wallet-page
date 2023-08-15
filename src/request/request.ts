/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosRequestConfig } from 'axios';

export interface ResponseType<T = any> {
  code: number;
  msg: string;
  data: T;
}

const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

const frontInstance = axios.create({
  baseURL: import.meta.env.VITE_FRONT_BASE_URL,
});

export const request = async <T = any>(config: AxiosRequestConfig): Promise<ResponseType<T>> => {
  try {
    const { data } = await instance.request<ResponseType<T>>(config);
    data.code === 200 ? console.log('request', data.msg) : console.error('request', data.msg);
    return data;
  } catch (err) {
    const msg = 'request fail';
    console.error(err);
    return {
      code: -1,
      msg,
      data: err as any,
    };
  }
};

export const frontRequest = async <T = any>(config: AxiosRequestConfig): Promise<ResponseType<T>> => {
  try {
    const { data } = await frontInstance.request<ResponseType<T>>(config);
    // data.code === 200 ? console.log('request', data.msg) : console.error('request', data.msg);
    return {
      code: 200,
      msg: 'success',
      data: data as any,
    };
  } catch (err) {
    const msg = 'request fail';
    console.error(err);
    return {
      code: -1,
      msg,
      data: err as any,
    };
  }
};
