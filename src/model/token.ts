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
  const context: PaymasterRequestContext = {
    paymaster_type: 'pay_erc20',
    data: {
      erc20_address: '0x13D91374CcB046ca0B66688AdCe4B2B62837A86a',
    },
  };
  return {
    paymaster_and_data: '',
    ctx: context,
  };
};
