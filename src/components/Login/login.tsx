/* eslint-disable @typescript-eslint/no-explicit-any */
import { Modal } from 'antd';
import { observer } from 'mobx-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { RequestGoogleLogin, RequestFBLogin } from '@/actions/Login/login';
import { useFacebook } from 'react-facebook';
import { Button } from 'antd';
import { setJWTToken, setRefreshToken, setUserInfo } from '@/utils/localStorage';
import { RecoverAccountByEmailDialog } from '@/components/Account/recoverAccountByEmail';
import { useSearchParams } from 'react-router-dom';

const LoginDialog = () => {
  const { isLoading, init } = useFacebook();
  const navigateTo = useNavigate();
  const [recoverAccountEmailFlag, setRecoverAccountEmailFlag] = useState(false);
  const handleRecoverAccountEmailClose = () => {
    setRecoverAccountEmailFlag(false);
  };

  const [search] = useSearchParams();

  const success = async (response: any) => {
    console.log('login!', search.get('serverid') || '', search.get('playerid') || '');
    console.log('response', response);
    const res = await RequestGoogleLogin(
      response.credential,
      search.get('serverid') || '',
      search.get('playerid') || ''
    );
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
    console.log('login!', search.get('serverid') || '', search.get('playerid') || '');
    const api = await init();
    const response = await api?.login({ scope: 'email' });
    console.log('FB', (response as any).authResponse.accessToken);

    if (response && response.status && response.status === 'connected') {
      const res = await RequestFBLogin(
        (response as any).authResponse.accessToken,
        search.get('serverid') || '',
        search.get('playerid') || ''
      );
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
    <>
      <Modal centered title="Quick Login" open={true} width={410} footer={[]}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            height: 360,
            marginTop: 20,
          }}>
          <div style={{}}>
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
          </div>

          <div style={{ marginTop: 30 }}>
            <Button
              style={{ width: 205.867, height: '38px', borderRadius: 20 }}
              disabled={isLoading}
              onClick={handleClick}>
              Continue with Facebook
            </Button>
          </div>

          <RecoverAccountByEmailDialog isOpen={recoverAccountEmailFlag} onClose={handleRecoverAccountEmailClose} />

          <div style={{ marginTop: 30 }}>
            <Button
              type="link"
              onClick={() => {
                setRecoverAccountEmailFlag(true);
              }}>
              Recover your account by email
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default observer(LoginDialog);
