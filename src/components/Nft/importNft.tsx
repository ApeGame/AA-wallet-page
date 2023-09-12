import { useState } from 'react';
import { Modal, Col, Row, Space, Input, Button, message } from 'antd';
import { UpdateNfts } from '@/actions/Token/token';
import { AccountStore } from '@/store/account';

export const ImportNft = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [tokenAddress, setTokenAddress] = useState('');
  const [tokenID, setTokenID] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const updateNft = async () => {
    setIsLoading(true);
    const updateRes = await UpdateNfts(AccountStore.currentAccount.address, tokenAddress, parseInt(tokenID));
    console.log('import nft', updateRes);
    if (updateRes.code === 200) {
      messageApi.success('import success');
      AccountStore.loadUserData();
      onClose();
    } else {
      messageApi.error('import fail');
    }
    setIsLoading(false);
  };

  return (
    <>
      {contextHolder}
      <Modal centered title="Import NFT" open={isOpen} onOk={onClose} onCancel={onClose} width={390} footer={[]}>
        <Space direction="vertical" size="middle" style={{ display: 'flex', marginTop: 30 }}>
          <Row>
            <Col span={24}>
              <span>Address</span>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Input
                size="large"
                placeholder="0x..."
                onChange={(e) => {
                  if (e != null) {
                    setTokenAddress(e.target.value.trim());
                  }
                }}
              />
            </Col>
          </Row>

          <Row>
            <Col span={24}>
              <span>Token ID</span>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Input
                size="large"
                placeholder="Please input token id"
                onChange={(e) => {
                  if (e != null) {
                    setTokenID(e.target.value.trim());
                  }
                }}
              />
            </Col>
          </Row>

          <Row style={{ marginTop: 20 }}>
            <Col span={12} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Button size="large">Cancel</Button>
            </Col>
            <Col span={12} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Button
                size="large"
                type="primary"
                loading={isLoading}
                onClick={() => {
                  updateNft();
                }}>
                Import
              </Button>
            </Col>
          </Row>
        </Space>
      </Modal>
    </>
  );
};
