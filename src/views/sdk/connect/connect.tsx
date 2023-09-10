import { observer } from 'mobx-react';
import '@/assets/styles/accountStyle/style.scss';
import './useConnectStyle.css'
import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useGoogleOneTapLogin } from '@react-oauth/google';
import { useGoogleLogin } from '@react-oauth/google';
import { RequestFBLogin } from '@/actions/Login/login';
import { useFacebook } from 'react-facebook';
import { FacebookProvider } from 'react-facebook';
import { RequestGoogleLogin } from '@/actions/Login/login';

const View = () => {
  const { init } = useFacebook();
  const [search] = useSearchParams();
  const connectType = search.get('connectType') || '';

  const success = async (response) => {
    console.log('response', window.parent);
    const res = await RequestGoogleLogin(
      response.credential,
      search.get('serverid') || '',
      search.get('playerid') || ''
    );
    console.log('RequestGoogleLogin', res);
    if (res.data.abstract_account) {
      window.opener.postMessage({
        payload:JSON.stringify({
          data:{
            address:res.data.abstract_account,
            email:"",
            newborn:false,
            signature:res.data.accessToken,
          },
          type:'APPROVE'
        }),
        type:'UP_RESPONSE'
      }
      ,'*');
    }
  };
  
    
  console.log('-----parentObj----',window.opener)
  
  const login = useGoogleLogin({
    onSuccess: tokenResponse => console.log(tokenResponse),
  });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleClick = async () => {
    const api = await init();
    const response = await api?.login({ scope: 'email' });
    if (response && response.status && response.status === 'connected') {
      const res = await RequestFBLogin(
        (response).authResponse.accessToken,
        search.get('serverid') || '',
        search.get('playerid') || ''
      );
      console.log('RequestFBLogin', res);
      if (res.code === 200) {
        window.parent.localStorage.setItem('AA-WALLET',JSON.stringify({
          address:res.data.abstract_account,
          "email":"",
          "newborn":false}
        ))
      }
    }
  };

  useEffect(() => {
    if(connectType){
      if(connectType === 'google'){
        login();
      }else if(connectType === 'facebook'){
        handleClick()
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connectType]);
  const receiveMessageFormIndex = (params) => {
    console.log('-----params------', params.data)

  }
  
  useEffect(() => {
    window.addEventListener("message", receiveMessageFormIndex, false);
    return () => {
      window.removeEventListener("message", receiveMessageFormIndex, false);
    }
    // eslint-disable-next-line
  }, [])
  useGoogleOneTapLogin({
    onSuccess: credentialResponse => {
      success(credentialResponse);
    },
    onError: () => {
      console.log('Login Failed');
    },
  });

  return (
    <FacebookProvider appId={import.meta.env.VITE_FACEBOOK_ID}>
    <div className='connectRoot'>
      <p>123</p>
    </div>
    </FacebookProvider>
  );
};

export default observer(View);
