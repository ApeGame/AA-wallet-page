import { useState } from 'react';
import { Button, Modal, Col, Row, Space, Input, message } from 'antd';
import { useNavigate } from 'react-router-dom';

import '@/assets/styles/accountStyle/style.scss';

export const AddAccountEmailDialog = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [abstractAddressList, setAbstractAddressList] = useState<string[]>([]);
  const [emailAddress, setEmailAddress] = useState('');
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigateTo = useNavigate();

  const [messageApi, contextHolder] = message.useMessage();

  return (
    <>
      {contextHolder}
      <Modal
        centered
        title="Please add email for account "
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
                  <Button type="primary">Send email</Button>
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
              <Button type="primary" size={'large'} loading={isLoading}>
                Submit
              </Button>
            </Row>
          </Space>
        </div>
      </Modal>
    </>
  );
};
