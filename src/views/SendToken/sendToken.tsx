import { Input, Button, message, Col, Row, Space } from 'antd';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import React, { useEffect } from 'react';
import { SendNativeToken, SendErc20Token } from '@/actions/Token/token';
import { ethers } from 'ethers';
import { observer } from 'mobx-react';
import { AccountStore } from '@/store/account';
import classNames from 'classnames';
import { truncateWalletAddrLong } from '@/utils/truncateWalletAddr';
import { formatWeiToEth } from '@/utils/formatterEth';
import SendApproveDialog from '@/components/TokensOverview/sendApprove';
import { useNavigate } from 'react-router-dom';

// import { getSendTransactionType } from '@/utils/localStorage';

import '@/assets/styles/accountStyle/style.scss';

const contentStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '60px',
  width: '100%',
  color: '#000000',
  marginTop: 15,
  paddingLeft: 15,
  paddingRight: 15,
};

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
  const [paymasterAddress, setPaymasterAddress] = useState('');
  const [erc20Address, setErc20Address] = useState('');

  const [sendApproveFlag, setSendApproveFlag] = useState(false);
  const handleSendApproveFlagClose = () => {
    setSendApproveFlag(false);
  };

  const navigateTo = useNavigate();

  useEffect(() => {
    console.log('~', search.get('tokenAddress'));
  }, [search]);

  const selectAccount = (address: string) => {
    console.log('address', address);
    setToAddress(address);
  };

  const send = async () => {
    setIsLoading(true);
    if (!search.get('tokenAddress')) {
      const sendRes = await SendNativeToken(toAddress, toAmount.trim());
      console.log('sendRes', sendRes);
      if (sendRes.code === 200) {
        messageApi.success('Complete');
      } else if (sendRes.code === 428) {
        setSendApproveFlag(true);
        setPaymasterAddress(sendRes.data.PaymasterAddress);
        setErc20Address(sendRes.data.Erc20ContractAddress);
      } else {
        messageApi.error('Fail');
      }
    } else {
      const data =
        '0xa9059cbb000000000000000000000000' +
        toAddress.trim().slice(2) +
        '0'.repeat(64 - ethers.parseEther(toAmount).toString(16).length) +
        ethers.parseEther(toAmount).toString(16);
      console.log('data', data);
      console.log('data1Length', data.length);
      const sendRes = await SendErc20Token(search.get('tokenAddress') as string, data);
      console.log('sendRes', sendRes);
      if (sendRes.code === 200) {
        messageApi.success('Complete');
        navigateTo('/overview');
      } else if (sendRes.code === 428) {
        setSendApproveFlag(true);
        setPaymasterAddress(sendRes.data.PaymasterAddress);
        setErc20Address(sendRes.data.Erc20ContractAddress);
      } else {
        messageApi.error('Fail');
      }
    }
    setIsLoading(false);
  };

  return (
    <div>
      {contextHolder}
      <SendApproveDialog
        isOpen={sendApproveFlag}
        onClose={handleSendApproveFlagClose}
        paymentAddress={paymasterAddress}
        erc20Address={erc20Address}
      />
      <div style={contentStyle}>
        <span style={{ fontSize: 18 }}>Send To</span>
        <Link to="/overview" style={{ marginLeft: '230px', fontSize: 18 }}>
          Back
        </Link>
      </div>
      <div style={contentStyle}>
        <Input
          placeholder="Enter To Address"
          value={toAddress}
          onChange={(e) => {
            if (e != null) {
              setToAddress(e.target.value);
            }
          }}
        />
      </div>
      <div style={contentStyle}>
        <Input
          placeholder="Enter Amount"
          onChange={(e) => {
            if (e != null) {
              setToAmount(e.target.value);
            }
          }}
        />
      </div>
      <div style={contentStyle}>
        <Button type="primary" size="large" loading={isLoading} onClick={send}>
          Send
        </Button>
      </div>
      <div style={addressStyle}>
        <div style={{ height: 400, marginTop: 10, overflowY: 'auto', width: '100%', color: '#000000' }}>
          <span>Your accounts:</span>
          {AccountStore.accountList.map((row, index) => (
            <div
              className={classNames(
                'accountContentSend',
                row.address === AccountStore.currentAccount.address ? 'accountContentSelectSend' : 'accountContentSend'
              )}
              key={index}
              style={{ padding: 10, marginTop: 30 }}
              onClick={() => {
                selectAccount(row.address);
              }}>
              <Space direction="vertical" size="large" style={{ display: 'flex' }}>
                <Row>
                  <Col span={24} style={{ display: 'flex', flexDirection: 'row' }}>
                    <span style={{ fontSize: '15px', fontWeight: 'bold', marginLeft: 45 }}>
                      {row.name ? row.name : 'Account'}
                      {row.isMultisig ? '(Multisig)' : '(Abstract)'}
                    </span>
                  </Col>
                </Row>
                <Row>
                  <Col span={16}>
                    <span>{truncateWalletAddrLong(row.address)}</span>
                  </Col>
                  <Col span={8}>
                    <span style={{ textAlign: 'right' }}>{formatWeiToEth(row.nativeBalance)}</span>
                  </Col>
                </Row>
              </Space>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default observer(View);
