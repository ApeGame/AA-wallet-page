import { useState } from 'react';
import { Button, Modal, Row, Space, message } from 'antd';
import { observer } from 'mobx-react';
import { SendApproveRequest } from '@/actions/Token/token';
import { useNavigate } from 'react-router-dom';

import '@/assets/styles/accountStyle/style.scss';

const SendApproveDialog = ({
  isOpen,
  onClose,
  paymentAddress,
  erc20Address,
}: {
  isOpen: boolean;
  onClose: () => void;
  paymentAddress: string;
  erc20Address: string;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const navigateTo = useNavigate();

  const sendApprove = async () => {
    setIsLoading(true);
    const data = '0x095ea7b3000000000000000000000000' + paymentAddress.trim().slice(2) + 'f'.repeat(64);
    console.log('data', data);
    // console.log('data1Length', data.length);
    // console.log(
    //   'demo',
    //   '0x095ea7b3000000000000000000000000e4bc4bb0acfdb0c754d1f652599b98d9cdf2afe90000000000000000000000000000000000000000000000000000000000000001',
    //   'length',
    //   '0x095ea7b3000000000000000000000000e4bc4bb0acfdb0c754d1f652599b98d9cdf2afe90000000000000000000000000000000000000000000000000000000000000001'
    //     .length
    // );
    // console.log('toAmount', ethers.parseEther(toAmount).toString(16));
    const sendRes = await SendApproveRequest(erc20Address, data);
    console.log('sendRes', sendRes);
    if (sendRes.code === 200) {
      messageApi.success('Complete, please move to Signature Activity to check this approve request');
      navigateTo('/overview');
      location.reload();
    } else {
      messageApi.error('Fail');
    }
    setIsLoading(false);
  };

  return (
    <>
      {contextHolder}
      <Modal
        centered
        title="Send Approve Token Request"
        open={isOpen}
        onOk={onClose}
        onCancel={onClose}
        width={390}
        footer={[]}>
        <div style={{ height: 100, marginTop: 50, overflowY: 'auto' }}>
          <Space direction="vertical" size="large" style={{ display: 'flex' }}>
            <Row justify="space-around" align="middle">
              <Button
                type="primary"
                size={'large'}
                loading={isLoading}
                onClick={() => {
                  sendApprove();
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

export default observer(SendApproveDialog);
