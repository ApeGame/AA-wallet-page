import { Input, Button, message } from 'antd';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import React, { useEffect } from 'react';
import { SendNativeToken, SendErc20Token } from '@/actions/Token/token';
import { ethers } from 'ethers';
import { getSendTransactionType } from '@/utils/localStorage';

const contentStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '60px',
  width: '100%',
  color: '#000000',
  marginTop: '20px',
  paddingLeft: 15,
  paddingRight: 15,
};

const View = () => {
  const [toAddress, setToAddress] = useState('');

  const [toAmount, setToAmount] = useState('');

  const [search] = useSearchParams();

  const [isLoading, setIsLoading] = useState(false);

  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    console.log('~', search.get('tokenAddress'));
  }, [search]);

  const send = async () => {
    setIsLoading(true);
    if (!search.get('tokenAddress')) {
      const sendRes = await SendNativeToken(toAddress, toAmount.trim());
      console.log('sendRes', sendRes);
      if (sendRes.code === 200) {
        messageApi.success('Complete');
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
      } else {
        messageApi.error('Fail');
      }
    }
    setIsLoading(false);
  };

  return (
    <div>
      {contextHolder}
      <div style={contentStyle}>
        <span>Send To</span>
        <Link to="/overview" style={{ marginLeft: '230px' }}>
          Back
        </Link>
      </div>
      <div style={contentStyle}>
        <Input
          placeholder="Enter To Address"
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
        <Button type="primary" loading={isLoading} onClick={send}>
          Send
        </Button>
      </div>
    </div>
  );
};

export default View;
