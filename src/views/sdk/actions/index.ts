import { request, ResponseType,UrlByNetwork } from '@/request/request';

export const userOperation = function (params): Promise<ResponseType> {
  return request({
    url: `${UrlByNetwork()}/v1/token/wallet/user_operation`,
    method: 'post',
    data: {
      to: params.address?params.address:undefined,
      value: params.value || '0x',
      data: params.data,
      paymaster: undefined,
    },
  });
};