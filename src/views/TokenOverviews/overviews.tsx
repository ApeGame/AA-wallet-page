/* eslint-disable react-hooks/exhaustive-deps */
import { ArrowRightOutlined, LeftOutlined, EllipsisOutlined, InfoCircleFilled, LineOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { ActivityRecord } from '@/model/multisig';
import { Space, Divider, Col, Row, Dropdown, message } from 'antd';
import { CopyToClipLong } from '@/components/CopyToClip/CopyToClip';
// import { truncateWalletAddrLong } from '@/utils/truncateWalletAddr';
import { GetMultisigHistoryListErc } from '@/actions/MultisigWallet/multisigWallet';
import { Activity } from '@/components/Activity/activity';
import { observer } from 'mobx-react';
import { AccountStore } from '@/store/account';
import { formatWeiToEth } from '@/utils/formatterEth';
import type { MenuProps } from 'antd';
import { TokenDetails } from '@/components/TokensOverview/tokenDetails';
import { DeleteToken } from '@/actions/Token/token';

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

const addressStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: '30px',
  color: '#0376C9',
};

const balanceStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: '30px',
  color: '#000000',
  fontWeight: 'bold',
  fontSize: 25,
};

const Overview = () => {
  const navigateTo = useNavigate();

  const [search] = useSearchParams();

  const [recordList, setRecordList] = useState<ActivityRecord[]>([]);

  const [messageApi, contextHolder] = message.useMessage();

  const loadData = async () => {
    setRecordList([]);
    const multisigRecordListRes = await GetMultisigHistoryListErc(search.get('tokenAddress') || '');
    if (multisigRecordListRes.code === 200 && multisigRecordListRes.data) {
      console.log('multisigRecordListRes.data', multisigRecordListRes.data);
      setRecordList(
        multisigRecordListRes.data.map((item) => {
          return item;
        })
      );
    }
  };

  const [checkFlag, setCheckFlag] = useState(false);
  const handleCheckActivityClose = () => {
    setCheckFlag(false);
  };

  useEffect(() => {
    // load
    loadData();
    AccountStore.loadUserData();
  }, []);

  useEffect(() => {
    console.log('!!!', search.get('tokenAddress'));
  }, [search]);

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <Space
          onClick={() => {
            setCheckFlag(true);
          }}>
          <InfoCircleFilled />
          <span>token details</span>
        </Space>
      ),
    },
    {
      key: '2',
      label: (
        <Space
          onClick={async () => {
            const res = await DeleteToken(search.get('tokenAddress') || '');
            if (res.code === 200) {
              setTimeout(() => navigateTo('/overview'), 700);
              messageApi.success('Complete');
            } else {
              messageApi.error(res.data);
            }
          }}>
          <LineOutlined />
          <span>Hide</span>
        </Space>
      ),
    },
  ];

  return (
    <div>
      {contextHolder}
      <TokenDetails
        isOpen={checkFlag}
        onClose={handleCheckActivityClose}
        tokenAddress={search.get('tokenAddress') || ''}
      />
      <Row style={{ color: '#000000', marginTop: 35, paddingLeft: 30, paddingRight: 30 }}>
        <Col span={12}>
          <div
            style={{ display: 'flex', flexDirection: 'row' }}
            onClick={() => {
              navigateTo('/overview');
            }}>
            <LeftOutlined />
          </div>
        </Col>
        <Col span={12}>
          <div style={{ display: 'flex', flexDirection: 'row-reverse', width: '40' }}>
            <Dropdown menu={{ items }}>
              <EllipsisOutlined />
            </Dropdown>
          </div>
        </Col>
      </Row>

      {/* <div
        style={backStyle}
        onClick={() => {
          navigateTo('/overview');
        }}>
        <LeftOutlined />
      </div>
      <div
        style={{}}
        onClick={() => {
          navigateTo('/overview');
        }}>
        <LeftOutlined />
      </div> */}
      <div style={{ marginTop: 30 }}>
        {/* {search.get('tokenAddress') && <div style={balanceStyle}>Token Address</div>}
        <div style={balanceStyle}>{search.get('tokenAddress')}</div> */}
        {AccountStore.currentAccount && (
          <>
            <div style={addressStyle}>
              <div style={{ width: '55%', backgroundColor: '#E6F0FA', padding: 15, borderRadius: '15px' }}>
                <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
                  {AccountStore.currentAccount.address && (
                    <CopyToClipLong address={AccountStore.currentAccount.address || ''} />
                  )}
                  <span style={{ color: '#000000' }}>
                    {AccountStore.currentAccount.isMultisig ? '(Multisig Account)' : '(Abstract Account)'}
                  </span>
                </Space>
              </div>
            </div>
            {AccountStore.currentAccount.nativeBalance && (
              <div style={balanceStyle}>
                {search.get('tokenAddress') &&
                  AccountStore.currentAccount.erc20AccountMap[search.get('tokenAddress') || ''] &&
                  formatWeiToEth(
                    AccountStore.currentAccount.erc20AccountMap[search.get('tokenAddress') || ''].balance
                  )}{' '}
                {' ' + search.get('tokenAddress') &&
                  AccountStore.currentAccount.erc20AccountMap[search.get('tokenAddress') || ''] &&
                  AccountStore.currentAccount.erc20AccountMap[search.get('tokenAddress') || ''].symbol}
              </div>
            )}
          </>
        )}
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
              navigateTo(`/sendToken?tokenAddress=${search.get('tokenAddress')}`);
            }}>
            <ArrowRightOutlined rotate={-45} style={iconButtonStyle} />
          </div>
          <p style={{ marginTop: 2 }}>Send</p>
        </div>
      </div>

      <Divider />

      {/* <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#000000' }}>
        Transactions:
      </span> */}

      <div style={{ color: '#000000' }}>
        {recordList.length === 0 ? (
          <span style={{ fontSize: 15 }}>No Data</span>
        ) : (
          <div
            style={{
              color: '#000000',
              marginTop: 15,
              height: 400,
              overflowY: 'auto',
            }}>
            {recordList &&
              recordList.map((row, index) => (
                <Activity activityRecord={row} key={index} />
                // <Space
                //   key={index}
                //   direction="vertical"
                //   size="small"
                //   style={{
                //     display: 'flex',
                //     width: '100%',
                //     paddingTop: 10,
                //     paddingBottom: 10,
                //     borderBottom: '1px solid #D3D3D3',
                //   }}>
                //   <Row justify="space-between" align="bottom">
                //     <Col span={10}>
                //       <span>Sender : </span>
                //     </Col>
                //     <Col span={14}>
                //       <CopyToClipLong address={row.sender || ''} />
                //     </Col>
                //   </Row>
                //   {row.user_operation_hash && (
                //     <Row justify="space-between" align="bottom">
                //       <Col span={10}>
                //         <span>User operation hash : </span>
                //       </Col>
                //       <Col span={14}>
                //         <span>{row.user_operation_hash && moveToUserOperationScan(row.user_operation_hash)}</span>
                //       </Col>
                //     </Row>
                //   )}
                //   {row.transaction_hash && (
                //     <Row justify="space-between" align="bottom">
                //       <Col span={10}>
                //         <span>Transaction hash : </span>
                //       </Col>
                //       <Col span={14}>
                //         <span>{row.transaction_hash && moveToBlockScan(row.transaction_hash)}</span>
                //       </Col>
                //     </Row>
                //   )}
                //   <Row justify="space-between" align="bottom">
                //     <Col span={10}>
                //       <span>Status : </span>
                //     </Col>
                //     <Col span={12}>
                //       <span>{GetStatus(row.status)} </span>
                //     </Col>
                //   </Row>
                // </Space>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default observer(Overview);
