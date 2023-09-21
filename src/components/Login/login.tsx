/* eslint-disable @typescript-eslint/no-explicit-any */
import { Modal, Space, message } from 'antd';
import { observer } from 'mobx-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { RequestGoogleLogin } from '@/actions/Login/login';
// import { useFacebook } from 'react-facebook';
import { Button } from 'antd';
import { setJWTToken, setRefreshToken, setUserInfo } from '@/utils/localStorage';
import { RecoverAccountByEmailDialog } from '@/components/Account/recoverAccountByEmail';
import { useSearchParams } from 'react-router-dom';
import { Checkbox } from 'antd';
import Cookies from 'universal-cookie';

const LoginDialog = () => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const cookies = new Cookies();
  const [messageApi, contextHolder] = message.useMessage();
  // const { isLoading, init } = useFacebook();
  const navigateTo = useNavigate();
  const [recoverAccountEmailFlag, setRecoverAccountEmailFlag] = useState(false);
  const handleRecoverAccountEmailClose = () => {
    setRecoverAccountEmailFlag(false);
  };

  const [check1, setCheck1] = useState(false);
  const [check2, setCheck2] = useState(false);

  const [gameLoginResDisplayFlag, setGameLoginResDisplayFlag] = useState(false);
  const [gameLoginRes, setGameLoginRes] = useState('');

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
    if (res.code === 200) {
      if (search.get('serverid') && search.get('playerid')) {
        console.log('game login success');
        setGameLoginResDisplayFlag(true);
        setGameLoginRes('Login successful, please return to the game manually.');
      } else {
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
    } else {
      if (search.get('serverid') && search.get('playerid')) {
        console.log('game login fail');
        setGameLoginResDisplayFlag(true);
        setGameLoginRes('Login Fail, ' + res.data);
      } else {
        messageApi.error(res.data);
      }
    }
  };

  // const handleClick = async () => {
  //   console.log('login!', search.get('serverid') || '', search.get('playerid') || '');
  //   const api = await init();
  //   const response = await api?.login({ scope: 'email' });
  //   console.log('FB', (response as any).authResponse.accessToken);

  //   if (response && response.status && response.status === 'connected') {
  //     const res = await RequestFBLogin(
  //       (response as any).authResponse.accessToken,
  //       search.get('serverid') || '',
  //       search.get('playerid') || ''
  //     );
  //     console.log('RequestFBLogin', res);
  //     if (res.code === 200) {
  //       setJWTToken(res.data.accessToken);
  //       setRefreshToken(res.data.refreshToken);
  //       // setAbstractAccount(res.data.abstract_account);
  //       setUserInfo({
  //         username: res.data.username,
  //         abstractAccount: res.data.abstract_account,
  //         multipleAccount: res.data.multiple_account,
  //       });
  //       navigateTo('/overview');
  //     }
  //   }
  // };

  const onChange1 = () => {
    setCheck1(!check1);
    cookies.set('rememberCheck1', !check1, { path: '/' });
  };

  const onChange2 = () => {
    setCheck2(!check2);
    cookies.set('rememberCheck2', !check2, { path: '/' });
  };

  useEffect(() => {
    setCheck1(cookies.get('rememberCheck1'));
    setCheck2(cookies.get('rememberCheck2'));
  }, [cookies]);

  return (
    <>
      {contextHolder}
      <Modal centered title="Quick Login" open={true} width={410} footer={[]}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            height: 400,
          }}>
          {gameLoginResDisplayFlag ? (
            <span style={{ fontSize: 20, fontWeight: 'bold' }}>{gameLoginRes}</span>
          ) : (
            <>
              <Space direction="vertical" size={'large'} style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={check1 && check2 ? {} : { pointerEvents: 'none' }}>
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

                {/* <div style={check1 && check2 ? {} : { pointerEvents: 'none' }}>
              <Button
                style={{ width: 205.867, height: '38px', borderRadius: 20 }}
                disabled={isLoading}
                onClick={handleClick}>
                Continue with Facebook
              </Button>
            </div> */}
              </Space>

              <RecoverAccountByEmailDialog isOpen={recoverAccountEmailFlag} onClose={handleRecoverAccountEmailClose} />

              {!(check1 && check2) && (
                <span style={{ marginTop: 25, fontSize: 10, color: 'red' }}>
                  Please check the boxes before proceeding
                </span>
              )}

              <Space
                direction="vertical"
                size={'large'}
                style={{ display: 'flex', flexDirection: 'column', marginTop: 30 }}>
                <div>
                  <Checkbox onChange={onChange1} checked={check1}></Checkbox>
                  <span style={{ marginLeft: 10 }}>
                    By utilizing the smart contract services, users acknowledge and agree to be bound by Coya's{' '}
                    <a target="_blank" href={'https://coya.biz/termsofuse'}>
                      Terms of Use.
                    </a>{' '}
                  </span>
                </div>
                <div>
                  <Checkbox onChange={onChange2} checked={check2}></Checkbox>
                  <span style={{ marginLeft: 10 }}>
                    The smart contract service is furnished by Coya Innovation Holdings Limited BVI. Meta Apes neither
                    guarantees nor assumes any legal liability for this service.
                  </span>
                </div>
              </Space>

              <div style={{ marginTop: 30 }}>
                <Button
                  type="link"
                  onClick={() => {
                    setRecoverAccountEmailFlag(true);
                  }}>
                  Recover your account by email
                </Button>
              </div>
            </>
          )}
        </div>
      </Modal>
    </>
  );
};

export default observer(LoginDialog);
