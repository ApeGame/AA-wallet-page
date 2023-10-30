import { observer } from 'mobx-react';
import '@/assets/styles/accountStyle/style.scss';
import './useConnectStyle.css';
import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';

import { RequestGoogleLogin } from '@/actions/Login/login';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

const View = () => {
  const [search] = useSearchParams();

  const success = async (response) => {
    console.log('response', window.parent);
    const res = await RequestGoogleLogin(
      response.credential,
      search.get('serverid') || '',
      search.get('playerid') || ''
    );
    console.log('RequestGoogleLogin', res);
    if (res.data.abstract_account) {
      window.opener.postMessage(
        {
          payload: JSON.stringify({
            data: {
              address: res.data.abstract_account,
              email: '',
              newborn: false,
              signature: res.data.accessToken,
            },
            type: 'APPROVE',
          }),
          type: 'UP_RESPONSE',
        },
        '*'
      );
    }
  };

  console.log('-----parentObj----', window.opener);

  const receiveMessageFormIndex = (params) => {
    console.log('-----params------', params.data);
  };

  useEffect(() => {
    window.addEventListener('message', receiveMessageFormIndex, false);
    return () => {
      window.removeEventListener('message', receiveMessageFormIndex, false);
    };
    // eslint-disable-next-line
  }, []);

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_ID}>
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          success(credentialResponse);
        }}
        onError={() => {
          console.log('Login Failed');
        }}
        size="large"
        shape="circle"
      />
    </GoogleOAuthProvider>
  );
};

export default observer(View);
