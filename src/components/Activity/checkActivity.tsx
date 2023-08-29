import { Button, Modal, Col, Row, Space, Input, message } from 'antd';
import { observer } from 'mobx-react';
import { ActivityRecord } from '@/model/multisig';
import { GetStatus } from './status';
import { truncateWalletAddrLong } from '@/utils/truncateWalletAddr';
import { CopyToClipLong } from '@/components/CopyToClip/CopyToClip';
import { moveToBlockScan, moveToUserOperationScan } from '@/components/TokensOverview/moveScan';

import '@/assets/styles/accountStyle/style.scss';

export const CheckActivity = ({
  isOpen,
  onClose,
  activityRecord,
}: {
  isOpen: boolean;
  onClose: () => void;
  activityRecord: ActivityRecord;
}) => {
  return (
    <>
      <Modal centered title="Activity" open={isOpen} onOk={onClose} onCancel={onClose} width={390} footer={[]}>
        <Space direction="vertical" size="middle" style={{ display: 'flex', marginTop: 30 }}>
          <Row>
            <Col span={24}>{moveToBlockScan(activityRecord.transaction_hash)}</Col>
          </Row>
          <Row>
            <Col span={24}>{moveToUserOperationScan(activityRecord.user_operation_hash)}</Col>
          </Row>
          <Row>
            <Col span={10}>status</Col>
            <Col span={14}>
              <div>{GetStatus(activityRecord.status)}</div>
            </Col>
          </Row>
          <Row>
            <Col span={10}>user operation hash</Col>
            <Col span={14}>
              <CopyToClipLong address={activityRecord.user_operation_hash} />
            </Col>
          </Row>
          <Row>
            <Col span={10}>transaction hash</Col>
            <Col span={14}>
              <CopyToClipLong address={activityRecord.transaction_hash} />
            </Col>
          </Row>
        </Space>
      </Modal>
    </>
  );
};
