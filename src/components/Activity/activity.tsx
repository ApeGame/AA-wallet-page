import { useState } from 'react';
import { ActivityRecord } from '@/model/multisig';
import { Col, Row, Button, message } from 'antd';
import { CopyToClipLong } from '@/components/CopyToClip/CopyToClip';
import { CheckActivity } from './checkActivity';
import { GetStatus } from './status';
import { UpdateNeedSignature } from '@/actions/MultisigWallet/multisigWallet';

export const Activity = ({ activityRecord }: { activityRecord: ActivityRecord }) => {
  const [checkFlag, setCheckFlag] = useState(false);
  const handleCheckActivityClose = () => {
    setCheckFlag(false);
  };

  return (
    <>
      <CheckActivity isOpen={checkFlag} onClose={handleCheckActivityClose} activityRecord={activityRecord} />
      <Row
        style={{ height: 60, marginTop: 25, marginBottom: 25, cursor: 'pointer' }}
        onClick={() => {
          setCheckFlag(true);
        }}>
        <Col span={6} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div
            style={{
              width: 47,
              height: 47,
              borderRadius: '50%',
              background: 'linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)',
            }}></div>
        </Col>
        <Col span={18}>
          <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
            <div style={{ height: 30, display: 'flex', alignItems: 'center' }}>
              <span style={{ fontWeight: 'bold', fontSize: 19 }}>{'sender : '}</span> &nbsp;
              <span style={{ fontSize: 15 }}>
                <CopyToClipLong address={activityRecord.sender} />
              </span>
            </div>
            <div style={{ height: 30, display: 'flex', alignItems: 'center', fontSize: 17 }}>
              {GetStatus(activityRecord.status)}
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
};

export const SignatureActivity = ({
  activityRecord,
  loadData,
  setActivityType,
}: {
  activityRecord: ActivityRecord;
  loadData: () => void;
  setActivityType: (type: string) => void;
}) => {
  const rowStyle: React.CSSProperties = { textAlign: 'left', paddingLeft: 25 };
  const approveSig = async (id: string) => {
    const res = await UpdateNeedSignature('', id);
    console.log('UpdateNeedSignature', res);
    if (res.code === 200) {
      messageApi.success('Complete');
      loadData();
      setActivityType('all');
    } else {
      messageApi.error('Fail');
      loadData();
    }
  };

  const rejectSig = async (id: string) => {
    const res = await UpdateNeedSignature('reject', id);
    console.log('UpdateNeedSignature reject', res);
    if (res.code === 200) {
      messageApi.success('Complete');
      loadData();
      setActivityType('all');
    } else {
      messageApi.error('Fail');
      loadData();
    }
  };

  const [messageApi, contextHolder] = message.useMessage();
  return (
    <>
      {contextHolder}
      <Row style={{ height: 60, marginTop: 30, marginBottom: 30 }}>
        <Col span={6} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div
            style={{
              width: 47,
              height: 47,
              borderRadius: '50%',
              background: 'linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)',
            }}></div>
        </Col>
        <Col span={18}>
          <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
            <div style={{ height: 30, display: 'flex', alignItems: 'center' }}>
              <span style={{ fontWeight: 'bold', fontSize: 19 }}>{'sender : '}</span> &nbsp;
              <span style={{ fontSize: 15 }}>
                <CopyToClipLong address={activityRecord.sender} />
              </span>
            </div>
            <div style={{ height: 30, display: 'flex', alignItems: 'center', fontSize: 17 }}>
              <div>{GetStatus(activityRecord.status)}</div>
              {activityRecord.status === 1 && (
                <div style={{ marginLeft: 10 }}>
                  <Row style={rowStyle}>
                    <Col span={24}>
                      <Button
                        size="small"
                        type="primary"
                        onClick={() => {
                          approveSig(activityRecord.id);
                        }}>
                        Approve
                      </Button>
                      &nbsp;
                      <Button
                        size="small"
                        onClick={() => {
                          rejectSig('id');
                        }}>
                        Refuse
                      </Button>
                    </Col>
                  </Row>
                </div>
              )}
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
};
