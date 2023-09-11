import { useState } from 'react';
import { ActivityRecord } from '@/model/multisig';
import { Col, Row, Button, message } from 'antd';
import { CopyToClipLong } from '@/components/CopyToClip/CopyToClip';
import { CheckActivity } from './checkActivity';
import { GetStatusContent } from './status';
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
        style={{ height: 60, marginTop: 15, marginBottom: 15, cursor: 'pointer', paddingLeft: 10 }}
        onClick={() => {
          setCheckFlag(true);
        }}>
        <Col span={4} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: 45,
              height: 45,
              borderRadius: '50%',
              background: '#356DF3',
              color: '#FFF',
              fontSize: 25,
              fontWeight: 700,
            }}>
            S
          </div>
        </Col>
        <Col span={13} style={{ display: 'flex', marginTop: 4 }}>
          <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
            <div style={{ height: 30, display: 'flex', alignItems: 'center' }}>
              <span style={{ fontSize: 15 }}>{'Sender : '}</span> &nbsp;
            </div>
            <span style={{ fontSize: 12, color: '#356DF3' }}>
              <CopyToClipLong address={activityRecord.sender} />
            </span>
            {/* <div style={{ height: 30, display: 'flex', alignItems: 'center', fontSize: 17 }}>
              {GetStatus(activityRecord.status)}
            </div> */}
          </div>
        </Col>
        <Col span={7} style={{ display: 'flex', alignItems: 'center', justifyItems: 'center' }}>
          {GetStatusContent(activityRecord.status)}
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
      <Row style={{ height: 60, marginTop: 15, marginBottom: 15, cursor: 'pointer', paddingLeft: 10 }}>
        <Col span={4} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: 45,
              height: 45,
              borderRadius: '50%',
              background: '#356DF3',
              color: '#FFF',
              fontSize: 25,
              fontWeight: 700,
            }}>
            S
          </div>
        </Col>
        <Col span={13} style={{ display: 'flex', marginTop: 4 }}>
          <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
            <div style={{ height: 30, display: 'flex', alignItems: 'center' }}>
              <span style={{ fontSize: 15 }}>{'Sender : '}</span> &nbsp;
            </div>
            <span style={{ fontSize: 12, color: '#356DF3' }}>
              <CopyToClipLong address={activityRecord.sender} />
            </span>
          </div>
        </Col>
        <Col span={7} style={{ display: 'flex', alignItems: 'center', justifyItems: 'center' }}>
          {GetStatusContent(activityRecord.status)}
        </Col>
      </Row>
      {/* <Row style={{ height: 60, marginTop: 15, marginBottom: 15 }}>
        <Col span={4} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: 45,
              height: 45,
              borderRadius: '50%',
              background: '#356DF3',
              color: '#FFF',
              fontSize: 25,
              fontWeight: 700,
            }}>
            S
          </div>
        </Col>
        <Col span={13}>
          <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
            <div style={{ height: 30, display: 'flex', alignItems: 'center' }}>
              <span style={{ fontWeight: 'bold', fontSize: 19 }}>{'sender : '}</span> &nbsp;
              <span style={{ fontSize: 15 }}>
                <CopyToClipLong address={activityRecord.sender} />
              </span>
            </div>
            <div style={{ height: 30, display: 'flex', alignItems: 'center', fontSize: 17 }}>
              <div>{GetStatusContent(activityRecord.status)}</div>
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
      </Row> */}
    </>
  );
};
