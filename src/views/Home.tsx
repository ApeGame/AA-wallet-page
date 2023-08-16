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
  height: 635,
  color: '#fff',
  backgroundColor: '#',
};

const LayoutStyle: React.CSSProperties = {
  marginTop: '200px',
  maxWidth: '400px',
};

const View: React.FC = () => {
  const { Header, Content } = Layout;

  return (
    <FacebookProvider appId="662645895414897">
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
