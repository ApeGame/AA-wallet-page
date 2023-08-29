import React, { useEffect, useState } from 'react';
import { getUserInfo } from '@/utils/localStorage';
import { Table } from 'antd';
import { DashOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown, message } from 'antd';
import { Link } from 'react-router-dom';
import {
  GetMultisigAddress,
  GetNeedSignatureList,
  GetMultisigHistoryList,
  UpdateNeedSignature,
  GetStatus,
} from '@/actions/MultisigWallet/multisigWallet';
import { ActivityRecord } from '@/model/multisig';

const listStyle: React.CSSProperties = {
  marginTop: '10px',
  marginBottom: '10px',
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  fontSize: '15px',
};

const MultisigWallet = () => {
  const [abstractAddressList, setAbstractAddressList] = useState<string[]>([]);
  const [needMultisigRecordList, setNeedMultisigRecordList] = useState<ActivityRecord[]>([]);
  const [multisigRecordList, setMultisigRecordList] = useState<ActivityRecord[]>([]);

  useEffect(() => {
    console.log('useEffect');
    setAbstractAddressList([]);
    setNeedMultisigRecordList([]);
    setMultisigRecordList([]);
    async function loadData() {
      const getAddressRes = await GetMultisigAddress();
      if (getAddressRes.code === 200) {
        // setAbstractAddressList(
        //   getAddressRes.data.signer_aa_account.map((item) => {
        //     return item;
        //   })
        // );
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

      const multisigRecordListRes = await GetMultisigHistoryList();
      if (multisigRecordListRes.code === 200 && multisigRecordListRes.data) {
        setMultisigRecordList(
          multisigRecordListRes.data.map((item) => {
            return item;
          })
        );
      }
    }
    loadData();
  }, []);

  const onClick: MenuProps['onClick'] = async ({ key }) => {
    message.info(`user_operation id ${selectedId} action key ${key}`);
    if (key === '1') {
      const res = await UpdateNeedSignature('reject', selectedId);
      console.log('UpdateNeedSignature reject', res);
    } else if (key === '2') {
      const res = await UpdateNeedSignature('', selectedId);
      console.log('UpdateNeedSignature', res);
    }
  };

  const [selectedId, setSelectedId] = React.useState('tokens');

  const items: MenuProps['items'] = [
    {
      label: 'Refuse',
      key: '1',
    },
    {
      label: 'Approve',
      key: '2',
    },
  ];

  const recordColumns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Status',
      key: 'status',
      render: GetStatus,
    },
  ];

  const needColumns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Operation',
      key: 'operation',
      render: (_, record) => (
        <Dropdown menu={{ items, onClick }} trigger={['click']} placement="bottomLeft" arrow={{ pointAtCenter: true }}>
          {/* <DashOutlined style={{ cursor: 'pointer' }} /> */}
          <a
            onClick={(e) => {
              console.log('txHash', record.id);
              setSelectedId(record.id);
              e.preventDefault();
            }}
            style={{ color: '#000000' }}>
            <DashOutlined />
          </a>
        </Dropdown>
      ),
    },
  ];

  return (
    <>
      <div style={{ color: '#000000', marginTop: '25px' }}>
        <div style={listStyle}>
          <Link to="/addMultisigWalletAccount">Add Account For Multisig Wallet</Link>
        </div>
        <div>
          <span>owner(self) : {getUserInfo().abstractAccount}</span>
        </div>
        {abstractAddressList.map((item: string, index) => {
          return <div key={index}>{item}</div>;
        })}
      </div>
      <div style={{ marginTop: '40px', padding: '20px', color: '#000000' }}>
        <span>will sign txs:</span>
        <Table dataSource={needMultisigRecordList} columns={needColumns} rowKey="id" pagination={false} size="small" />
      </div>
      <div style={{ marginTop: '5px', padding: '20px', color: '#000000' }}>
        <span>all txs:</span>
        <Table dataSource={multisigRecordList} columns={recordColumns} rowKey="id" pagination={false} size="small" />
      </div>
    </>
  );
};

export default MultisigWallet;
