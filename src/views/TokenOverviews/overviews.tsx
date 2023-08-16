import { ArrowRightOutlined, LeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import React, { useEffect } from 'react';

const balanceStyle: React.CSSProperties = {
  textAlign: 'center',
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

const backStyle: React.CSSProperties = {
  marginTop: 30,
  marginRight: 330,
  color: '#000000',
};

const Overview = () => {
  const navigateTo = useNavigate();

  const [search] = useSearchParams();

  useEffect(() => {
    console.log('!!!', search.get('tokenAddress'));
  }, [search]);

  return (
    <div>
      <div
        style={backStyle}
        onClick={() => {
          navigateTo('/overview');
        }}>
        <LeftOutlined />
      </div>
      <div style={balanceStyle}>{search.get('tokenAddress')}</div>
      <div style={functionsListStyle}>
        <div
          style={{ cursor: 'pointer' }}
          onClick={() => {
            // navigateTo('/sendToken');
            navigateTo(`/sendToken?tokenAddress=${search.get('tokenAddress')}`);
          }}>
          <ArrowRightOutlined rotate={-45} style={iconButtonStyle} />
          <p style={{ marginTop: 5 }}>Send</p>
        </div>
      </div>
    </div>
  );
};

export default Overview;
