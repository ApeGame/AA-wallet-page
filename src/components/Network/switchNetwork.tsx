import { useState } from 'react';
import { Button, Modal, Col, Row, Space, message } from 'antd';
import { observer } from 'mobx-react';
import ethIcon from '@/assets/img/eth.svg';
import bscIcon from '@/assets/img/binance.svg';
import lineaIcon from '@/assets/img/linea.svg';
import baseIcon from '@/assets/img/base.svg';
import zkevmIcon from '@/assets/img/zkevm.svg';
import coqIcon from '@/assets/img/ankr.svg';
import apeIcon from '@/assets/img/ape.svg';
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
                  <img style={{ height: 40, width: 40 }} src={apeIcon} alt="" />
                  <span style={{ marginLeft: 10 }}>APE</span>
                </div>
              </Col>
              <Col span={24}>
                <div className="networkItem" style={{ height: 60, fontSize: 15, padding: 10 }}>
                  <img style={{ height: 40, width: 40 }} src={ethIcon} alt="" />
                  <span style={{ marginLeft: 10 }}>Ethereum</span>
                </div>
              </Col>
              <Col span={24}>
                <div className="networkItem" style={{ height: 60, fontSize: 15, padding: 10 }}>
                  <img style={{ height: 40, width: 40 }} src={bscIcon} alt="" />
                  <span style={{ marginLeft: 10 }}>Binance</span>
                </div>
              </Col>
              <Col span={24}>
                <div className="networkItem" style={{ height: 60, fontSize: 15, padding: 10 }}>
                  <img style={{ height: 40, width: 40 }} src={lineaIcon} alt="" />
                  <span style={{ marginLeft: 10 }}>Line</span>
                </div>
              </Col>
              <Col span={24}>
                <div className="networkItem" style={{ height: 60, fontSize: 15, padding: 10 }}>
                  <img style={{ height: 40, width: 40 }} src={baseIcon} alt="" />
                  <span style={{ marginLeft: 10 }}>Base</span>
                </div>
              </Col>
              <Col span={24}>
                <div className="networkItem" style={{ height: 60, fontSize: 15, padding: 10 }}>
                  <img style={{ height: 40, width: 40 }} src={zkevmIcon} alt="" />
                  <span style={{ marginLeft: 10 }}>Zkevm</span>
                </div>
              </Col>
              <Col span={24}>
                <div className="networkItem" style={{ height: 60, fontSize: 15, padding: 10 }}>
                  <img style={{ height: 40, width: 40 }} src={coqIcon} alt="" />
                  <span style={{ marginLeft: 10 }}>Coq Testnet</span>
                </div>
              </Col>
            </Row>
          </Space>
        </div>
        <Row style={{ marginTop: 10 }} justify="space-around" align="middle">
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
