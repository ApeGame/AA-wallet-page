import React, { useState } from 'react';

import { Layout, theme } from 'antd';
import { Outlet } from 'react-router-dom';
import MainMenu from '@/components/MainMenu';
import MainHeader from '@/components/Header';

const { Header, Content, Footer, Sider } = Layout;

const View: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* left sider */}
      <Sider width={'300px'} collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="logo" />
        <MainMenu></MainMenu>
      </Sider>
      {/* right content */}
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <MainHeader />
        </Header>
        <Content style={{ margin: '16px 16px 0px', padding: 24, minHeight: 360, background: colorBgContainer }}>
          <Outlet />
        </Content>
        <Footer style={{ textAlign: 'center', padding: 0, lineHeight: '48px' }}>CDBC</Footer>
      </Layout>
    </Layout>
  );
};

export default View;
