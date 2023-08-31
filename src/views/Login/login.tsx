/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { RequestGoogleLogin, RequestFBLogin } from '@/actions/Login/login';
import { useFacebook } from 'react-facebook';
import { Button } from 'antd';
import { setJWTToken, setRefreshToken, setUserInfo } from '@/utils/localStorage';
import { RecoverAccountByEmailDialog } from '@/components/Account/recoverAccountByEmail';

const contentStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignContent: 'center',
  marginTop: 240,
};

const Login = () => {
  const { isLoading, init } = useFacebook();
  const navigateTo = useNavigate();
  const [recoverAccountEmailFlag, setRecoverAccountEmailFlag] = useState(false);
  const handleRecoverAccountEmailClose = () => {
    setRecoverAccountEmailFlag(false);
  };

  const success = async (response: any) => {
    console.log('response', response);
    const res = await RequestGoogleLogin(response.credential);
    console.log('RequestGoogleLogin', res);
    if (res.data.accessToken) {
      setJWTToken(res.data.accessToken);
      setRefreshToken(res.data.refreshToken);
      // setAbstractAccount(res.data.abstract_account);
      setUserInfo({
        username: res.data.username,
        abstractAccount: res.data.abstract_account,
        multipleAccount: res.data.multiple_account,
      });
      navigateTo('/overview');
    }
  };

  const handleClick = async () => {
    const api = await init();
    const response = await api?.login({ scope: 'email' });
    console.log('FB', (response as any).authResponse.accessToken);

    if (response && response.status && response.status === 'connected') {
      const res = await RequestFBLogin((response as any).authResponse.accessToken);
      console.log('RequestFBLogin', res);
      if (res.code === 200) {
        setJWTToken(res.data.accessToken);
        setRefreshToken(res.data.refreshToken);
        // setAbstractAccount(res.data.abstract_account);
        setUserInfo({
          username: res.data.username,
          abstractAccount: res.data.abstract_account,
          multipleAccount: res.data.multiple_account,
        });
        navigateTo('/overview');
      }
    }
  };

  return (
    <div>
      <div>
        <div style={contentStyle}>
          <GoogleOAuthProvider clientId="630705530881-clh74410oedn4h88ouaa8u82d7afsug1.apps.googleusercontent.com">
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                success(credentialResponse);
              }}
              onError={() => {
                console.log('Login Failed');
              }}
              size="large"
            />
          </GoogleOAuthProvider>
        </div>

        <div style={{ marginTop: '20px' }}>
          <Button style={{ width: '198px', height: '38px' }} disabled={isLoading} onClick={handleClick}>
            Continue with Facebook
          </Button>
        </div>

        <RecoverAccountByEmailDialog isOpen={recoverAccountEmailFlag} onClose={handleRecoverAccountEmailClose} />

        <div style={{ marginTop: '20px' }}>
          <Button
            type="link"
            onClick={() => {
              setRecoverAccountEmailFlag(true);
            }}>
            Recover your account by email
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
