/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { RequestGoogleLogin, RequestFBLogin } from '@/actions/Login/login';
import { useFacebook } from 'react-facebook';
import { Button } from 'antd';
import { setJWTToken, setRefreshToken, setAbstractAccount, setUserInfo } from '@/utils/localStorage';

const contentStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignContent: 'center',
  marginTop: 240,
};

const Login = () => {
  const { isLoading, init } = useFacebook();
  const navigateTo = useNavigate();

  const success = async (response: any) => {
    console.log('response', response);
    const res = await RequestGoogleLogin(response.credential);
    console.log('RequestGoogleLogin', res);
    if (res.data.accessToken) {
      setJWTToken(res.data.accessToken);
      setRefreshToken(res.data.refreshToken);
      setAbstractAccount(res.data.abstract_account);
      setUserInfo(res.data.username);
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
        setAbstractAccount(res.data.abstract_account);
        setUserInfo(res.data.username);
        navigateTo('/overview');
      }
    }
  };

  return (
    <div>
      <div style={contentStyle}>
        <GoogleOAuthProvider clientId="31869352710-11g4q7holnvfpokbhrv9cu7a1qqq7ht5.apps.googleusercontent.com">
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
          Continue by Facebook
        </Button>
      </div>
    </div>
  );
};

export default Login;
