/* eslint-disable react-refresh/only-export-components */
import React, { useEffect } from 'react';
import { Col, Row, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import AccountListDialog from '../Account/accountList';
import { observer } from 'mobx-react';
import SwitchNetworkDialog from '@/components/Network/switchNetwork';
import { getCurrentNetworkWithStorage } from '../Account/hooks/chainConfig';
import logoIcon from '../../../public/logo.svg';

import '@/assets/styles/accountStyle/style.scss';

const ContentHeader = () => {
  const [switchNetworkFlag, setSwitchNetworkFlag] = React.useState(false);
  const handleSwitchNetworkClose = () => {
    setSwitchNetworkFlag(false);
  };

  useEffect(() => {
    console.log('load networks');
  }, []);

  return (
    <>
      <SwitchNetworkDialog isOpen={switchNetworkFlag} onClose={handleSwitchNetworkClose} />
      <Row>
        <Col span={9} style={{ display: 'flex', alignItems: 'center', height: 80 }}>
          <img style={{ height: 40, width: 40 }} src={logoIcon} alt="" />
        </Col>
        <Col span={11} style={{ display: 'flex', alignItems: 'center', height: 80 }}>
          <div
            onClick={() => {
              setSwitchNetworkFlag(true);
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              height: 40,
              borderRadius: '50px',
              border: '1.5px solid #EFEFEF',
            }}>
            <div style={{ display: 'flex', alignItems: 'center', paddingLeft: 3 }}>
              <Space>
                <div style={{ height: 30, width: 30, display: 'flex', alignItems: 'center', paddingLeft: 5 }}>
                  {getCurrentNetworkWithStorage().icon}
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>{getCurrentNetworkWithStorage().name}</div>
              </Space>
            </div>
            <div style={{ paddingLeft: 15, paddingRight: 10 }}>
              <DownOutlined />
            </div>
          </div>
        </Col>
        <Col span={4} style={{ display: 'flex', alignItems: 'center', height: 80, paddingLeft: 5 }}>
          {/* <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: 50,
              height: 50,
              borderRadius: '50%',
              background: '#E0E0E0',
            }}>
            <span style={{ fontSize: 20 }}>{getUserInfo().username && getUserInfo().username[0]}</span>
          </div> */}
          <AccountListDialog />
        </Col>
      </Row>
      {/* <Row>
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
              <span style={{ fontWeight: 'bold', color: '#000000' }}>{getCurrentNetworkWithStorage().name[0]}</span>
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
      </Row> */}
    </>
  );
};

export default observer(ContentHeader);
