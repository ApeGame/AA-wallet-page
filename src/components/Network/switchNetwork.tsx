// import React, { useEffect } from 'react';
import { Modal, Col, Row, Space } from 'antd';
import { observer } from 'mobx-react';
import ethIcon from '@/assets/img/eth.svg';
import bscIcon from '@/assets/img/binance.svg';
import zkevmIcon from '@/assets/img/zkevm.svg';
import '@/assets/styles/accountStyle/style.scss';
import { AccountStore } from '@/store/account';
import classNames from 'classnames';
import { setCurrentNetworkName } from '@/utils/localStorage';
import { getCurrentNetwork } from '@/utils/localStorage';
import { getNetworkList } from '../Account/hooks/chainConfig';

const SwitchNetworkDialog = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  // const [isLoading, setIsLoading] = useState(false);
  // const [messageApi, contextHolder] = message.useMessage();

  return (
    <>
      <Modal centered title="Select a network" open={isOpen} onOk={onClose} onCancel={onClose} width={390} footer={[]}>
        <div style={{ height: 300, marginTop: 50, overflowY: 'auto' }}>
          <Space direction="vertical" size="large" style={{ display: 'flex' }}>
            <Row justify="space-around" align="middle">
              {getNetworkList() &&
                getNetworkList().map((row, index) => (
                  <Col key={index} span={24}>
                    <div
                      className={classNames(
                        'networkItem',
                        getCurrentNetwork() === row.name ? 'networkItemSelect' : 'networkItem'
                      )}
                      style={{ height: 60, fontSize: 15, padding: 10 }}
                      onClick={() => {
                        // AccountStore.setCurrentNetwork({ name: row.name, symbol: row.symbol });
                        console.log('row.name', row.name);
                        setCurrentNetworkName(row.name);
                        AccountStore.loadUserData();
                        onClose();
                      }}>
                      {row.icon}
                      <span style={{ marginLeft: 10 }}>{row.name}</span>
                    </div>
                  </Col>
                ))}
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
                  <img style={{ height: 40, width: 40 }} src={zkevmIcon} alt="" />
                  <span style={{ marginLeft: 10 }}>Zkevm</span>
                </div>
              </Col>
            </Row>
          </Space>
        </div>
        <Row style={{ marginTop: 10 }} justify="space-around" align="middle">
          <span>More networks coming soon...</span>
        </Row>
      </Modal>
    </>
  );
};

export default observer(SwitchNetworkDialog);
