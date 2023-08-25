/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { BindGoogleLogin, BindFBLogin } from '@/actions/Login/login';
import { useFacebook } from 'react-facebook';
import { Button, message } from 'antd';

const contentStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignContent: 'center',
  flexDirection: 'row',
  marginTop: 240,
};

const BindAccount = () => {
  const { isLoading, init } = useFacebook();
  const navigateTo = useNavigate();

  const [messageApi, contextHolder] = message.useMessage();

  const success = async (response: any) => {
    console.log('response', response);
    const res = await BindGoogleLogin(response.credential);
    console.log('RequestGoogleLogin', res);
    if (res.code === 200) {
      messageApi.success('bind google account success');
      navigateTo('/overview');
      window.location.reload();
    } else {
      messageApi.error('bind google account fail');
    }
  };

  const handleClick = async () => {
    const api = await init();
    const response = await api?.login({ scope: 'email' });
    console.log('FB', (response as any).authResponse.accessToken);

    if (response && response.status && response.status === 'connected') {
      const res = await BindFBLogin((response as any).authResponse.accessToken);
      console.log('RequestFBLogin', res);
      if (res.code === 200) {
        messageApi.success('bind facebook account success');
        navigateTo('/overview');
        window.location.reload();
      } else {
        messageApi.error('bind facebook account fail');
      }
    }
  };

  return (
    <>
      {contextHolder}
      <div style={{ padding: 30 }}>
        <div>
          <span style={{ color: '#000000' }}>Bind for login</span>
        </div>
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
            Continue with Facebook
          </Button>
        </div>
      </div>
    </>
  );
};

export default BindAccount;
