import { useState } from 'react';
import { Col, Row } from 'antd';
import { CopyToClipWidth } from '@/components/CopyToClip/CopyToClipWidth';
import { MultisigInfo } from '@/model/multisig';
import { CheckWallet } from './checkWallet';

export const WalletInfo = ({ wallet }: { wallet: MultisigInfo }) => {
  const [checkFlag, setCheckFlag] = useState(false);
  const handleCheckActivityClose = () => {
    setCheckFlag(false);
  };

  return (
    <>
      <CheckWallet isOpen={checkFlag} onClose={handleCheckActivityClose} wallet={wallet} />
      <Row
        style={{
          display: 'flex',
          alignContent: 'center',
          height: 90,
          marginTop: 2,
          cursor: 'pointer',
          backgroundColor: '#FFFFFF',
        }}
        onClick={() => {
          setCheckFlag(true);
        }}>
        <Col span={6} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: 45,
              height: 45,
              borderRadius: '50%',
              background: '#356DF3',
              color: '#FFF',
              fontSize: 25,
              fontWeight: 700,
            }}>
            {wallet.name && wallet.name[0]}
          </div>
        </Col>
        <Col span={18} style={{ display: 'flex', marginTop: 4 }}>
          <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left', marginLeft: 10 }}>
            <div style={{ height: 25, display: 'flex', alignItems: 'center' }}>
              <span style={{ fontSize: 15 }}>{'Wallet : '}</span>
              <span style={{ fontSize: 15 }}>
                <CopyToClipWidth address={wallet.abstract_account} />
              </span>
            </div>
            <div style={{ height: 25, display: 'flex', alignItems: 'center' }}>
              <span style={{ fontSize: 15 }}>{'Name : '}</span>
              <span style={{ fontSize: 15 }}>{wallet.name}</span>
            </div>
          </div>
        </Col>
      </Row>
      {/* <Row
        style={{ height: 60, marginTop: 25, marginBottom: 25, cursor: 'pointer' }}
        onClick={() => {
          setCheckFlag(true);
        }}>
        <Col span={6} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div
            style={{
              width: 47,
              height: 47,
              borderRadius: '50%',
              background: 'linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)',
            }}></div>
        </Col>
        <Col span={18}>
          <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
            <div style={{ height: 30, display: 'flex', alignItems: 'center' }}>
              <span style={{ fontWeight: 'bold', fontSize: 17 }}>{'wallet : '}</span>{' '}
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <span style={{ fontSize: 15 }}>
                <CopyToClipLong address={wallet.abstract_account} />
              </span>
            </div>
            <div style={{ height: 30, display: 'flex', alignItems: 'center' }}>
              <span style={{ fontWeight: 'bold', fontSize: 17 }}>{'name  : '}</span>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <span style={{ fontSize: 15 }}>{wallet.name}</span>
            </div>
          </div>
        </Col>
      </Row> */}
    </>
  );
};
