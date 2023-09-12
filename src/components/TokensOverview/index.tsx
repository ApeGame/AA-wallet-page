import React from 'react';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react';
import { Col, Row, Space } from 'antd';
import { formatWeiToEth } from '@/utils/formatterEth';
import { AccountStore } from '@/store/account';
import { Link } from 'react-router-dom';
import { getCurrentNetworkWithStorage } from '../Account/hooks/chainConfig';

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
        <div style={{ height: 330, overflowY: 'auto', width: '100%' }}>
          {AccountStore.currentAccount.nativeBalance && (
            <div
              className="tokenSelect"
              onClick={() => {
                navigateTo(`/nativeTokenOverview`);
              }}>
              <Row
                style={{ height: 90, padding: 0, display: 'flex', alignContent: 'center', backgroundColor: '#FFFFFF' }}>
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
                        width: 40,
                        height: 40,
                        borderRadius: '50%',
                        background:
                          'linear-gradient(to right, #b8cbb8 0%, #b8cbb8 0%, #b465da 0%, #cf6cc9 33%, #ee609c 66%, #ee609c 100%)',
                      }}>
                      <span style={{ color: '#FFFFFF' }}>
                        {getCurrentNetworkWithStorage().symbol && getCurrentNetworkWithStorage().symbol[0]}
                      </span>
                    </div>

                    <span style={{ marginLeft: 15, fontSize: 20, fontWeight: 500 }}>
                      {getCurrentNetworkWithStorage().symbol}
                    </span>
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
                  <span
                    style={{
                      color: '#ee609c',
                      fontSize: 20,
                    }}>
                    {formatWeiToEth(AccountStore.currentAccount.nativeBalance) +
                      ' ' +
                      getCurrentNetworkWithStorage().symbol}
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
                  <Row
                    style={{
                      height: 90,
                      padding: 0,
                      display: 'flex',
                      alignContent: 'center',
                      backgroundColor: '#FFFFFF',
                      marginTop: 2,
                    }}>
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
                              width: 40,
                              height: 40,
                              borderRadius: '50%',
                              background: 'linear-gradient(to top, #0ba360 0%, #3cba92 100%)',
                              color: '#FFFFFF',
                            }}>
                            <span>{AccountStore.currentAccount.erc20AccountMap[key].name[0]}</span>
                          </div>
                        )}
                        <span style={{ marginLeft: 15, fontSize: 20, fontWeight: 500 }}>
                          {AccountStore.currentAccount.erc20AccountMap[key].name}
                        </span>
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
                      <span style={{ color: '#3cba92', fontSize: 20 }}>
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
          <Space>
            <span style={{ fontSize: 15 }}>Don't see your token?</span>
            <Link to="/addToken">Import tokens</Link>
          </Space>
        </div>
      </div>
    </div>
  );
};

export default observer(Comp);
