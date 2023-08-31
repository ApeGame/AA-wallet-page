import { useState } from 'react';
import { Button, Modal, Row, Space, Col, message } from 'antd';
import { observer } from 'mobx-react';
// import { truncateWalletAddrTooLong } from '@/utils/truncateWalletAddr';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import { SendNativeToken, SendErc20Token } from '@/actions/Token/token';
import { ethers } from 'ethers';

import '@/assets/styles/accountStyle/style.scss';

const SwitchPaymasterDialog = ({
  isOpen,
  onClose,
  toAmount,
  toAddress,
  erc20Address,
}: {
  isOpen: boolean;
  onClose: () => void;
  toAmount: string;
  toAddress: string;
  erc20Address: string;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [paymentIndex, setPaymentIndex] = useState(0);
  const paymasterList = [
    {
      isNative: true,
      isPlatform: false,
      name: 'COQ',
    },
    {
      isNative: false,
      isPlatform: false,
      name: 'my token',
    },
  ];
  const navigateTo = useNavigate();

  const send = async () => {
    setIsLoading(true);
    if (!erc20Address) {
      const sendRes = await SendNativeToken(toAddress, toAmount.trim(), paymentIndex);
      console.log('sendRes', sendRes);
      if (sendRes.code === 200) {
        messageApi.success('Complete');
        navigateTo('/overview');
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
      const sendRes = await SendErc20Token(erc20Address, data, paymentIndex);
      console.log('sendRes', sendRes);
      if (sendRes.code === 200) {
        messageApi.success('Complete');
        navigateTo('/overview');
      } else {
        messageApi.error('Fail');
      }
    }
    setIsLoading(false);
  };

  // useEffect(() => {});

  return (
    <>
      {contextHolder}
      <Modal
        centered
        title="Please select a payment"
        open={isOpen}
        onOk={onClose}
        onCancel={onClose}
        width={390}
        footer={[]}>
        <div style={{ height: 230, marginTop: 20, overflowY: 'auto' }}>
          <Space direction="vertical" size="large" style={{ display: 'flex' }}>
            <Row justify="space-around" align="middle">
              {paymasterList.map((row, index) => (
                <Col key={index} span={24}>
                  <div
                    className={classNames('networkItem', index === paymentIndex ? 'networkItemSelect' : 'networkItem')}
                    style={{ height: 60, fontSize: 15, padding: 10 }}
                    onClick={() => {
                      setPaymentIndex(index);
                    }}>
                    {row.isNative ? <span>{'Native Payment'}</span> : <span>{'Erc20 Paymaster'}</span>}
                  </div>
                </Col>
              ))}
            </Row>
          </Space>
          <Space direction="vertical" size="large" style={{ display: 'flex', marginTop: 30 }}>
            <Row justify="space-around" align="middle">
              <Button
                type="primary"
                size={'large'}
                loading={isLoading}
                onClick={() => {
                  send();
                }}>
                Submit
              </Button>
            </Row>
          </Space>
        </div>
      </Modal>
    </>
  );
};

export default observer(SwitchPaymasterDialog);
