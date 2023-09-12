import { Input, Button, Col, Row, Space, message } from 'antd';
import { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { AccountStore } from '@/store/account';
import classNames from 'classnames';
import { truncateWalletAddrLong } from '@/utils/truncateWalletAddr';
import SwitchPaymasterDialog from '@/components/TokensOverview/switchPaymaster';

import '@/assets/styles/accountStyle/style.scss';

const addressStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: '30px',
};

const View = () => {
  const [toAddress, setToAddress] = useState('');
  const [search] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const [switchPaymentFlag, setSwitchPaymentFlag] = useState(false);
  const handleSwitchPaymentFlagClose = () => {
    setSwitchPaymentFlag(false);
  };

  useEffect(() => {
    console.log('~', search.get('tokenAddress'), search.get('tokenId'));
  }, [search]);

  const selectAccount = (address: string) => {
    console.log('address', address);
    setToAddress(address);
  };

  const payment = () => {
    setIsLoading(true);

    setSwitchPaymentFlag(true);

    setIsLoading(false);
  };

  useEffect(() => {
    // load
    // loadAccountData();
    AccountStore.loadUserData();
  }, []);

  return (
    <div style={{ color: '#000000' }}>
      {contextHolder}
      <SwitchPaymasterDialog
        isOpen={switchPaymentFlag}
        onClose={handleSwitchPaymentFlagClose}
        toAmount={'0'}
        toAddress={toAddress}
        erc20Address={''}
        erc721Address={search.get('tokenAddress') || ''}
        tokenId={parseInt(search.get('tokenId') || '')}
      />
      <div style={{ color: '#000000', marginTop: 20 }}>
        <span style={{ fontSize: 18 }}>Send To</span>

        <Link to="/overview" style={{ marginLeft: '230px', fontSize: 18 }}>
          Back
        </Link>
      </div>

      <div>
        <div style={addressStyle}>
          <div style={{ height: 200, marginTop: 10, overflowY: 'auto', width: '100%', color: '#000000' }}>
            <span style={{ display: 'flex', marginLeft: 20, fontWeight: 'bolder', fontSize: 15 }}>Your accounts:</span>
            {AccountStore.accountList.map((row, index) => (
              <div
                className={classNames(
                  'accountContentSend',
                  row.address === AccountStore.currentAccount.address
                    ? 'accountContentSelectSend'
                    : 'accountContentSend'
                )}
                key={index}
                style={{ padding: 10, marginTop: 10 }}
                onClick={() => {
                  selectAccount(row.address);
                }}>
                <Row>
                  <Col span={5} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: 45,
                        height: 45,
                        borderRadius: '50%',
                        background: '#356DF3',
                        color: '#FFF',
                        fontSize: 25,
                        fontWeight: 700,
                      }}>
                      {row.name && row.name[0]}
                    </div>
                  </Col>
                  <Col span={19}>
                    <Space direction="vertical" size="large" style={{ display: 'flex' }}>
                      <Row>
                        <Col span={24} style={{ display: 'flex', flexDirection: 'row' }}>
                          <span style={{ fontSize: '15px', fontWeight: 'bold' }}>
                            {row.name ? row.name : 'Account'}
                            {row.isMultisig ? '(Multisig)' : '(Abstract)'}
                          </span>
                        </Col>
                      </Row>
                      <Row>
                        <Col span={24} style={{ display: 'flex' }}>
                          <span>{truncateWalletAddrLong(row.address)}</span>
                        </Col>
                      </Row>
                    </Space>
                  </Col>
                </Row>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 20 }}>
          <span style={{ display: 'flex', marginLeft: 20, fontWeight: 'bolder', fontSize: 15 }}>To address:</span>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              color: '#000000',
              padding: 10,
              marginTop: 10,
            }}>
            <Input
              style={{ height: 50 }}
              placeholder="Enter To Address"
              value={toAddress}
              onChange={(e) => {
                if (e != null) {
                  if (e.target.value.length > 42) {
                    messageApi.warning('The length of the address cannot exceed 42');
                  } else {
                    setToAddress(e.target.value);
                  }
                }
              }}
            />
          </div>
        </div>

        <div style={{ marginLeft: 10, marginRight: 10, marginTop: 10 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              backgroundColor: '#E6F0FA',
              borderRadius: '15px',
              textAlign: 'left',
              paddingTop: 15,
              paddingBottom: 15,
            }}>
            {AccountStore.currentAccount.address && (
              <Space direction="vertical">
                <span style={{ color: '#000000' }}>
                  {AccountStore.getAccountByAddress(toAddress).address
                    ? AccountStore.getAccountByAddress(toAddress).name
                      ? AccountStore.getAccountByAddress(toAddress).name + ' : '
                      : 'Account : '
                    : 'Address : '}
                </span>
                <div
                  style={{
                    color: '#000000',
                  }}>
                  {toAddress}
                </div>
              </Space>
            )}
          </div>
        </div>

        <Row style={{ marginTop: 20 }}>
          <Col span={6} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: 18 }}>Asset:</span>
          </Col>
          <Col span={18}>
            <Row>
              <Col span={24}>
                {AccountStore.currentAccount.erc721AccountMap &&
                  AccountStore.currentAccount.erc721AccountMap[search.get('tokenAddress') || ''].name}
              </Col>
            </Row>
            <Row>
              <Col span={24}>{`Token ID : ${search.get('tokenId')}`}</Col>
            </Row>
          </Col>
        </Row>

        <div style={{ padding: 10, marginTop: 180 }}>
          <Button style={{ width: '100%' }} type="primary" size="large" loading={isLoading} onClick={payment}>
            Send
          </Button>
        </div>
      </div>

      {/* <div style={{ color: '#000000', paddingLeft: 10, paddingRight: 10, marginTop: 40 }}>
          <div>
            <div style={{ backgroundColor: '#E6F0FA', padding: 5, marginTop: 20, height: 70, borderRadius: '15px' }}>
              {AccountStore.currentAccount.address && (
                <>
                  <span style={{ padding: 10, display: 'flex', color: '#000000' }}>
                    {AccountStore.getAccountByAddress(toAddress).address
                      ? AccountStore.getAccountByAddress(toAddress).name
                        ? AccountStore.getAccountByAddress(toAddress).name
                        : 'Account'
                      : 'Address'}
                  </span>
                  <div
                    style={{
                      width: '100%',
                      color: '#000000',
                      height: 20,
                    }}>
                    {toAddress}
                  </div>
                </>
              )}
            </div>
          </div>

          <Row style={{ marginTop: 20 }}>
            <Col span={6} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: 18 }}>Asset:</span>
            </Col>
            <Col span={18}>
              <Row>
                <Col span={24}>
                  {AccountStore.currentAccount.erc721AccountMap &&
                    AccountStore.currentAccount.erc721AccountMap[search.get('tokenAddress') || ''].name}
                </Col>
              </Row>
              <Row>
                <Col span={24}>{`Token ID : ${search.get('tokenId')}`}</Col>
              </Row>
            </Col>
          </Row>

          <div style={{ padding: 10, marginTop: 70 }}>
            <Button style={{ width: '100%' }} type="primary" size="large" loading={isLoading} onClick={payment}>
              Send
            </Button>
          </div>
        </div>
       */}
    </div>
  );
};

export default observer(View);
