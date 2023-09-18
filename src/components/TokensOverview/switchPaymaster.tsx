import { useState } from 'react';
import { Button, Modal, Row, Space, Col, message } from 'antd';
import { observer } from 'mobx-react';
// import { truncateWalletAddrTooLong } from '@/utils/truncateWalletAddr';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import { SendNativeToken, SendErc20Token } from '@/actions/Token/token';
import { ethers } from 'ethers';
import { AccountStore } from '@/store/account';

import '@/assets/styles/accountStyle/style.scss';

const SwitchPaymasterDialog = ({
  isOpen,
  onClose,
  toAmount,
  toAddress,
  erc20Address,
  erc721Address,
  tokenId,
}: {
  isOpen: boolean;
  onClose: () => void;
  toAmount: string;
  toAddress: string;
  erc20Address: string;
  erc721Address: string;
  tokenId: number;
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

    if (toAddress.length === 0) {
      messageApi.warning('please enter to address');
    }
    {
      if (!erc20Address && !erc721Address) {
        console.log('Native Transfer');
        const sendRes = await SendNativeToken(toAddress, toAmount.trim(), paymentIndex);
        console.log('sendRes', sendRes);
        if (sendRes.code === 200) {
          setTimeout(() => navigateTo('/overview'), 700);
          messageApi.success('Complete');
        } else {
          messageApi.error(sendRes.data);
        }
      } else if (erc20Address && !erc721Address) {
        console.log('erc20 Transfer');

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
          setTimeout(() => navigateTo('/overview'), 700);
          messageApi.success('Complete');
        } else {
          messageApi.error(sendRes.data);
        }
      } else if (!erc20Address && erc721Address) {
        console.log('erc721 Transfer');

        const data =
          '0x23b872dd000000000000000000000000' +
          AccountStore.currentAccount.address.trim().slice(2) +
          '0'.repeat(24) +
          toAddress.trim().slice(2) +
          '0'.repeat(24) +
          '0'.repeat(40 - tokenId.toString(16).toString().length) +
          tokenId.toString(16);
        console.log('data1', data);
        console.log(
          'data2',
          '0x23b872dd0000000000000000000000005b38da6a701c568545dcfcb03fcb875f56beddc4000000000000000000000000ab8483f64d9c6d1ecf9b849ae677dd3315835cb2000000000000000000000000000000000000000000000000000000000005464e'
        );
        console.log('data1Length', data.length);
        console.log(
          'data2Length',
          '0x23b872dd0000000000000000000000005b38da6a701c568545dcfcb03fcb875f56beddc4000000000000000000000000ab8483f64d9c6d1ecf9b849ae677dd3315835cb2000000000000000000000000000000000000000000000000000000000005464e'
            .length
        );
        const sendRes = await SendErc20Token(erc721Address, data, paymentIndex);
        console.log('sendRes', sendRes);
        if (sendRes.code === 200) {
          setTimeout(() => navigateTo('/overview'), 700);
          messageApi.success('Complete');
        } else {
          messageApi.error(sendRes.data);
        }
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
                    {row.isNative ? <span>{'Native Payment'}</span> : <span>{'Erc20 Payment'}</span>}
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
