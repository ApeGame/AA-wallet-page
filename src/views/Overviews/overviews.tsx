/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from 'react';
import { ArrowRightOutlined } from '@ant-design/icons';
import { MenuProps, Menu, Space } from 'antd';
import { useNavigate } from 'react-router-dom';
import { AccountStore } from '@/store/account';
import { CopyToClipLong } from '@/components/CopyToClip/CopyToClip';
import { observer } from 'mobx-react';
import TokensOverview from '@/components/TokensOverview';
import { GetAccountAsset } from '@/actions/Token/token';
import MultisigWallet from '@/components/MultisigWallet';
import Activity from '@/components/Activity';
import { formatWeiToEth } from '@/utils/formatterEth';
import { GetUser } from '@/actions/User/user';
import { setUserRecoverEmail } from '@/utils/localStorage';
import { useInterval } from '@/hooks/useInterval';

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
  backgroundColor: 'transparent',
};

const addressStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: '45px',
  color: '#0376C9',
};

const balanceStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: '45px',
  color: '#000000',
  fontWeight: 'bold',
  fontSize: 25,
};

const Overview = () => {
  const navigateTo = useNavigate();

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
      loadData();
    }, 3 * 1000);
  }, 4000);

  const loadData = async () => {
    // account
    AccountStore.clearAccountList();
    const res = await GetAccountAsset();
    const addressSet = new Set();
    if (res.code === 200) {
      console.log('currentAccount', AccountStore.currentAccount.address);
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
        if (!AccountStore.currentAccount.address) {
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
          addressSet.add(item.Address);
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

  useEffect(() => {
    console.log('overview load');
    loadData();
    // if (!AccountStore.currentAccount) {
    //   AccountStore.setCurrentAccount(AccountStore.getAbstractAccount());
    // }
  }, [current]);

  return (
    <div>
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
            <div style={balanceStyle}>{formatWeiToEth(AccountStore.currentAccount.nativeBalance)} Peel</div>
          )}
        </>
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
      <div style={{ marginTop: 15 }}>
        <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} style={menuStyle} />

        {current === 'tokens' && <TokensOverview />}
        {current === 'multisig' && <MultisigWallet />}
        {current === 'activity' && <Activity />}
      </div>
    </div>
  );
};

export default observer(Overview);
