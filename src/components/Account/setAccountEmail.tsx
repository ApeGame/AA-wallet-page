import { useState } from 'react';
import { Button, Modal, Col, Row, Space, Input, message } from 'antd';
import { BindRecoverEmail, GetCode } from '@/actions/Login/login';
import { useNavigate } from 'react-router-dom';
import { AccountStore } from '@/store/account';

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
    if (emailAddress.trim().length === 0) {
      messageApi.warning('Please input email');
    } else {
      const res = await GetCode(emailAddress);
      console.log('sendCode', res);
      if (res.code === 200) {
        messageApi.success('send code to your email');
      } else {
        messageApi.error(res.data);
      }
    }

    setIsSendLoading(false);
  };

  const bindEmail = async () => {
    setIsLoading(true);
    if (emailAddress.trim().length === 0) {
      messageApi.warning('Please input email');
    } else if (code.trim().length === 0) {
      messageApi.warning('Please input code');
    } else {
      const res = await BindRecoverEmail(emailAddress, code);
      console.log('BindRecoverEmail', res);
      if (res.code === 200) {
        messageApi.success('bind email success');
        navigateTo('/overview');
        AccountStore.loadUserData();
        onClose();
      } else {
        messageApi.error(res.data);
      }
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
        width={410}
        footer={[]}>
        <div style={{ height: 360, marginTop: 20 }}>
          <Space direction="vertical" size="large" style={{ display: 'flex' }}>
            <Row justify="space-around" align="middle">
              <Col span={16}>
                <Input
                  size="large"
                  placeholder="Please input email address"
                  onChange={(e) => {
                    if (e != null) {
                      setEmailAddress(e.target.value.trim());
                    }
                  }}
                />
              </Col>
              <Col span={8}>
                <Button
                  type="primary"
                  size="large"
                  style={{ marginLeft: 5 }}
                  loading={isSendLoading}
                  onClick={() => {
                    sendCode();
                  }}>
                  Send code
                </Button>
              </Col>
            </Row>

            <Row justify="space-around" align="middle">
              <Col span={24}>
                <Input
                  placeholder="Please input code"
                  size="large"
                  onChange={(e) => {
                    if (e != null) {
                      setCode(e.target.value.trim());
                    }
                  }}
                />
              </Col>
            </Row>

            <Row justify="space-around" align="middle" style={{ marginTop: 170 }}>
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
