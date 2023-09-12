import { Modal, Col, Row, Space } from 'antd';
import { ActivityRecord } from '@/model/multisig';
import { GetStatusContent } from './status';
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
          {/* {activityRecord.transaction_hash && (
            <Row>
              <Col span={24}>{moveToBlockScan(activityRecord.transaction_hash)}</Col>
            </Row>
          )}

          {activityRecord.user_operation_hash && (
            <Row>
              <Col span={24}>{moveToUserOperationScan(activityRecord.user_operation_hash)}</Col>
            </Row>
          )} */}

          <Row>
            <Col span={10}>status</Col>
            <Col span={14}>
              <div>{GetStatusContent(activityRecord.status)}</div>
            </Col>
          </Row>

          {activityRecord.transaction_hash && (
            <Row>
              <Col span={10}>transaction hash</Col>
              <Col span={14}>{moveToBlockScan(activityRecord.transaction_hash)}</Col>
            </Row>
          )}

          {activityRecord.user_operation_hash && (
            <Row>
              <Col span={10}>user operation hash</Col>
              <Col span={14}>{moveToUserOperationScan(activityRecord.user_operation_hash)}</Col>
            </Row>
          )}
        </Space>
      </Modal>
    </>
  );
};
