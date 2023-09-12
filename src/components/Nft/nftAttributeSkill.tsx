import { Modal, Col, Row, Space } from 'antd';

import skill1 from '@/assets/img/nft/skill1.png';

export const NftSkill = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  return (
    <>
      <Modal centered title="NFT hero skill" open={isOpen} onOk={onClose} onCancel={onClose} width={390} footer={[]}>
        <Space direction="vertical" size="small" style={{ display: 'flex', marginTop: 30 }}>
          <Row>
            <Col span={6}>
              <span style={{ fontWeight: 'bold' }}>id</span>
            </Col>
            <Col span={18}>
              <span>19242011</span>
            </Col>
          </Row>
          <Row>
            <Col span={6}>
              <span style={{ fontWeight: 'bold' }}>quality</span>
            </Col>
            <Col span={18}>
              <span>Common</span>
            </Col>
          </Row>
          <Row>
            <Col span={6}>
              <span style={{ fontWeight: 'bold' }}>buff</span>
            </Col>
            <Col span={18}>
              <span>10.43%</span>
            </Col>
          </Row>
          <Row>
            <Col span={6}>
              <span style={{ fontWeight: 'bold' }}>icon</span>
            </Col>
            <Col span={18}>
              <img style={{ height: 30, width: 30 }} src={skill1} alt="" />
            </Col>
          </Row>
          <Row>
            <Col span={6}>
              <span style={{ fontWeight: 'bold' }}>name</span>
            </Col>
            <Col span={18}>
              <span>Dragon's Breath</span>
            </Col>
          </Row>
          <Row>
            <Col span={6}>
              <span style={{ fontWeight: 'bold' }}>rate</span>
            </Col>
            <Col span={18}>
              <span>0</span>
            </Col>
          </Row>
          <Row>
            <Col span={6}>
              <span style={{ fontWeight: 'bold' }}>type</span>
            </Col>
            <Col span={18}>
              <span>Passive</span>
            </Col>
          </Row>
          <Row>
            <Col span={6}>
              <span style={{ fontWeight: 'bold' }}>description</span>
            </Col>
            <Col span={18}>
              <span>
                {
                  'Oscar unleashes his dragon Rex, spraying flames and dealing damage to 3 enemy troops within a cone-shaped area (First Damage Factor 300), and causing burn damage for 3 seconds (Continuous Damage Factor 100).'
                }
              </span>
            </Col>
          </Row>
          <Row>
            <Col span={6}>
              <span style={{ fontWeight: 'bold' }}>level</span>
            </Col>
            <Col span={18}>
              <span>1</span>
            </Col>
          </Row>
        </Space>
      </Modal>
    </>
  );
};
