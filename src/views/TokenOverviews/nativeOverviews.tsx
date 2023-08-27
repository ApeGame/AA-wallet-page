import { ArrowRightOutlined, LeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { MultisigRecord } from '@/model/multisig';
import { Col, Row, Space, Divider } from 'antd';
import { CopyToClipLong } from '@/components/CopyToClip/CopyToClip';
import { truncateWalletAddrLong } from '@/utils/truncateWalletAddr';
import { GetStatus } from '@/actions/MultisigWallet/multisigWallet';

const functionsListStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '60px',
  width: '100%',
  color: '#000000',
  marginTop: '40px',
};
const iconButtonStyle: React.CSSProperties = {
  fontSize: '25px',
  color: '#FFFFFF',
};

const backStyle: React.CSSProperties = {
  marginTop: 30,
  marginRight: 330,
  color: '#000000',
};

const Overview = () => {
  const navigateTo = useNavigate();

  const [search] = useSearchParams();

  const [recordList, setRecordList] = useState<MultisigRecord[]>([]);

  const loadData = async () => {
    setRecordList([]);
  };

  useEffect(() => {
    // load
    loadData();
  }, []);

  const moveToUserOperationScan = (hash: string) => {
    return (
      <a target="_blank" href={`${import.meta.env.VITE_SCAN_URL}/user_operation/${hash}`}>
        {truncateWalletAddrLong(hash)}
      </a>
    );
  };

  const moveToBlockScan = (hash: string) => {
    return (
      <a
        target="_blank"
        href={`${
          import.meta.env.VITE_BLOCK_SCAN_URL
        }/tx/${'0x60607206816f13e472ea00d24d978997732eca59af3acac3f34b7de551736e2b'}`}>
        {truncateWalletAddrLong(hash)}
      </a>
    );
  };

  useEffect(() => {
    console.log('!!!', search.get('tokenAddress'));
  }, [search]);

  return (
    <div>
      <div
        style={backStyle}
        onClick={() => {
          navigateTo('/overview');
        }}>
        <LeftOutlined />
      </div>
      <div style={{ marginTop: 50 }}>
        {/* {search.get('tokenAddress') && <div style={balanceStyle}>Token Address</div>}
        <div style={balanceStyle}>{search.get('tokenAddress')}</div> */}
        <div style={{ color: '#000000', marginTop: 10 }}>
          <Space direction="vertical" size="large" style={{ width: '100%' }}>
            <Row style={{ width: '100%' }} justify="space-around" align="middle">
              <Col span={10}>
                <span>Name :</span>
              </Col>
              <Col span={14}>Peel</Col>
            </Row>
            <Row style={{ width: '100%' }} justify="space-around" align="middle">
              <Col span={10}>
                <span>Decimals :</span>
              </Col>
              <Col span={14}>18</Col>
            </Row>
          </Space>
        </div>
      </div>

      <div style={functionsListStyle}>
        {/* <div
          style={{ cursor: 'pointer' }}
          onClick={() => {
            // navigateTo('/sendToken');
            navigateTo(`/sendToken?tokenAddress=${search.get('tokenAddress')}`);
          }}>
          <ArrowRightOutlined rotate={-45} style={iconButtonStyle} />
          <p style={{ marginTop: 5 }}>Send</p>
        </div> */}
        <div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              cursor: 'pointer',
              width: 40,
              height: 40,
              borderRadius: '50%',
              backgroundColor: '#0376c9',
            }}
            onClick={() => {
              // navigateTo('/sendToken');
              navigateTo(`/sendToken`);
            }}>
            <ArrowRightOutlined rotate={-45} style={iconButtonStyle} />
          </div>
          <p style={{ marginTop: 2 }}>Send</p>
        </div>
      </div>

      <Divider />

      <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#000000' }}>
        Transactions:
      </span>

      <div style={{ color: '#000000' }}>
        {recordList.length === 0 ? (
          <span style={{ fontSize: 15 }}>No Data</span>
        ) : (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              color: '#000000',
              marginTop: 30,
              height: 400,
              overflowY: 'auto',
            }}>
            {recordList &&
              recordList.map((row, index) => (
                <Space
                  key={index}
                  direction="vertical"
                  size="small"
                  style={{
                    display: 'flex',
                    width: '100%',
                    paddingTop: 30,
                    paddingBottom: 30,
                    borderBottom: '1px solid #D3D3D3',
                  }}>
                  <Row justify="space-between" align="bottom">
                    <Col span={10}>
                      <span>Sender : </span>
                    </Col>
                    <Col span={14}>
                      <CopyToClipLong address={row.sender || ''} />
                    </Col>
                  </Row>
                  {row.user_operation_hash && (
                    <Row justify="space-between" align="bottom">
                      <Col span={10}>
                        <span>User operation hash : </span>
                      </Col>
                      <Col span={14}>
                        <span>{row.user_operation_hash && moveToUserOperationScan(row.user_operation_hash)}</span>
                      </Col>
                    </Row>
                  )}
                  {row.tx_hash && (
                    <Row justify="space-between" align="bottom">
                      <Col span={10}>
                        <span>Transaction hash : </span>
                      </Col>
                      <Col span={14}>
                        <span>{row.tx_hash && moveToBlockScan(row.tx_hash)}</span>
                      </Col>
                    </Row>
                  )}
                  <Row justify="space-between" align="bottom">
                    <Col span={10}>
                      <span>Status : </span>
                    </Col>
                    <Col span={12}>
                      <span>{GetStatus(row.status)} </span>
                    </Col>
                  </Row>
                </Space>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Overview;
