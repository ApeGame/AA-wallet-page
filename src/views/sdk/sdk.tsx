import React from 'react';

import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import { FacebookProvider } from 'react-facebook';
import { GoogleOAuthProvider } from '@react-oauth/google';

import '@/assets/styles/global.css';


const contentStyle: React.CSSProperties = {
  textAlign: 'center',
  height: 775,
  color: '#fff',
  backgroundColor: '#',
  overflowY: 'auto',
};

const sdkpageStyle: React.CSSProperties = {
  marginTop: 0,
  maxWidth: 420,
  border: 'solid #eee thin',
};

const pageMobileStyle: React.CSSProperties = {
  maxWidth: 420,
  border: 'solid #eee thin',
};

const View: React.FC = () => {
  const { Content } = Layout;

  return (
    <FacebookProvider appId={import.meta.env.VITE_FACEBOOK_ID}>
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_ID}>
            <Layout style={window.screen.width >= 500 ? sdkpageStyle : pageMobileStyle}>
                <Content style={contentStyle}>
                <Outlet></Outlet>
                </Content>
            </Layout>
      </GoogleOAuthProvider>
    </FacebookProvider>
  );
};

export default View;
