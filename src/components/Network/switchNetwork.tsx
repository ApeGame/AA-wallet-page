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
      <Modal centered title="Select A Network" open={isOpen} onOk={onClose} onCancel={onClose} width={410} footer={[]}>
        <div style={{ height: 360, marginTop: 20, overflowY: 'auto' }}>
          <Row justify="space-around" align="middle">
            {getNetworkList() &&
              getNetworkList().map((row, index) => (
                <Col key={index} span={24} style={{ marginTop: 10, marginBottom: 10 }}>
                  <div
                    className={classNames(
                      'networkItem',
                      getCurrentNetwork() === row.name ? 'networkItemSelect' : 'networkItem'
                    )}
                    style={{ height: 30, fontSize: 15, padding: 10 }}
                    onClick={() => {
                      // AccountStore.setCurrentNetwork({ name: row.name, symbol: row.symbol });
                      setCurrentNetworkName(row.name);
                      AccountStore.loadUserData();
                      onClose();
                    }}>
                    <span style={{ height: 30, width: 30 }}> {row.icon}</span>

                    <span style={{ marginLeft: 10 }}>{row.name}</span>
                  </div>
                </Col>
              ))}
            {/* <Col span={24}>
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
              </Col> */}
          </Row>
        </div>
        <Row style={{ marginTop: 10 }} justify="space-around" align="middle">
          <span>More networks coming soon...</span>
        </Row>
      </Modal>
    </>
  );
};

export default observer(SwitchNetworkDialog);
