import { useEffect, useState } from 'react';
import { getWithdrawList, withdraw } from '@/actions/audit';
import type { ColumnsType } from 'antd/es/table';
import { formatterTimeStampTime } from '@/utils/formatterTime';
import { Button, Table, Space } from 'antd';
import { AuditDialog } from '@/components/Dialog/AuditDialog';
import { GetAuditNum } from '@/actionsContract/audit';
import { useWallet } from '@/hooks/wallet/wallet';
import { GetTokenErcName } from '@/actions/chainInfo';

import '@/assets/styles/global.scss';

const View = () => {
  const [withdrawList, setWithdrawList] = useState<withdraw[]>();
  const [withdrawOrder, setWithdrawOrder] = useState<withdraw>();
  const [withdrawAuditDialogFlag, setWithdrawAuditDialogFlag] = useState(false);
  const [withdrawAuditHandleFlag, setWithdrawAuditHandleFlag] = useState(false);
  const [auditNum, setAuditNum] = useState(0);
  const walletData = useWallet();

  const PassWithdraw = (item: withdraw) => {
    setWithdrawAuditHandleFlag(true);
    setWithdrawOrder(item);
    setWithdrawAuditDialogFlag(true);
  };

  const RefuseWithdraw = async (item: withdraw) => {
    setWithdrawAuditHandleFlag(false);
    setWithdrawOrder(item);
    setWithdrawAuditDialogFlag(true);
  };

  const columns: ColumnsType<withdraw> = [
    {
      title: 'ID',
      dataIndex: 'withdraw_id',
      key: 'withdraw_id',
    },
    {
      title: 'Amount',
      dataIndex: 'token_amount',
      key: 'token_amount',
      render: (text) => text / 100,
    },
    {
      title: 'Token',
      dataIndex: 'token_address',
      key: 'token_address',
      render: GetTokenErcName,
    },
    {
      title: 'Progress',
      render: (row) => {
        return <>{`${row.pass_count} / ${auditNum}`}</>;
      },
    },
    {
      title: 'Created At',
      dataIndex: 'create_time',
      key: 'create_time',
      render: formatterTimeStampTime,
    },
    {
      title: 'Operation',
      render: (row) => {
        return (
          <>
            <Space wrap>
              <Button
                type="primary"
                className="operation_button"
                onClick={() => {
                  PassWithdraw(row);
                }}>
                Pass
              </Button>
              <Button
                danger
                className="operation_button"
                onClick={() => {
                  RefuseWithdraw(row);
                }}>
                Refuse
              </Button>
            </Space>
          </>
        );
      },
    },
  ];

  useEffect(() => {
    async function loadData() {
      const listRes = await getWithdrawList();
      // console.log('listRes', listRes);
      setWithdrawList(listRes.data);
      const auditNum = await GetAuditNum(walletData.provider);
      setAuditNum(parseInt(auditNum));
    }
    loadData();
  }, []);

  return (
    <div style={{ paddingTop: '10px' }}>
      <p className="contentTitle">Withdraw list</p>
      <div className="contentInner">
        <div style={{ paddingTop: '20px' }}>
          <Table dataSource={withdrawList} columns={columns} rowKey="withdraw_id" pagination={false} size="small" />
        </div>
      </div>
      <AuditDialog
        isOpen={withdrawAuditDialogFlag}
        isPass={withdrawAuditHandleFlag}
        withdrawOrder={withdrawOrder}
        onClose={() => {
          setWithdrawAuditDialogFlag(false);
        }}></AuditDialog>
    </div>
  );
};

export default View;
