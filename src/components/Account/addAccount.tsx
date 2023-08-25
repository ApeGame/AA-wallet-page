import { useState } from 'react';
import { truncateWalletAddrTooLong } from '@/utils/truncateWalletAddr';
import { Button, Modal, Col, Row, Space, InputNumber, Input, message } from 'antd';
import { CreateMultisigAddress } from '@/actions/MultisigWallet/multisigWallet';
import { useNavigate } from 'react-router-dom';

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
      location.reload();
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
        title="Add a multisig wallet account "
        open={isOpen}
        onOk={onClose}
        onCancel={onClose}
        width={390}
        footer={[]}>
        <div style={{ height: 330, marginTop: 20, overflowY: 'auto' }}>
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
                  />
                </span>
              </Col>
            </Row>
            <Row justify="space-around" align="middle">
              <Col span={24}>
                <Input
                  placeholder="Account name"
                  onChange={(e) => {
                    if (e != null) {
                      setName(e.target.value.trim());
                    }
                  }}
                />
              </Col>
            </Row>
            <Row justify="space-around" align="middle">
              <Col span={24}>
                <Space.Compact style={{ width: '95%' }}>
                  <Input
                    placeholder="Add Abstract Address"
                    onChange={(e) => {
                      if (e != null) {
                        setAbstractAddress(e.target.value.trim());
                      }
                    }}
                  />
                  <Button
                    type="primary"
                    onClick={() => {
                      setAbstractAddressList((prevAddress) => [...prevAddress, abstractAddress]);
                    }}>
                    Add
                  </Button>
                  <Button
                    type="primary"
                    onClick={() => {
                      setAbstractAddressList([]);
                    }}>
                    Reset
                  </Button>
                </Space.Compact>
              </Col>
            </Row>
            <Row justify="space-around" align="middle">
              <Col span={24}>
                {abstractAddressList.length !== 0 && <span>Abstract Wallet Address List:</span>}
                <div style={{ minHeight: 90, overflowY: 'auto' }}>
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
