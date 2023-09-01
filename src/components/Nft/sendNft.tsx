import { Modal, Col, Row, Space, Input, Button } from 'antd';

export const ImportNft = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  return (
    <>
      <Modal centered title="Send NFT" open={isOpen} onOk={onClose} onCancel={onClose} width={390} footer={[]}>
        <Space direction="vertical" size="middle" style={{ display: 'flex', marginTop: 30 }}>
          <Row>
            <Col span={24}>
              <span>Send to Address</span>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Input size="large" placeholder="0x..." />
            </Col>
          </Row>

          <Row style={{ marginTop: 20 }}>
            <Col span={12} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Button size="large">Cancel</Button>
            </Col>
            <Col span={12} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Button size="large" type="primary">
                Import
              </Button>
            </Col>
          </Row>
        </Space>
      </Modal>
    </>
  );
};
