import { request, ResponseType, UrlByNetwork } from '@/request/request';

export const GetUser = function (): Promise<ResponseType<any>> {
  return request<any>({
    url: `${UrlByNetwork()}/v1/token/user`,
    method: 'get',
  });
};
