import { Button, Table, Space } from 'antd';
import { formatterTimeStampTime } from '@/utils/formatterTime';

import '@/assets/styles/global.scss';

const View = () => {
  const dataSource = [
    {
      key: '1',
      status: 0,
      address: '0xd166b9d1931c8b754c23b1220a8761b60712c1b4',
      from: 'aAED',
      to: 'aINR',
      max_amount: 1000,
      create_time: 1690180541,
    },
  ];

  const columns = [
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'From',
      dataIndex: 'from',
      key: 'from',
    },
    {
      title: 'To',
      dataIndex: 'to',
      key: 'to',
    },
    {
      title: 'MaxAmount',
      dataIndex: 'max_amount',
      key: 'max_amount',
    },
    {
      title: 'CreateTime',
      dataIndex: 'create_time',
      key: 'create_time',
      render: formatterTimeStampTime,
    },
    {
      title: 'Operation',
      render: () => {
        return (
          <>
            <Space wrap>
              <Button type="primary" className="operation_button">
                Pass
              </Button>
              <Button danger className="operation_button">
                Refuse
              </Button>
            </Space>
          </>
        );
      },
    },
  ];
  return (
    <div style={{ paddingTop: '10px' }}>
      <p className="contentTitle">Rules list</p>
      <div className="contentInner">
        <div style={{ paddingTop: '20px' }}>
          <Table dataSource={dataSource} columns={columns} rowKey="key" pagination={false} size="small" />
        </div>
      </div>
    </div>
  );
};

export default View;
