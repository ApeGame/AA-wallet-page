import { getCurrentNetwork } from '@/utils/localStorage';

export interface PaymasterRequestContextData {
  erc20_address: string;
}

export interface PaymasterRequestContext {
  paymaster_type: string;
  data: PaymasterRequestContextData;
}

export interface PaymasterRequest {
  paymaster_and_data: string;
  ctx: PaymasterRequestContext;
}

export const CreatePaymasterRequest = (): PaymasterRequest => {
  let erc20address = '0x13D91374CcB046ca0B66688AdCe4B2B62837A86a';
  if (getCurrentNetwork() === 'Base') {
    erc20address = '0xAd6Cf8C4Ec63109cf420fC5C7EB82FC97eC1aBF5';
  } else if (getCurrentNetwork() === 'Linea') {
    erc20address = '0xd64134a65ae475927ed2711b967a5f08702615cd';
  }
  const context: PaymasterRequestContext = {
    paymaster_type: 'pay_erc20',
    data: {
      erc20_address: erc20address,
    },
  };
  return {
    paymaster_and_data: '',
    ctx: context,
  };
};
