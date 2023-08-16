/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from 'react';
import { ArrowRightOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import TokensOverview from '@/components/TokensOverview';
import { useNavigate } from 'react-router-dom';
import { GetNativeToken } from '@/actions/Token/token';
import { getAbstractAccount } from '@/utils/localStorage';
import { ethers } from 'ethers';

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
  const [nativeAmount, setNativeAmount] = React.useState('0');
  const [erc20Info, setErc20Info] = React.useState({} as any);

  useEffect(() => {
    async function loadData() {
      const res = await GetNativeToken();
      // console.log('---data--', data);
      if (res.code === 200) {
        setNativeAmount(res.data.Native);
        setErc20Info(res.data.Erc20);
      }
    }
    loadData();
    console.log('AbstractAccount', getAbstractAccount());
  }, []);

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };

  return (
    <div>
      <div style={balanceStyle}>{ethers.formatEther(nativeAmount).replace(/^(.*\..{4}).*$/, '$1')} PEEL</div>
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
          <TokensOverview ercInfo={erc20Info} />
        </div>
      </div>
    </div>
  );
};

export default Overview;
