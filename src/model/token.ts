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
  if (getCurrentNetwork() === 'Base Testnet') {
    erc20address = '0xE45469233597318F51656B401DD561D9306ED2Fd';
  } else if (getCurrentNetwork() === 'Linea Testnet') {
    erc20address = '0x77E825be7701Fe49D4b825304C77B3754f80D54d';
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
