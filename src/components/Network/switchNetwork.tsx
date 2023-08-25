import { useState } from 'react';
import { Button, Modal, Col, Row, Space, message } from 'antd';
import { CrownFilled, BankFilled, SmileFilled } from '@ant-design/icons';
import { observer } from 'mobx-react';
import '@/assets/styles/accountStyle/style.scss';

const SwitchNetworkDialog = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const addNetwork = async () => {
    setIsLoading(true);
    messageApi.success('success');
    setIsLoading(false);
  };

  return (
    <>
      {contextHolder}
      <Modal centered title="Select a network" open={isOpen} onOk={onClose} onCancel={onClose} width={390} footer={[]}>
        <div style={{ height: 300, marginTop: 50, overflowY: 'auto' }}>
          <Space direction="vertical" size="large" style={{ display: 'flex' }}>
            <Row justify="space-around" align="middle">
              <Col span={24}>
                <div className="networkItemSelect" style={{ height: 60, fontSize: 15, padding: 10 }}>
                  <CrownFilled style={{ fontSize: 20 }} />
                  <span style={{ marginLeft: 10 }}>BAS Testnet</span>
                </div>
              </Col>
              <Col span={24}>
                <div className="networkItem" style={{ height: 60, fontSize: 15, padding: 10 }}>
                  <BankFilled style={{ fontSize: 20, color: '#B0C4DE' }} />
                  <span style={{ marginLeft: 10 }}>Ethereum Testnet</span>
                </div>
              </Col>
              <Col span={24}>
                <div className="networkItem" style={{ height: 60, fontSize: 15, padding: 10 }}>
                  <SmileFilled style={{ fontSize: 20, color: '#B0C4DE' }} />
                  <span style={{ marginLeft: 10 }}>Coq Testnet</span>
                </div>
              </Col>
            </Row>
          </Space>
        </div>
        <Row justify="space-around" align="middle">
          <Button
            type="primary"
            size={'large'}
            loading={isLoading}
            onClick={() => {
              addNetwork();
            }}>
            Add a network
          </Button>
        </Row>
      </Modal>
    </>
  );
};

export default observer(SwitchNetworkDialog);
