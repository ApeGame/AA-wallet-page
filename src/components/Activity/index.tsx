import { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { Col, Row, Space, Button, message } from 'antd';
import { truncateWalletAddrLong } from '@/utils/truncateWalletAddr';
import { CopyToClipLong } from '@/components/CopyToClip/CopyToClip';
import { MultisigRecord } from '@/model/multisig';
import { ReloadOutlined } from '@ant-design/icons';
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
    console.log('load user operation');
    loadData();
  }, [activityType]);

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

  const moveToUserOperationScan = (hash: string) => {
    return (
      <a target="_blank" href={`${import.meta.env.VITE_SCAN_URL}/user_operation/${hash}`}>
        {truncateWalletAddrLong(hash)}
      </a>
    );
  };

  const moveToBlockScan = (hash: string) => {
    return (
      <a target="_blank" href={`${import.meta.env.VITE_BLOCK_SCAN_URL}/tx/${hash}`}>
        {truncateWalletAddrLong(hash)}
      </a>
    );
  };

  return (
    <>
      {contextHolder}
      <div style={{ height: 410, overflowY: 'auto', marginTop: 10, color: '#000000' }}>
        <Row justify="space-around" align="middle">
          <Col span={10}>
            <Button
              type={activityType === 'all' ? 'text' : 'link'}
              onClick={() => {
                setActivityType('all');
              }}>
              All Activity
            </Button>
          </Col>
          <Col span={10}>
            <Button
              type={activityType === 'signature' ? 'text' : 'link'}
              onClick={() => {
                setActivityType('signature');
              }}>
              Waiting Activity
            </Button>
          </Col>
          <Col span={4}>
            <ReloadOutlined
              onClick={() => {
                loadData();
              }}
            />
          </Col>
        </Row>
        <div style={{ marginTop: 10 }}>
          {activityType === 'all' && multisigRecordList.length === 0 && <span>No date</span>}
          {activityType === 'all' &&
            multisigRecordList &&
            multisigRecordList.map((row, index) => (
              <Space
                key={index}
                direction="vertical"
                size="small"
                style={{
                  display: 'flex',
                  width: '100%',
                  paddingTop: 30,
                  paddingBottom: 30,
                  borderBottom: '1px solid #D3D3D3',
                }}>
                <Row justify="space-between" align="bottom">
                  <Col span={10}>
                    <span>Sender : </span>
                  </Col>
                  <Col span={14}>
                    <CopyToClipLong address={row.sender || ''} />
                  </Col>
                </Row>
                {row.user_operation_hash && (
                  <Row justify="space-between" align="bottom">
                    <Col span={10}>
                      <span>User operation hash : </span>
                    </Col>
                    <Col span={14}>
                      <span>{row.user_operation_hash && moveToUserOperationScan(row.user_operation_hash)}</span>
                    </Col>
                  </Row>
                )}
                {row.transaction_hash && (
                  <Row justify="space-between" align="bottom">
                    <Col span={10}>
                      <span>Transaction hash : </span>
                    </Col>
                    <Col span={14}>
                      <span>{row.transaction_hash && moveToBlockScan(row.transaction_hash)}</span>
                    </Col>
                  </Row>
                )}
                <Row justify="space-between" align="bottom">
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

        <div style={{ marginTop: 10 }}>
          {activityType === 'signature' && needMultisigRecordList.length === 0 && <span>No signature date</span>}
          {activityType === 'signature' &&
            needMultisigRecordList &&
            needMultisigRecordList.map((row, index) => (
              <Space
                key={index}
                direction="vertical"
                size="small"
                style={{
                  display: 'flex',
                  width: '100%',
                  paddingTop: 30,
                  paddingBottom: 30,
                  borderBottom: '1px solid #D3D3D3',
                }}>
                <Row justify="space-between" align="bottom">
                  <Col span={10}>
                    <span>Sender : </span>
                  </Col>
                  <Col span={14}>
                    <CopyToClipLong address={row.sender || ''} />
                  </Col>
                </Row>
                {row.user_operation_hash && (
                  <Row justify="space-between" align="bottom">
                    <Col span={10}>
                      <span>User operation hash : </span>
                    </Col>
                    <Col span={14}>
                      <span>{row.user_operation_hash && moveToUserOperationScan(row.user_operation_hash)}</span>
                    </Col>
                  </Row>
                )}
                {row.transaction_hash && (
                  <Row justify="space-between" align="bottom">
                    <Col span={10}>
                      <span>Transaction hash : </span>
                    </Col>
                    <Col span={14}>
                      <span>{row.transaction_hash && moveToBlockScan(row.transaction_hash)}</span>
                    </Col>
                  </Row>
                )}
                <Row justify="space-between" align="bottom">
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
