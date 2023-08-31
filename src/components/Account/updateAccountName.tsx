import { useState } from 'react';
import { Button, Modal, Col, Row, Space, Input, message } from 'antd';
import { UpdateMultisigAddressName } from '@/actions/MultisigWallet/multisigWallet';
import { observer } from 'mobx-react';
import { AccountStore } from '@/store/account';

import '@/assets/styles/accountStyle/style.scss';

const UpdateAccountNameDialog = ({
  isOpen,
  onClose,
  address,
}: {
  isOpen: boolean;
  onClose: () => void;
  address: string;
}) => {
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const updateName = async () => {
    setIsLoading(true);
    const res = await UpdateMultisigAddressName(name, address);
    console.log('updateNameRes', res);
    if (res.code === 200) {
      messageApi.success('update name success');
      AccountStore.updateAccountNameByAddress(address, name);
    } else {
      messageApi.error('update name fail');
    }
    setIsLoading(false);
  };

  return (
    <>
      {contextHolder}
      <Modal
        centered
        title="Update account name"
        open={isOpen}
        onOk={onClose}
        onCancel={onClose}
        width={390}
        footer={[]}>
        <div style={{ height: 180, marginTop: 50, overflowY: 'auto' }}>
          <Space direction="vertical" size="large" style={{ display: 'flex' }}>
            <Row justify="space-around" align="middle">
              <Col span={24}>
                <Input
                  placeholder="Please input name"
                  onChange={(e) => {
                    if (e != null) {
                      if (e.target.value.trim().length < 10) {
                        setName(e.target.value.trim());
                      }
                    }
                  }}
                />
              </Col>
            </Row>

            <Row justify="space-around" align="middle">
              <Button
                type="primary"
                size={'large'}
                loading={isLoading}
                onClick={() => {
                  updateName();
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

export default observer(UpdateAccountNameDialog);
