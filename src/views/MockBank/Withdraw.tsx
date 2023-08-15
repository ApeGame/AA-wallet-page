import React, { useEffect } from 'react';
import { Table } from 'antd';
import { ReserveAccountOrder, getReserveAccountOrder, BillWithDraws, getBillWithDraws } from '@/actions/withdraw';
import type { ColumnsType } from 'antd/es/table';
import { formatterTime } from '@/utils/formatterTime';
import '@/assets/styles/global.scss';

const View = () => {
  const [bankWithDrawsList, setBankWithDrawsList] = React.useState<ReserveAccountOrder[]>();
  const [billWithDrawsList, setBillWithDraws] = React.useState<BillWithDraws[]>();

  const BankColumns: ColumnsType<ReserveAccountOrder> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (text) => text / 10000,
    },
    {
      title: 'UserAccount',
      dataIndex: 'userAccount',
      key: 'userAccount',
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: formatterTime,
    },
  ];

  const BillColumns: ColumnsType<BillWithDraws> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'BillCode',
      dataIndex: 'billCode',
      key: 'billCode',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (_, { status }) => <>{status == 0 ? '未兑换' : '已兑换'}</>,
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (text) => text / 100,
    },
  ];

  useEffect(() => {
    async function loadData() {
      const bankWithDrawsRes = await getReserveAccountOrder();
      if (bankWithDrawsRes.code !== -1) {
        setBankWithDrawsList(bankWithDrawsRes.data);
      }
      const billWithDrawsListRes = await getBillWithDraws();
      if (billWithDrawsListRes.code !== -1) {
        setBillWithDraws(billWithDrawsListRes.data);
      }
      // setBankWithDrawsList([
      //   { id: '1', account: 'qqq', balance: '10', email: 'www', name: 'eee', idNo: '111' },
      //   { id: '2', account: 'qqq2', balance: '102', email: 'www2', name: 'eee2', idNo: '1112' },
      // ]);
      // setBillWithDraws([
      //   { id: '3', billCode: 'aaa', status: 1, amount: '123' },
      //   { id: '4', billCode: '4aaa', status: 0, amount: '1234' },
      // ]);
    }
    loadData();
  }, []);

  return (
    <div className="content">
      <div>
        <p className="contentTitle">Withdraw Bank</p>
        <div className="contentInner">
          <div style={{ paddingTop: '20px' }}>
            <Table dataSource={bankWithDrawsList} columns={BankColumns} rowKey="id" pagination={false} size="small" />
          </div>
        </div>
      </div>

      <div style={{ paddingTop: '150px' }}>
        <p className="contentTitle">Withdraw Bill</p>
        <div className="contentInner">
          <div style={{ paddingTop: '20px' }}>
            <Table dataSource={billWithDrawsList} columns={BillColumns} rowKey="id" pagination={false} size="small" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default View;
