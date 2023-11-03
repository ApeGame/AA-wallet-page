import { observer } from 'mobx-react';
import '@/assets/styles/accountStyle/style.scss';
import './useSendOperationStyle.css';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { setCurrentNetworkName, setRefreshToken, setJWTToken } from '@/utils/localStorage';
import { BlockchainNetworkId } from '@/components/const/const';
import { userOperation } from '../actions';
import { isJSON_test } from '@/utils/isJSON';
import { LoadingOutlined } from '@ant-design/icons';

const View = () => {
  const [search] = useSearchParams();
  const chainId = search.get('chainId') || '';
  const token = search.get('token') || '';

  useEffect(() => {
    if (chainId) {
      // setCurrentNetworkName('Base Testnet')
      if (parseInt(chainId) === BlockchainNetworkId.ankrTest) {
        setCurrentNetworkName('Coq Testnet');
      } else if (parseInt(chainId) === BlockchainNetworkId.baseTestnet) {
        setCurrentNetworkName('Base Testnet');
      } else if (parseInt(chainId) === BlockchainNetworkId.lineaTestnet) {
        setCurrentNetworkName('Linea Testnet');
      }
    }
    if (token) {
      setRefreshToken(token);
      setJWTToken(token);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chainId, token]);

  const receiveMessageFormIndex = (params) => {
    if (params.data) {
      console.log('params-----', params.data);
      if (params.data.payload && isJSON_test(params.data.payload)) {
        const paramsFromat = JSON.parse(params.data.payload);
        console.log('paramsFromat', paramsFromat);
        const swap = async () => {
          const res = await userOperation({
            address: paramsFromat.to,
            value: paramsFromat.value || '0x',
            data: paramsFromat.data,
            paymaster: undefined,
          });
          console.log('send res', res);

          window.opener.postMessage(
            {
              payload: JSON.stringify({
                data: res.data,
                type: 'APPROVE',
              }),
              type: 'UP_RESPONSE',
            },
            '*'
          );

          // if (res.code === 200) {
          //   console.log(res);
          //   window.opener.postMessage(
          //     {
          //       payload: JSON.stringify({
          //         data: res.data,
          //         type: 'APPROVE',
          //       }),
          //       type: 'UP_RESPONSE',
          //     },
          //     '*'
          //   );
          // }
        };
        if (paramsFromat && paramsFromat.data) {
          swap();
        }
      }
    }
  };
  useEffect(() => {
    if (window.opener) {
      window.opener.postMessage(
        {
          payload: {},
          type: 'UP_READY',
        },
        '*'
      );
    }
    window.addEventListener('message', receiveMessageFormIndex, false);
    return () => {
      window.removeEventListener('message', receiveMessageFormIndex, false);
    };
    // eslint-disable-next-line
  }, []);

  return (
    <div className="sdkRoot">
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ color: 'black' }}>
          <h1>AA wallet</h1>
        </div>
        <div style={{ marginTop: 30 }}>
          <LoadingOutlined style={{ color: 'black', fontSize: 30, display: 'flex', justifyContent: 'center' }} />
        </div>
      </div>
    </div>
  );
};

export default observer(View);
