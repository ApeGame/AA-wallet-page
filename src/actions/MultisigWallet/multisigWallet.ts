/* eslint-disable @typescript-eslint/no-explicit-any */
import { request, ResponseType } from '@/request/request';

export const CreateMultisigAddress = function (
  abstractAccount: string,
  threshold: number,
  aaSigners: string[]
): Promise<ResponseType<any>> {
  return request<any>({
    url: `/aa/v1/token/wallet/multiple_address`,
    method: 'post',
    data: {
      abstract_account: abstractAccount,
      threshold: threshold,
      aa_signers: aaSigners,
    },
  });
};

export interface MultisigInfo {
  abstract_account: string;
  threshold: number;
  signer_aa_account: string[];
}

export const GetMultisigAddress = function (): Promise<ResponseType<MultisigInfo>> {
  return request<MultisigInfo>({
    url: `/aa/v1/token/wallet/multiple_address`,
    method: 'get',
  });
};

export interface MultisigRecord {
  id: string;
  sender: string;
  data: string;
  user_operation_hash: string;
  status: number;
}

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
