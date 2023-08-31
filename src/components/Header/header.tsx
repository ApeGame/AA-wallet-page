/* eslint-disable react-refresh/only-export-components */
import React, { useEffect } from 'react';
import { Col, Row } from 'antd';
import { LogoutOutlined, HomeOutlined, DownOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import AccountListDialog from '../Account/accountList';
import { getJWTToken } from '@/utils/localStorage';
import { observer } from 'mobx-react';
import SwitchNetworkDialog from '@/components/Network/switchNetwork';
import { removeUserInfo } from '@/utils/localStorage';
// import { getCurrentNetwork } from '@/utils/localStorage';
// import { getNetworkByName } from '@/components/Account/hooks/chainConfig';
import { AccountStore } from '@/store/account';

const headerStyle: React.CSSProperties = {
  color: '#000000',
  height: 65,
  backgroundColor: '#FFFFFF',
};

const titleStyle: React.CSSProperties = {
  textAlign: 'center',
  fontSize: '16px',
  fontWeight: 'bold',
  height: 65,
};

const moreStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'row-reverse',
  cursor: 'pointer',
  height: 65,
};

const ContentHeader = () => {
  const navigateTo = useNavigate();

  const [switchNetworkFlag, setSwitchNetworkFlag] = React.useState(false);
  const handleSwitchNetworkClose = () => {
    setSwitchNetworkFlag(false);
  };

  const loginOut = () => {
    removeUserInfo();
    navigateTo('/login');
  };

  useEffect(() => {
    console.log('load networks');
  }, []);

  return (
    <div style={headerStyle}>
      <SwitchNetworkDialog isOpen={switchNetworkFlag} onClose={handleSwitchNetworkClose} />
      <Row>
        <Col span={4} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }}>
          <div
            onClick={() => {
              setSwitchNetworkFlag(true);
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#E6F0FA',
              height: 35,
              width: 100,
              borderRadius: '15px',
            }}>
            <div style={{ padding: 5 }}>
              <span style={{ fontWeight: 'bold', color: '#000000' }}>
                {AccountStore.getCurrentNetworkWithStorage().name[0]}
              </span>
              &nbsp; <DownOutlined />
            </div>
          </div>
        </Col>
        <Col span={14} style={titleStyle}>
          {getJWTToken() ? <AccountListDialog /> : <div>Please login</div>}
        </Col>

        <Col span={2} style={moreStyle}>
          <HomeOutlined
            onClick={() => {
              navigateTo('/overview');
              // window.location.reload();
              AccountStore.loadUserData();
            }}
          />
        </Col>
        <Col span={2} style={moreStyle}>
          <LogoutOutlined onClick={loginOut} />
        </Col>
      </Row>
    </div>
  );
};

export default observer(ContentHeader);
