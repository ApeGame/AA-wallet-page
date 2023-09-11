import { useState } from 'react';
import { truncateWalletAddrTooLong } from '@/utils/truncateWalletAddr';
import { Button, Modal, Col, Row, Space, InputNumber, Input, message } from 'antd';
import { CreateMultisigAddress } from '@/actions/MultisigWallet/multisigWallet';
import { useNavigate } from 'react-router-dom';
import { AccountStore } from '@/store/account';

import '@/assets/styles/accountStyle/style.scss';

export const AddAccountDialog = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [abstractAddressList, setAbstractAddressList] = useState<string[]>([]);
  const [abstractAddress, setAbstractAddress] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [threshold, setThreshold] = useState(1);
  const navigateTo = useNavigate();

  const [messageApi, contextHolder] = message.useMessage();

  const createSig = async () => {
    setIsLoading(true);
    const addRes = await CreateMultisigAddress(name, threshold, abstractAddressList);
    if (addRes.code === 200) {
      messageApi.success('Success');
      navigateTo('/overview');
      AccountStore.loadUserData();
      onClose();
    } else if (addRes.code === 400) {
      messageApi.error(addRes.data);
    } else {
      messageApi.error('fail');
    }
    setIsLoading(false);
  };

  return (
    <>
      {contextHolder}
      <Modal
        centered
        title="Add A Multisig Wallet Account "
        open={isOpen}
        onOk={onClose}
        onCancel={onClose}
        width={410}
        footer={[]}>
        <div style={{ height: 360, marginTop: 20 }}>
          <Space direction="vertical" size="large" style={{ display: 'flex' }}>
            <Row justify="space-around" align="middle">
              <Col span={12}>
                <span>Threshold Number : </span>
              </Col>
              <Col span={12}>
                <span>
                  <InputNumber
                    min={1}
                    defaultValue={1}
                    onChange={(value) => {
                      if (value) {
                        setThreshold(value);
                      }
                    }}
                    size="large"
                  />
                </span>
              </Col>
            </Row>
            <Row justify="space-around" align="middle">
              <Col span={24}>
                <Input
                  maxLength={15}
                  placeholder="Account name"
                  onChange={(e) => {
                    if (e.target.value) {
                      setName(e.target.value.trim());
                    }
                    if (e.target.value.length >= 15) {
                      messageApi.warning('The length of the account name cannot exceed 15');
                    }
                  }}
                  size="large"
                />
              </Col>
            </Row>
            <Row justify="space-around" align="middle">
              <Col span={14}>
                <Input
                  placeholder="Add Abstract Address"
                  onChange={(e) => {
                    if (e != null) {
                      setAbstractAddress(e.target.value.trim());
                    }
                  }}
                  value={abstractAddress}
                  size="large"
                />
              </Col>
              <Col span={5}>
                <Button
                  type="link"
                  size="large"
                  style={{ width: 70 }}
                  onClick={() => {
                    setAbstractAddressList([]);
                    setAbstractAddress('');
                  }}>
                  Reset
                </Button>
              </Col>
              <Col span={5}>
                <Button
                  type="primary"
                  size="large"
                  style={{ width: 70 }}
                  onClick={() => {
                    if (abstractAddress && abstractAddressList.indexOf(abstractAddress)) {
                      setAbstractAddressList((prevAddress) => [...prevAddress, abstractAddress]);
                    } else {
                      messageApi.warning('Please enter a new address');
                    }
                  }}>
                  + Add
                </Button>
              </Col>
            </Row>
            <Row justify="space-around" align="middle">
              <Col span={24}>
                <div>default : {truncateWalletAddrTooLong(AccountStore.currentAccount.address)}</div>
                {abstractAddressList.length !== 0 && <span>Abstract Wallet Address List:</span>}
                <div style={{ height: 80, overflowY: 'auto' }}>
                  {abstractAddressList.map((item: string, index) => {
                    return (
                      <div key={index} style={{ fontSize: 5 }}>
                        {index + 1 + ' : '}
                        {truncateWalletAddrTooLong(item)}
                      </div>
                    );
                  })}
                </div>
              </Col>
            </Row>
            <Row justify="space-around" align="middle">
              <Button type="primary" size={'large'} loading={isLoading} onClick={createSig}>
                Submit
              </Button>
            </Row>
          </Space>
        </div>
      </Modal>
    </>
  );
};
