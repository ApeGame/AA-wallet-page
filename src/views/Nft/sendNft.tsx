import { Input, Button, Col, Row, Space, message } from 'antd';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import React, { useEffect } from 'react';
// import { SendNativeToken, SendErc20Token } from '@/actions/Token/token';
// import { ethers } from 'ethers';
import { observer } from 'mobx-react';
import { AccountStore } from '@/store/account';
import classNames from 'classnames';
import { truncateWalletAddrLong } from '@/utils/truncateWalletAddr';
// import SendApproveDialog from '@/components/TokensOverview/sendApprove';
// import { useNavigate } from 'react-router-dom';
import SwitchPaymasterDialog from '@/components/TokensOverview/switchPaymaster';
// import { GetAccountAsset } from '@/actions/Token/token';
// import { getCurrentAddress } from '@/utils/localStorage';
// import { GetUser } from '@/actions/User/user';
// import { setUserRecoverEmail } from '@/utils/localStorage';

// import { getSendTransactionType } from '@/utils/localStorage';

import '@/assets/styles/accountStyle/style.scss';

const addressStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: '30px',
};

const View = () => {
  const [toAddress, setToAddress] = useState('');
  const [toAmount, setToAmount] = useState('');
  const [search] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  // const [paymasterAddress, setPaymasterAddress] = useState('');
  // const [erc20Address, setErc20Address] = useState('');

  // const [sendApproveFlag, setSendApproveFlag] = useState(false);
  // const handleSendApproveFlagClose = () => {
  //   setSendApproveFlag(false);
  // };
  const [isInputAddress, setIsInputAddress] = useState(true);

  const [switchPaymentFlag, setSwitchPaymentFlag] = useState(false);
  const handleSwitchPaymentFlagClose = () => {
    setSwitchPaymentFlag(false);
  };

  // const navigateTo = useNavigate();

  useEffect(() => {
    console.log('~', search.get('tokenAddress'));
  }, [search]);

  const selectAccount = (address: string) => {
    console.log('address', address);
    setToAddress(address);
  };

  const payment = () => {
    setIsLoading(true);
    setToAmount('10');
    if (toAmount) {
      // setSwitchPaymentFlag(true);
      console.log('payment');
    } else {
      messageApi.warning('Please input amount');
    }

    setIsLoading(false);
  };

  useEffect(() => {
    // load
    // loadAccountData();
    AccountStore.loadUserData();
  }, []);

  return (
    <div>
      {contextHolder}
      <SwitchPaymasterDialog
        isOpen={switchPaymentFlag}
        onClose={handleSwitchPaymentFlagClose}
        toAmount={toAmount}
        toAddress={toAddress}
        erc20Address={search.get('tokenAddress') || ''}
      />
      <div style={{ color: '#000000', marginTop: 20 }}>
        <span style={{ fontSize: 18 }}>Send To</span>
        {isInputAddress ? (
          <Link to="/overview" style={{ marginLeft: '230px', fontSize: 18 }}>
            Back
          </Link>
        ) : (
          <Button
            type="link"
            style={{ marginLeft: '230px', fontSize: 18 }}
            onClick={() => {
              setIsInputAddress(true);
            }}>
            Back
          </Button>
        )}
      </div>

      {isInputAddress ? (
        <div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              color: '#000000',
              padding: 10,
              marginTop: 30,
            }}>
            <Input
              style={{ height: 50 }}
              placeholder="Enter To Address"
              value={toAddress}
              onChange={(e) => {
                if (e != null) {
                  setToAddress(e.target.value);
                }
              }}
            />
          </div>
          <div style={addressStyle}>
            <div style={{ height: 500, marginTop: 10, overflowY: 'auto', width: '100%', color: '#000000' }}>
              <span style={{ display: 'flex', marginLeft: 20, fontWeight: 'bolder', fontSize: 20 }}>
                Your accounts:
              </span>
              {AccountStore.accountList.map((row, index) => (
                <div
                  className={classNames(
                    'accountContentSend',
                    row.address === AccountStore.currentAccount.address
                      ? 'accountContentSelectSend'
                      : 'accountContentSend'
                  )}
                  key={index}
                  style={{ padding: 10, marginTop: 30 }}
                  onClick={() => {
                    selectAccount(row.address);
                  }}>
                  <Row>
                    <Col span={5} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <div
                        style={{
                          width: 47,
                          height: 47,
                          borderRadius: '50%',
                          background: 'linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)',
                        }}></div>
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
                          {/* <Col span={8}>
                            <span style={{ textAlign: 'right' }}>
                              {formatWeiToEth(row.nativeBalance)}{' '}
                              {' ' + AccountStore.getCurrentNetworkWithStorage().symbol}
                            </span>
                          </Col> */}
                        </Row>
                      </Space>
                    </Col>
                  </Row>
                </div>
              ))}
            </div>
          </div>
          <div style={{ padding: 10 }}>
            <Button
              type="primary"
              size="large"
              style={{ width: '100%' }}
              onClick={() => {
                setIsInputAddress(false);
              }}>
              Next
            </Button>
          </div>
        </div>
      ) : (
        <div style={{ color: '#000000', paddingLeft: 10, paddingRight: 10, marginTop: 40 }}>
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
                <Col span={24}>{'MetaApes'}</Col>
              </Row>
              <Row>
                <Col span={24}>{'Token ID : 170799'}</Col>
              </Row>
            </Col>
          </Row>

          <div style={{ padding: 10, marginTop: 70 }}>
            <Button style={{ width: '100%' }} type="primary" size="large" loading={isLoading} onClick={payment}>
              Send
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default observer(View);
