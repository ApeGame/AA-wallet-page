/* eslint-disable react-refresh/only-export-components */
import React from 'react';
import { Col, Row } from 'antd';
import { LogoutOutlined, BlockOutlined, HomeOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import AccountListDialog from '../Account/accountList';
import { getJWTToken } from '@/utils/localStorage';

const headerStyle: React.CSSProperties = {
  color: '#000000',
  height: 65,
  backgroundColor: '#FFFFFF',
};

const titleStyle: React.CSSProperties = {
  textAlign: 'center',
  fontSize: '16px',
  fontWeight: 'bold',
};

const networkStyle: React.CSSProperties = {
  textAlign: 'center',
  fontSize: '0.1px',
  fontWeight: 'bold',
};

const moreStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'row-reverse',
  cursor: 'pointer',
};

const ContentHeader = () => {
  const navigateTo = useNavigate();

  const loginOut = () => {
    localStorage.clear();
    navigateTo('/login');
  };

  return (
    <div style={headerStyle}>
      <Row>
        <Col span={2} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <p style={networkStyle}>BAS</p>
        </Col>
        <Col span={14} style={titleStyle}>
          {getJWTToken() && <AccountListDialog />}
        </Col>

        <Col span={2} style={moreStyle}>
          <HomeOutlined
            onClick={() => {
              navigateTo('/overview');
            }}
          />
        </Col>
        <Col span={2} style={moreStyle}>
          <BlockOutlined
            onClick={() => {
              navigateTo('/multisigWallet');
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

export default ContentHeader;
