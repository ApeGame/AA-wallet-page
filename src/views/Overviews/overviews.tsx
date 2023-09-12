/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from 'react';
import { ArrowRightOutlined } from '@ant-design/icons';
import { MenuProps, Menu, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { AccountStore } from '@/store/account';
import { CopyToClipLong } from '@/components/CopyToClip/CopyToClip';
import { observer } from 'mobx-react';
import TokensOverview from '@/components/TokensOverview';
import MultisigWallet from '@/components/MultisigWallet';
import NftOverview from '@/components/Nft';
import Activity from '@/components/Activity';
import { formatWeiToEth } from '@/utils/formatterEth';
import { getUserRecoverEmail } from '@/utils/localStorage';
import { useInterval } from '@/hooks/useInterval';
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

const menuStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  backgroundColor: '#FFFFFF',
};

const balanceStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#000000',
  fontSize: 35,
  fontWeight: 600,
};

const Overview = () => {
  const navigateTo = useNavigate();

  const [messageApi, contextHolder] = message.useMessage();

  const items: MenuProps['items'] = [
    {
      label: 'Tokens',
      key: 'tokens',
    },
    {
      label: 'NFTs',
      key: 'nfts',
    },
    {
      label: 'Activity',
      key: 'activity',
    },
    {
      label: 'Multisig Wallet',
      key: 'multisig',
    },
  ];

  const [current, setCurrent] = React.useState('tokens');

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };

  useInterval(async () => {
    setTimeout(async () => {
      console.log('overview useInterval load');
      AccountStore.loadUserData();
    }, 30 * 1000);
  }, 30 * 1000);

  useInterval(async () => {
    setTimeout(async () => {
      if (!getUserRecoverEmail()) {
        messageApi.warning('please add your recover email, click your account to check it');
      }
    }, 30 * 1000);
  }, 30 * 1000);

  useEffect(() => {
    // console.log('overview load');
    AccountStore.loadUserData();
  }, []);

  return (
    <div>
      {contextHolder}
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
            <div style={{ marginTop: 70, height: 170 }}>
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
          {/* <div style={addressStyle}>
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
              {formatWeiToEth(AccountStore.currentAccount.nativeBalance)} {' ' + getCurrentNetworkWithStorage().symbol}
            </div>
          )} */}
        </>
      )}

      <div>
        <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} style={menuStyle} />
        {current === 'tokens' && <TokensOverview />}
        {current === 'nfts' && <NftOverview />}
        {current === 'multisig' && <MultisigWallet />}
        {current === 'activity' && <Activity />}
      </div>
    </div>
  );
};

export default observer(Overview);
