/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from 'react';
import { ArrowRightOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import TokensOverview from '@/components/TokensOverview';
import { useNavigate } from 'react-router-dom';
import { GetNativeToken } from '@/actions/Token/token';
import { getUserInfo } from '@/utils/localStorage';
import { ethers } from 'ethers';
import { Link } from 'react-router-dom';

const balanceStyle: React.CSSProperties = {
  textAlign: 'center',
  fontSize: '30px',
  fontWeight: 'bold',
  color: '#000000',
  marginTop: '50px',
};

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
};

const menuStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  backgroundColor: 'transparent',
};

const listStyle: React.CSSProperties = {
  marginTop: '10px',
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  fontSize: '15px',
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
  ];

  const [current, setCurrent] = React.useState('tokens');
  const [generalNativeAmount, setGeneralNativeAmount] = React.useState('0');
  const [multisigNativeAmount, setMultisigNativeAmount] = React.useState('0');
  const [generalErc20Info, setGeneralErc20Info] = React.useState({} as any);
  const [multisigErc20Info, setMultisigErc20Info] = React.useState({} as any);

  useEffect(() => {
    async function loadData() {
      const res = await GetNativeToken();
      // console.log('---data--', data);
      if (res.code === 200) {
        setGeneralNativeAmount(res.data.abstract_account.Native);
        setMultisigNativeAmount(
          res.data.multiple_abstract_account.Native === '' ? '0' : res.data.multiple_abstract_account.Native
        );
        setGeneralErc20Info(res.data.abstract_account.Erc20);
        setMultisigErc20Info(res.data.multiple_abstract_account.Erc20);
      }
    }
    loadData();
    console.log('AbstractAccount', getUserInfo());
  }, []);

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };

  return (
    <div>
      <div style={{ color: '#000000', marginTop: '20px' }}>
        <span>General: {getUserInfo().abstractAccount}</span>
        <br></br>
        <span>Multisig: {getUserInfo().multipleAccount}</span>
      </div>
      <div style={balanceStyle}>
        {ethers.formatEther(generalNativeAmount).replace(/^(.*\..{4}).*$/, '$1')} <span>(general)</span>
      </div>
      <div style={balanceStyle}>
        {ethers.formatEther(multisigNativeAmount).replace(/^(.*\..{4}).*$/, '$1')} <span>(multisig)</span>
      </div>
      <div style={functionsListStyle}>
        <div
          style={{ cursor: 'pointer' }}
          onClick={() => {
            navigateTo(`/sendToken`);
          }}>
          <ArrowRightOutlined rotate={-45} style={iconButtonStyle} />
          <p style={{ marginTop: 5 }}>Send</p>
        </div>
      </div>
      <div style={{ marginTop: 15 }}>
        <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} style={menuStyle} />
        <div style={{ marginTop: 40 }}>
          {generalErc20Info && <TokensOverview ercInfo={generalErc20Info} type="general" />}
          {multisigErc20Info && <TokensOverview ercInfo={multisigErc20Info} type="multisig" />}
        </div>
        <div style={listStyle}>
          <Link to="/addToken">Import tokens</Link>
        </div>
      </div>
    </div>
  );
};

export default Overview;
