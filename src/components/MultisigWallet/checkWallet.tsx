import { Modal, Col, Row, Space } from 'antd';
import { CopyToClipLong } from '@/components/CopyToClip/CopyToClip';
import { MultisigInfo } from '@/model/multisig';

import '@/assets/styles/accountStyle/style.scss';

export const CheckWallet = ({
  isOpen,
  onClose,
  wallet,
}: {
  isOpen: boolean;
  onClose: () => void;
  wallet: MultisigInfo;
}) => {
  return (
    <>
      <Modal centered title="Multisig wallet" open={isOpen} onOk={onClose} onCancel={onClose} width={390} footer={[]}>
        <Space direction="vertical" size="middle" style={{ display: 'flex', marginTop: 30 }}>
          <Row>
            <Col span={10}>Wallet name</Col>
            <Col span={14}>
              <span>{wallet.name}</span>
            </Col>
          </Row>
          <Row>
            <Col span={10}>Wallet address</Col>
            <Col span={14}>
              <CopyToClipLong address={wallet.abstract_account} />
            </Col>
          </Row>
          <Row>
            <Col span={10}>Threshold Number</Col>
            <Col span={14}>
              <span>{wallet.threshold}</span>
            </Col>
          </Row>
          <Row justify="space-around" align="middle">
            <Col span={10}>
              <span>Member Address</span>
            </Col>
            <Col span={14} style={{ display: 'flex', flexDirection: 'column' }}>
              <Space direction="vertical" size="small" style={{ display: 'flex', width: '100%' }}>
                {wallet.signer_aa_account &&
                  wallet.signer_aa_account.map((row, index) => <CopyToClipLong key={index} address={row || ''} />)}
              </Space>
            </Col>
          </Row>
        </Space>
      </Modal>
    </>
  );
};
