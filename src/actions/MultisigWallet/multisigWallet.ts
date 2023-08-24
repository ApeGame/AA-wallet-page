import { request, ResponseType } from '@/request/request';
import { MultisigRecord, MultisigInfo } from '@/model/multisig';

export const CreateMultisigAddress = function (
  name: string,
  threshold: number,
  aaSigners: string[]
): Promise<ResponseType<any>> {
  return request<any>({
    url: `/aa/v1/token/wallet/multiple_address`,
    method: 'post',
    data: {
      name: name,
      threshold: threshold,
      aa_signers: aaSigners,
    },
  });
};

export const UpdateMultisigAddressName = function (name: string, address: string): Promise<ResponseType<any>> {
  return request<any>({
    url: `/aa/v1/token/wallet/multiple_address/${address}`,
    method: 'post',
    data: {
      name: name,
    },
  });
};

export const GetMultisigAddress = function (): Promise<ResponseType<MultisigInfo[]>> {
  return request<MultisigInfo[]>({
    url: `/aa/v1/token/wallet/multiple_address`,
    method: 'get',
  });
};

export const GetNeedSignatureList = function (): Promise<ResponseType<MultisigRecord[]>> {
  return request<MultisigRecord[]>({
    url: `/aa/v1/token/wallet/signature`,
    method: 'get',
  });
};

export const UpdateNeedSignature = function (operation: string, id: string): Promise<ResponseType<MultisigInfo>> {
  let url = '';
  if (operation.length > 0) {
    url = `/aa/v1/token/wallet/signature/${id}?operation=reject`;
  } else {
    url = `/aa/v1/token/wallet/signature/${id}`;
  }
  return request<MultisigInfo>({
    url: url,
    method: 'post',
  });
};

export const GetMultisigHistoryList = function (): Promise<ResponseType<MultisigRecord[]>> {
  return request<MultisigRecord[]>({
    url: `/aa/v1/token/wallet/multiple/user_operation`,
    method: 'get',
  });
};

export const GetStatus = (status: number) => {
  if (status === 1) {
    return 'Auditing';
  } else if (status === 2) {
    return 'Success';
  } else if (status === 3) {
    return 'Fail';
  } else if (status === 4) {
    return 'Cancel';
  } else if (status === 5) {
    return 'Reject';
  } else if (status === 6) {
    return 'Pending';
  } else {
    return 'Unknown';
  }
};
