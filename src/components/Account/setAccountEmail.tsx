import { useState } from 'react';
import { Button, Modal, Col, Row, Space, Input, message } from 'antd';
import { BindRecoverEmail, GetCode } from '@/actions/Login/login';
import { useNavigate } from 'react-router-dom';

import '@/assets/styles/accountStyle/style.scss';

export const AddAccountEmailDialog = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [emailAddress, setEmailAddress] = useState('');
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSendLoading, setIsSendLoading] = useState(false);
  const navigateTo = useNavigate();

  const [messageApi, contextHolder] = message.useMessage();

  const sendCode = async () => {
    setIsSendLoading(true);
    const res = await GetCode(emailAddress);
    console.log('sendCode', res);
    if (res.code === 200) {
      messageApi.success('send code to your email');
      navigateTo('/overview');
      window.location.reload();
    } else {
      messageApi.error('send code to your email fail');
    }
    setIsSendLoading(false);
  };

  const bindEmail = async () => {
    setIsLoading(true);
    const res = await BindRecoverEmail(emailAddress, code);
    console.log('BindRecoverEmail', res);
    if (res.code === 200) {
      messageApi.success('bind email success');
    } else {
      messageApi.error('bind email fail');
    }
    setIsLoading(false);
  };

  return (
    <>
      {contextHolder}
      <Modal
        centered
        title="Bind email for account "
        open={isOpen}
        onOk={onClose}
        onCancel={onClose}
        width={390}
        footer={[]}>
        <div style={{ height: 180, marginTop: 50, overflowY: 'auto' }}>
          <Space direction="vertical" size="large" style={{ display: 'flex' }}>
            <Row justify="space-around" align="middle">
              <Col span={24}>
                <Space.Compact style={{ width: '95%' }}>
                  <Input
                    placeholder="Please input email address"
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
                    Send code
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
                  bindEmail();
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