import React, { useEffect, useState } from 'react';
import { getUserInfo } from '@/utils/localStorage';
import { Table } from 'antd';
import { DashOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown, message } from 'antd';
import { Link } from 'react-router-dom';
import {
  GetMultisigAddress,
  MultisigRecord,
  GetNeedSignatureList,
  GetMultisigHistoryList,
  UpdateNeedSignature,
} from '@/actions/MultisigWallet/multisigWallet';

const listStyle: React.CSSProperties = {
  marginTop: '160px',
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  fontSize: '15px',
};

const MultisigWallet = () => {
  const [abstractAddressList, setAbstractAddressList] = useState<string[]>([]);
  const [needMultisigRecordList, setNeedMultisigRecordList] = useState<MultisigRecord[]>([]);
  const [multisigRecordList, setMultisigRecordList] = useState<MultisigRecord[]>([]);

  const GetStatus = (status: number) => {
    if (status === 1) {
      return 'Auditing';
    } else if (status === 2) {
      return 'Success';
    } else if (status === 3) {
      return 'Fail';
    } else if (status === 4) {
      return 'Cancel';
    } else if (status === 5) {
      return 'Reject';
    } else if (status === 6) {
      return 'Pending';
    } else {
      return 'Unknown';
    }
  };

  useEffect(() => {
    console.log('useEffect');
    setAbstractAddressList([]);
    setNeedMultisigRecordList([]);
    setMultisigRecordList([]);
    async function loadData() {
      const getAddressRes = await GetMultisigAddress();
      if (getAddressRes.code === 200) {
        setAbstractAddressList(
          getAddressRes.data.signer_aa_account.map((item) => {
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

  const needColumns = [
    {
      title: 'UserOperationData',
      dataIndex: 'data',
      key: 'data',
    },
    {
      title: 'Status',
      key: 'status',
      render: GetStatus,
    },
  ];

  const recordColumns = [
    {
      title: 'UserOperationData',
      dataIndex: 'data',
      key: 'data',
    },
    {
      title: 'Op',
      key: 'op',
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
      <div style={listStyle}>
        <Link to="/addMultisigWalletAccount">Add Account For Multisig Wallet</Link>
      </div>
    </>
  );
};

export default MultisigWallet;
