import { ArrowRightOutlined, LeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { ActivityRecord } from '@/model/multisig';
import { Divider } from 'antd';
import { GetMultisigHistoryListErc } from '@/actions/MultisigWallet/multisigWallet';
import { observer } from 'mobx-react';
import { AccountStore } from '@/store/account';
import { Activity } from '@/components/Activity/activity';
import { CopyToClipLong } from '@/components/CopyToClip/CopyToClip';
import { formatWeiToEth } from '@/utils/formatterEth';
import { getCurrentNetworkWithStorage } from '@/components/Account/hooks/chainConfig';

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
  marginRight: 380,
  paddingTop: 20,
  color: '#000000',
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

  const loadData = async () => {
    setRecordList([]);
    const multisigRecordListRes = await GetMultisigHistoryListErc('0x0000000000000000000000000000000000000000');
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
    AccountStore.loadUserData();
  }, []);

  useEffect(() => {
    console.log('!!!', search.get('tokenAddress'));
  }, [search]);

  return (
    <>
      <div style={{ backgroundColor: '#FFFFFF' }}>
        <div
          style={backStyle}
          onClick={() => {
            navigateTo('/overview');
          }}>
          <LeftOutlined />
        </div>
        <div style={{ marginTop: 20 }}>
          {AccountStore.currentAccount && (
            <>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#FFFFFF',
                  color: '#000000',
                  marginTop: 2,
                }}>
                <span
                  style={{
                    marginTop: 25,
                    fontSize: 21,
                    fontWeight: 500,
                    lineHeight: 'normal',
                  }}>
                  {AccountStore.currentAccount.name}
                  <span style={{ fontSize: 15, fontWeight: 500, lineHeight: 'normal' }}>
                    {AccountStore.currentAccount.isMultisig ? ' (Multisig Account)' : ' (Abstract Account)'}
                  </span>
                </span>
                <div style={{ marginBottom: 25, marginTop: 10, color: '#356DF3', fontSize: 17 }}>
                  <CopyToClipLong address={AccountStore.currentAccount.address || ''} />
                </div>
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  backgroundColor: '#FFFFFF',
                  color: '#000000',
                  marginTop: 2,
                }}>
                <div style={{ marginTop: 10, height: 170 }}>
                  {AccountStore.currentAccount.nativeBalance && (
                    <div style={balanceStyle}>
                      {formatWeiToEth(AccountStore.currentAccount.nativeBalance)}{' '}
                      {' ' + getCurrentNetworkWithStorage().symbol}
                    </div>
                  )}
                  <div style={functionsListStyle}>
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
                          navigateTo(`/sendToken`);
                        }}>
                        <ArrowRightOutlined rotate={-45} style={iconButtonStyle} />
                      </div>
                      <p style={{ marginTop: 2 }}>Send</p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
        <Divider />
      </div>
      <div style={{ color: '#000000' }}>
        {recordList.length === 0 ? (
          <span style={{ fontSize: 15 }}>No Data</span>
        ) : (
          <div
            style={{
              color: '#000000',
              height: 420,
              overflowY: 'auto',
            }}>
            {recordList && recordList.map((row, index) => <Activity activityRecord={row} key={index} />)}
          </div>
        )}
      </div>
    </>
  );
};

export default observer(Overview);
