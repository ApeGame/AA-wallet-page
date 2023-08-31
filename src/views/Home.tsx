import React from 'react';

import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import ContentHeader from '@/components/Header/header';
import { FacebookProvider } from 'react-facebook';

const headerStyle: React.CSSProperties = {
  height: 65,
  backgroundColor: '#FFFFFF',
  paddingInline: 15,
};

const contentStyle: React.CSSProperties = {
  textAlign: 'center',
  height: 775,
  color: '#fff',
  backgroundColor: '#',
  overflowY: 'auto',
};

const LayoutStyle: React.CSSProperties = {
  marginTop: '150px',
  maxWidth: '420px',
  border: 'solid #eee thin',
};

const View: React.FC = () => {
  const { Header, Content } = Layout;

  return (
    <FacebookProvider appId={import.meta.env.VITE_FACEBOOK_ID}>
      <Layout style={LayoutStyle}>
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
