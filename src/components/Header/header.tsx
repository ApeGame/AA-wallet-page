import React from 'react';
import { Col, Row } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { getUserInfo } from '@/utils/localStorage';

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
        <Col span={4} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <p style={networkStyle}>BAS</p>
        </Col>
        <Col span={16} style={titleStyle}>
          {getUserInfo()}
        </Col>
        <Col span={4} style={moreStyle}>
          <LogoutOutlined onClick={loginOut} />
        </Col>
      </Row>
    </div>
  );
};

export default ContentHeader;
