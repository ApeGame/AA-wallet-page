import { request, ResponseType } from '@/request/request';

export const GetUser = function (): Promise<ResponseType<any>> {
  return request<any>({
    url: `/aa/v1/token/user`,
    method: 'get',
  });
};
