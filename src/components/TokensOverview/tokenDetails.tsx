import { Modal, Col, Row, Space } from 'antd';
import { AccountStore } from '@/store/account';

import '@/assets/styles/accountStyle/style.scss';

export const TokenDetails = ({
  isOpen,
  onClose,
  tokenAddress,
}: {
  isOpen: boolean;
  onClose: () => void;
  tokenAddress: string;
}) => {
  return (
    <>
      <Modal centered title="Token details" open={isOpen} onOk={onClose} onCancel={onClose} width={390} footer={[]}>
        <Space direction="vertical" size="middle" style={{ display: 'flex', marginTop: 30 }}>
          <Row>
            <Col span={10}>Contract address</Col>
            <Col span={14}>
              <span>{tokenAddress}</span>
            </Col>
          </Row>

          <Row>
            <Col span={10}>Token decimal</Col>
            <Col span={14}>
              <span>18</span>
            </Col>
          </Row>

          <Row>
            <Col span={10}>Network</Col>
            <Col span={14}>
              <span>{AccountStore.getCurrentNetworkWithStorage().name}</span>
            </Col>
          </Row>
        </Space>
      </Modal>
    </>
  );
};
