import React from 'react';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react';
import { Col, Row } from 'antd';
import { formatWeiToEth } from '@/utils/formatterEth';
import { AccountStore } from '@/store/account';
import { Link } from 'react-router-dom';

import '@/assets/styles/accountStyle/style.scss';

const contentStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#000000',
  flexDirection: 'column',
  width: '100%',
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
        <div style={{ height: 370, overflowY: 'auto', width: '100%' }}>
          {AccountStore.currentAccount.nativeBalance && (
            <div
              className="tokenSelect"
              onClick={() => {
                navigateTo(`/nativeTokenOverview`);
              }}>
              <Row style={{ height: 90, padding: 0, display: 'flex', alignContent: 'center' }}>
                <Col span={14} style={{ fontWeight: 'bold', fontSize: 16, paddingLeft: 25 }}>
                  <span
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      fontWeight: 'bold',
                      fontSize: 16,
                    }}>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: 47,
                        height: 47,
                        borderRadius: '50%',
                        background: 'linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)',
                      }}>
                      <span>
                        {AccountStore.getCurrentNetworkWithStorage().symbol &&
                          AccountStore.getCurrentNetworkWithStorage().symbol[0]}
                      </span>
                    </div>

                    <span style={{ marginLeft: 15 }}>{AccountStore.getCurrentNetworkWithStorage().symbol}</span>
                  </span>
                </Col>
                <Col
                  span={10}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'row-reverse',
                    paddingRight: 25,
                  }}>
                  <span>
                    {formatWeiToEth(AccountStore.currentAccount.nativeBalance) +
                      ' ' +
                      AccountStore.getCurrentNetworkWithStorage().symbol}
                  </span>
                </Col>
              </Row>
            </div>
          )}
          {AccountStore.currentAccount.erc20AccountMap &&
            Object.keys(AccountStore.currentAccount.erc20AccountMap).map((key, index) => {
              return (
                <div
                  key={index}
                  className="tokenSelect"
                  onClick={() => {
                    navigateTo(`/tokenOverview?tokenAddress=${key}`);
                  }}>
                  <Row style={{ height: 90, padding: 0, display: 'flex', alignContent: 'center' }}>
                    <Col span={14} style={{ fontWeight: 'bold', fontSize: 16, paddingLeft: 25 }}>
                      <span
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          fontWeight: 'bold',
                          fontSize: 16,
                        }}>
                        {/* <MehOutlined style={{ color: '#627EEA', fontWeight: 'bold', fontSize: 25 }} /> */}
                        {AccountStore.currentAccount.erc20AccountMap[key].name && (
                          <div
                            style={{
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                              width: 47,
                              height: 47,
                              borderRadius: '50%',
                              background: 'linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)',
                            }}>
                            <span>{AccountStore.currentAccount.erc20AccountMap[key].name[0]}</span>
                          </div>
                        )}
                        <span style={{ marginLeft: 15 }}>{AccountStore.currentAccount.erc20AccountMap[key].name}</span>
                      </span>

                      {/* <span style={{ fontSize: 17 }}>{truncateWalletAddrLong(key)}</span> */}
                    </Col>
                    <Col
                      span={10}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        flexDirection: 'row-reverse',
                        paddingRight: 25,
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
