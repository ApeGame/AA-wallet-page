import { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { Col, Row, Space, Button, message } from 'antd';
import { truncateWalletAddrLong } from '@/utils/truncateWalletAddr';
import { CopyToClipLong } from '@/components/CopyToClip/CopyToClip';
import { MultisigRecord } from '@/model/multisig';
import {
  GetMultisigHistoryList,
  GetStatus,
  GetNeedSignatureList,
  UpdateNeedSignature,
} from '@/actions/MultisigWallet/multisigWallet';

import '@/assets/styles/accountStyle/style.scss';

const Comp = () => {
  const [activityType, setActivityType] = useState('all');
  const [multisigRecordList, setMultisigRecordList] = useState<MultisigRecord[]>([]);
  const [needMultisigRecordList, setNeedMultisigRecordList] = useState<MultisigRecord[]>([]);
  const [messageApi, contextHolder] = message.useMessage();

  const loadData = async () => {
    setMultisigRecordList([]);
    setNeedMultisigRecordList([]);

    const multisigRecordListRes = await GetMultisigHistoryList();
    if (multisigRecordListRes.code === 200 && multisigRecordListRes.data) {
      console.log('multisigRecordListRes.data', multisigRecordListRes.data);
      setMultisigRecordList(
        multisigRecordListRes.data.map((item) => {
          return item;
        })
      );
    }

    const needMultisigRecordListRes = await GetNeedSignatureList();
    if (needMultisigRecordListRes.code === 200 && needMultisigRecordListRes.data) {
      console.log('needMultisigRecordListRes', needMultisigRecordListRes);
      setNeedMultisigRecordList(
        needMultisigRecordListRes.data.map((item) => {
          return item;
        })
      );
    }
  };

  useEffect(() => {
    // load
    loadData();
  }, []);

  const approveSig = async (id: string) => {
    const res = await UpdateNeedSignature('', id);
    console.log('UpdateNeedSignature', res);
    if (res.code === 200) {
      messageApi.success('Complete');
    } else {
      messageApi.error('Fail');
    }
  };

  const rejectSig = async (id: string) => {
    const res = await UpdateNeedSignature('reject', id);
    console.log('UpdateNeedSignature reject', res);
    if (res.code === 200) {
      messageApi.success('Complete');
    } else {
      messageApi.error('Fail');
    }
  };

  return (
    <>
      {contextHolder}
      <div style={{ height: 400, overflowY: 'auto', marginTop: 30, color: '#000000' }}>
        <Row justify="space-around" align="middle">
          <Col span={12}>
            <Button
              type="link"
              onClick={() => {
                setActivityType('all');
              }}>
              All Activity
            </Button>
          </Col>
          <Col span={12}>
            <Button
              type="link"
              onClick={() => {
                setActivityType('signature');
              }}>
              Signature Activity
            </Button>
          </Col>
        </Row>
        <div style={{ marginTop: 20 }}>
          {activityType === 'all' &&
            multisigRecordList &&
            multisigRecordList.map((row, index) => (
              <Space key={index} direction="vertical" size="large" style={{ display: 'flex', width: '100%' }}>
                <Row justify="space-around" align="middle">
                  <Col span={10}>
                    <span>Sender : </span>
                  </Col>
                  <Col span={14}>
                    <CopyToClipLong address={row.sender || ''} />
                  </Col>
                </Row>
                <Row justify="space-around" align="middle">
                  <Col span={10}>
                    <span>User operation hash : </span>
                  </Col>
                  <Col span={14}>
                    <span>{truncateWalletAddrLong(row.user_operation_hash)}</span>
                  </Col>
                </Row>
                <Row justify="space-around" align="middle">
                  <Col span={10}>
                    <span>Status : </span>
                  </Col>
                  <Col span={12}>
                    <span>{GetStatus(row.status)} </span>
                  </Col>
                </Row>
              </Space>
            ))}
        </div>

        <div style={{ marginTop: 20 }}>
          {activityType === 'signature' &&
            needMultisigRecordList &&
            needMultisigRecordList.map((row, index) => (
              <Space key={index} direction="vertical" size="large" style={{ display: 'flex', width: '100%' }}>
                <Row justify="space-around" align="middle">
                  <Col span={10}>
                    <span>Sender : </span>
                  </Col>
                  <Col span={14}>
                    <CopyToClipLong address={row.sender || ''} />
                  </Col>
                </Row>
                <Row justify="space-around" align="middle">
                  <Col span={10}>
                    <span>User operation hash : </span>
                  </Col>
                  <Col span={14}>
                    <span>{truncateWalletAddrLong(row.user_operation_hash)}</span>
                  </Col>
                </Row>
                <Row justify="space-around" align="middle">
                  <Col span={10}>
                    <span>Operation : </span>
                  </Col>
                  <Col span={12}>
                    <Button
                      size="small"
                      type="primary"
                      onClick={() => {
                        approveSig(row.id);
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
              </Space>
            ))}
        </div>
      </div>
    </>
  );
};

export default observer(Comp);
