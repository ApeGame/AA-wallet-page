import React, { useEffect } from 'react';
import { getUserInfo } from '@/utils/localStorage';
import { Table } from 'antd';
import { DashOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown, message } from 'antd';

const contentStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  color: '#000000',
  marginTop: '75px',
};

const MultisigWallet = () => {
  const onClick: MenuProps['onClick'] = ({ key }) => {
    message.info(`tx hash ${selectedTx} action key ${key}`);
  };

  const [selectedTx, setSelectedTx] = React.useState('tokens');

  const process = async (txHash: string, actionKey: string) => {
    message.info(`txHash ${txHash} actionKey is ${actionKey}`);
  };

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

  const dataSource = [
    {
      key: '1',
      txHash: '0xE78d01859e1dEf74468EeF6c7E2976ef929D2AE1',
    },
    {
      key: '2',
      txHash: '0xD5fB43F2C0504441E2c7FfBe11b566e034Bb8E3E',
    },
  ];

  const columns = [
    {
      title: 'TxHash',
      dataIndex: 'txHash',
      key: 'txHash',
    },
    {
      title: 'Op',
      key: 'op',
      render: (_, record) => (
        <Dropdown menu={{ items, onClick }} trigger={['click']} placement="bottomLeft" arrow={{ pointAtCenter: true }}>
          {/* <DashOutlined style={{ cursor: 'pointer' }} /> */}
          <a
            onClick={(e) => {
              console.log('txHash', record.txHash);
              setSelectedTx(record.txHash);
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
      <div style={contentStyle}>
        <div>
          <span>owner(self) : {getUserInfo().abstractAccount}</span>
        </div>
      </div>
      <div style={{ marginTop: '40px', padding: '20px' }}>
        <Table dataSource={dataSource} columns={columns} rowKey="txHash" pagination={false} size="small" />
      </div>
    </>
  );
};

export default MultisigWallet;
