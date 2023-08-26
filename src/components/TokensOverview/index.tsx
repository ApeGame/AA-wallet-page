import React from 'react';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react';
import { Col, Row } from 'antd';
import { formatWeiToEth } from '@/utils/formatterEth';
import { AccountStore } from '@/store/account';
import { Link } from 'react-router-dom';
import { MehOutlined } from '@ant-design/icons';

import '@/assets/styles/accountStyle/style.scss';

const contentStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#000000',
  flexDirection: 'column',
  marginTop: 15,
};

const listStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  fontSize: '15px',
};

const Comp = () => {
  const navigateTo = useNavigate();

  return (
    <div>
      <div style={contentStyle}>
        <div style={{ height: 340, overflowY: 'auto' }}>
          {AccountStore.currentAccount.erc20AccountMap &&
            Object.keys(AccountStore.currentAccount.erc20AccountMap).map((key, index) => {
              return (
                <div
                  key={index}
                  className="accountContentSend"
                  onClick={() => {
                    navigateTo(`/tokenOverview?tokenAddress=${key}`);
                  }}>
                  <Row style={{ height: 45, width: 385 }}>
                    <Col span={14} style={{ fontWeight: 'bold', fontSize: 16, padding: 10 }}>
                      <span
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          fontWeight: 'bold',
                          fontSize: 16,
                        }}>
                        <MehOutlined style={{ color: '#627EEA', fontWeight: 'bold', fontSize: 25 }} />
                        <span style={{ marginLeft: 10 }}>{AccountStore.currentAccount.erc20AccountMap[key].name}</span>
                      </span>
                      <br />
                      {/* <span style={{ fontSize: 17 }}>{truncateWalletAddrLong(key)}</span> */}
                    </Col>
                    <Col
                      span={10}
                      style={{
                        display: 'flex',
                        flexDirection: 'row-reverse',
                        fontSize: 15,
                        marginTop: 12,
                        padding: 5,
                      }}>
                      <span>
                        {formatWeiToEth(AccountStore.currentAccount.erc20AccountMap[key].balance) +
                          ' ' +
                          AccountStore.currentAccount.erc20AccountMap[key].symbol}
                      </span>
                    </Col>
                  </Row>
                </div>
              );
            })}
        </div>

        <div style={listStyle}>
          <Link to="/addToken">Import tokens</Link>
        </div>
      </div>
    </div>
  );
};

export default observer(Comp);
