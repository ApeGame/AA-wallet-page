/* eslint-disable react-hooks/exhaustive-deps */
import { ArrowRightOutlined, LeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { ActivityRecord } from '@/model/multisig';
import { Space, Divider } from 'antd';
import { CopyToClipLong } from '@/components/CopyToClip/CopyToClip';
// import { truncateWalletAddrLong } from '@/utils/truncateWalletAddr';
import { GetMultisigHistoryListErc } from '@/actions/MultisigWallet/multisigWallet';
import { Activity } from '@/components/Activity/activity';
import { observer } from 'mobx-react';
import { AccountStore } from '@/store/account';
import { formatWeiToEth } from '@/utils/formatterEth';
import { GetAccountAsset } from '@/actions/Token/token';
import { getCurrentAddress } from '@/utils/localStorage';
import { GetUser } from '@/actions/User/user';
import { setUserRecoverEmail } from '@/utils/localStorage';

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

  const loadAccountData = async () => {
    // account
    const res = await GetAccountAsset();
    // const addressSet = new Set();
    if (res.code === 200) {
      AccountStore.clearAccountList();
      // AccountStore.clearCurrentAccount();
      if (res.data.abstract_account) {
        AccountStore.pushAccount({
          address: res.data.abstract_account.Address,
          erc20AccountMap: res.data.abstract_account.Erc20,
          nativeBalance: res.data.abstract_account.Native,
          isMultisig: false,
          isUpdate: false,
          name: res.data.abstract_account.Name,
        });
        console.log('pushAccount_abstract_account', {
          address: res.data.abstract_account.Address,
          erc20AccountMap: res.data.abstract_account.Erc20,
          nativeBalance: res.data.abstract_account.Native,
          isMultisig: false,
          isUpdate: false,
          name: res.data.abstract_account.Name,
        });
      }
      if (res.data.multiple_abstract_account) {
        res.data.multiple_abstract_account.map((item) => {
          // if (!addressSet.has(item.Address)) {
          AccountStore.pushAccount({
            address: item.Address,
            erc20AccountMap: item.Erc20,
            nativeBalance: item.Native,
            isMultisig: true,
            isUpdate: false,
            name: item.Name,
          });
          // }
          // addressSet.add(item.Address);
        });
      }

      if (getCurrentAddress()) {
        const currentWalletAddress = AccountStore.getAccountByAddress(getCurrentAddress());
        console.log('currentWalletAddress', currentWalletAddress.address);
        console.log('getCurrentAddress', getCurrentAddress());
        if (currentWalletAddress.address) {
          AccountStore.setCurrentAccount(currentWalletAddress);
        }
      } else {
        AccountStore.setCurrentAccount({
          address: res.data.abstract_account.Address,
          erc20AccountMap: res.data.abstract_account.Erc20,
          nativeBalance: res.data.abstract_account.Native,
          isMultisig: false,
          isUpdate: false,
          name: res.data.abstract_account.Name,
        });
      }
    }
    const userRes = await GetUser();
    console.log('GetUser res', userRes);
    if (userRes.code === 200) {
      console.log('res.data.recover_email', userRes.data.recover_email);
      setUserRecoverEmail(userRes.data.recover_email);
    }
  };

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

  useEffect(() => {
    // load
    loadData();
    loadAccountData();
  }, []);

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
