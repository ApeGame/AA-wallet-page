import { observer } from 'mobx-react';
import '@/assets/styles/accountStyle/style.scss';
import './useSendOperationStyle.css'
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { setCurrentNetworkName, setRefreshToken, setJWTToken } from '@/utils/localStorage';
import { BlockchainNetworkId } from '@/components/const/const';
import { userOperation } from '../actions'

const View = () => {
  const [search] = useSearchParams();
  const chainId = search.get('chainId') || '';
  const token = search.get('token') || '';


    useEffect(() => {
    if(chainId){
      // setCurrentNetworkName('Base Testnet')
      if(parseInt(chainId) === BlockchainNetworkId.ankrTest){
        setCurrentNetworkName('Coq Testnet')
      }else if(parseInt(chainId) === BlockchainNetworkId.baseTestnet){
        setCurrentNetworkName('Base Testnet')
      }else if(parseInt(chainId) === BlockchainNetworkId.lineaTestnet){
        setCurrentNetworkName('Linea Testnet')
      }
    }
    if(token){
      setRefreshToken(token);
      setJWTToken(token);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chainId,token]);

  const receiveMessageFormIndex = (params) => {
    if(params.data){
      console.log('params-----',params.data)
      const paramsFromat = JSON.parse(params.data.payload);
      console.log(paramsFromat)
      const swap = async()=>{
        const res = await userOperation({
          address: paramsFromat.to,
          value: paramsFromat.value || '0x',
          data: paramsFromat.data,
          paymaster: undefined,
        })
        if(res.code === 200){
          console.log(res);
            window.opener.postMessage({
              payload:JSON.stringify({
                data:res.data,
                type:'APPROVE'
              }),
              type:'UP_RESPONSE'
            }
            ,'*');
        }
      }
      if(paramsFromat && paramsFromat.data){
        swap();
      }
    }
  }
  useEffect(() => {
    if (window.opener) {
      window.opener.postMessage({
        payload:{},
        type:'UP_READY'
      }, '*')
    }
    window.addEventListener("message", receiveMessageFormIndex, false);
    return () => {
      window.removeEventListener("message", receiveMessageFormIndex, false);
    }
    // eslint-disable-next-line
  }, [])

  return (
    <div className='sdkRoot'>
      <p>123</p>
    </div>
  );
};

export default observer(View);