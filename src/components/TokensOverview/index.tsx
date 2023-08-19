import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';

const contentStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#000000',
  flexDirection: 'column',
};

const typeStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#000000',
  fontSize: '14px',
  fontWeight: 'bold',
};

const Comp = ({ ercInfo }: { ercInfo: Map<string, string> }) => {
  const navigateTo = useNavigate();

  useEffect(() => {
    console.log('ercInfo!!!', ercInfo);
  }, [ercInfo]);

  return (
    <div>
      <div style={contentStyle}>
        {Object.keys(ercInfo).map((key, index) => {
          return (
            // <>
            //   key is {key} value is {ercInfo[key]}
            // </>

            // <Row
            //   justify="space-around"
            //   align="middle"
            //   style={{ width: 320, cursor: 'pointer' }}
            //   onClick={() => {
            //     navigateTo('/tokenOverview');
            //   }}>
            //   <Col span={12} style={typeStyle}>
            //     {key}
            //   </Col>
            //   <Col span={12} style={{ color: '#545A60' }}>
            //     {ercInfo[key]}
            //   </Col>
            // </Row>

            <div
              key={index}
              style={{ cursor: 'pointer' }}
              onClick={() => {
                navigateTo(`/tokenOverview?tokenAddress=${key}`);
              }}>
              <span style={typeStyle}>{key}</span>
              <span style={{ color: '#545A60' }}>
                {ethers.formatEther(ercInfo[key]).replace(/^(.*\..{4}).*$/, '$1')}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Comp;
