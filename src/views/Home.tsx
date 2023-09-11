import React from 'react';

import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import ContentHeader from '@/components/Header/header';
import { FacebookProvider } from 'react-facebook';

import '@/assets/styles/global.css';

const headerStyle: React.CSSProperties = {
  height: 80,
  backgroundColor: '#FFFFFF',
  paddingInline: 15,
  fontFamily: 'Poppins',
};

const contentStyle: React.CSSProperties = {
  textAlign: 'center',
  height: 830,
  color: '#fff',
  backgroundColor: '#',
  overflowY: 'auto',
  fontFamily: 'Poppins',
};

const pageStyle: React.CSSProperties = {
  marginTop: 100,
  maxWidth: 460,
  border: 'solid #eee thin',
  fontFamily: 'Poppins',
};

const pageMobileStyle: React.CSSProperties = {
  maxWidth: 460,
  border: 'solid #eee thin',
  fontFamily: 'Poppins',
};

const View: React.FC = () => {
  const { Header, Content } = Layout;

  return (
    <FacebookProvider appId={import.meta.env.VITE_FACEBOOK_ID}>
      <Layout style={window.screen.width >= 500 ? pageStyle : pageMobileStyle}>
        <Header style={headerStyle}>
          <ContentHeader />
        </Header>
        <Content style={contentStyle}>
          <Outlet></Outlet>
        </Content>
      </Layout>
    </FacebookProvider>
  );
};

export default View;
