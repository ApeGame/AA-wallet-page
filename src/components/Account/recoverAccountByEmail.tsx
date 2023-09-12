import { useState } from 'react';
import { Button, Modal, Col, Row, Space, Input, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { RecoverLogin } from '@/actions/Login/login';
import { setJWTToken, setRefreshToken, setUserInfo } from '@/utils/localStorage';
import { GetCode } from '@/actions/Login/login';

import '@/assets/styles/accountStyle/style.scss';

export const RecoverAccountByEmailDialog = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [emailAddress, setEmailAddress] = useState('');
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSendLoading, setIsSendLoading] = useState(false);

  const navigateTo = useNavigate();

  const [messageApi, contextHolder] = message.useMessage();

  const recover = async () => {
    setIsLoading(true);
    const res = await RecoverLogin(emailAddress, code);
    console.log('recover', res);
    if (res.data.accessToken) {
      setJWTToken(res.data.accessToken);
      setRefreshToken(res.data.refreshToken);
      // setAbstractAccount(res.data.abstract_account);
      setUserInfo({
        username: res.data.username,
        abstractAccount: res.data.abstract_account,
        multipleAccount: res.data.multiple_account,
      });
      navigateTo('/recover_bind');
    } else {
      messageApi.error('recover fail');
    }
    setIsLoading(false);
  };

  const sendCode = async () => {
    setIsSendLoading(true);
    const res = await GetCode(emailAddress);
    console.log('sendCode', res);
    if (res.code === 200) {
      messageApi.success('send code to your email');
    } else {
      messageApi.error('send code to your email fail');
    }
    setIsSendLoading(false);
  };

  return (
    <>
      {contextHolder}
      <Modal
        centered
        title="Recover account by email"
        open={isOpen}
        onOk={onClose}
        onCancel={onClose}
        width={390}
        footer={[]}>
        <div style={{ height: 180, marginTop: 50, overflowY: 'auto' }}>
          <Space direction="vertical" size="large" style={{ display: 'flex' }}>
            <Row justify="space-around" align="middle">
              <Col span={24}>
                <Space.Compact style={{ width: '100%' }}>
                  <Input
                    placeholder="Please input your email address"
                    onChange={(e) => {
                      if (e != null) {
                        setEmailAddress(e.target.value.trim());
                      }
                    }}
                  />
                  <Button
                    type="primary"
                    loading={isSendLoading}
                    onClick={() => {
                      sendCode();
                    }}>
                    Send Code
                  </Button>
                </Space.Compact>
              </Col>
            </Row>

            <Row justify="space-around" align="middle">
              <Col span={24}>
                <Input
                  placeholder="Please input code"
                  onChange={(e) => {
                    if (e != null) {
                      setCode(e.target.value.trim());
                    }
                  }}
                />
              </Col>
            </Row>

            <Row justify="space-around" align="middle">
              <Button
                type="primary"
                size={'large'}
                loading={isLoading}
                onClick={() => {
                  recover();
                }}>
                Submit
              </Button>
            </Row>
          </Space>
        </div>
      </Modal>
    </>
  );
};
