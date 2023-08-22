/* eslint-disable react-refresh/only-export-components */
import React, { useEffect, useState } from 'react';
import { DownOutlined, PlusOutlined } from '@ant-design/icons';
import { GetAccountAsset } from '@/actions/Token/token';
import { AccountStore } from '@/store/account';
import { Button, Modal, Col, Row, Space } from 'antd';
import { truncateWalletAddrLong } from '@/utils/truncateWalletAddr';
import { formatWeiToEth } from '@/utils/formatterEth';
import classNames from 'classnames';
import { AddAccountDialog } from './addAccount';
import { observer } from 'mobx-react';

import '@/assets/styles/accountStyle/style.scss';

const AccountListDialog = () => {
  const [open, setOpen] = useState(false);

  const [addAccountFlag, setAddAccountFlag] = React.useState(false);

  const handleAddAccountClose = () => {
    setAddAccountFlag(false);
  };

  const showModal = () => {
    setOpen(true);
  };

  const selectAccount = (address: string) => {
    if (!(address === AccountStore.currentAccount.address)) {
      AccountStore.accountList.map((item) => {
        if (item.address === address) {
          AccountStore.setCurrentAccount({
            address: item.address,
            erc20AccountMap: item.erc20AccountMap,
            nativeBalance: item.nativeBalance,
            isMultisig: item.isMultisig,
          });
        }
      });
    }
    setOpen(false);
  };

  const handleOk = (e: React.MouseEvent<HTMLElement>) => {
    console.log(e);
    setOpen(false);
  };

  const handleCancel = (e: React.MouseEvent<HTMLElement>) => {
    console.log(e);
    setOpen(false);
  };

  // const loadData = async () => {
  //   AccountStore.clearAccountList();
  //   AccountStore.clearCurrentAccount();
  //   const res = await GetAccountAsset();
  //   const addressSet = new Set();
  //   if (res.code === 200) {
  //     if (res.data.abstract_account) {
  //       AccountStore.pushAccount({
  //         address: res.data.abstract_account.Address,
  //         erc20AccountMap: res.data.abstract_account.Erc20,
  //         nativeBalance: res.data.abstract_account.Native,
  //         isMultisig: false,
  //       });

  //       AccountStore.setCurrentAccount({
  //         address: res.data.abstract_account.Address,
  //         erc20AccountMap: res.data.abstract_account.Erc20,
  //         nativeBalance: res.data.abstract_account.Native,
  //         isMultisig: false,
  //       });
  //     }
  //     if (res.data.multiple_abstract_account) {
  //       res.data.multiple_abstract_account.map((item) => {
  //         if (!addressSet.has(item.Address)) {
  //           AccountStore.pushAccount({
  //             address: item.Address,
  //             erc20AccountMap: item.Erc20,
  //             nativeBalance: item.Native,
  //             isMultisig: true,
  //           });
  //         }
  //         addressSet.add(item.Address);
  //       });
  //     }
  //   }
  // };

  // useEffect(() => {
  //   console.log('loadData!!!!');
  //   loadData();
  // }, [addAccountFlag]);

  return (
    <>
      {AccountStore.accountList.length !== 0 && (
        <div>
          <Button type="text" onClick={showModal}>
            <span style={{ fontSize: '15px', fontWeight: 'bold', color: '#000000' }}>
              {AccountStore.accountList.map((row, index) => (
                <span key={index}>
                  {row.address === AccountStore.currentAccount.address && 'Account ' + (index + 1)}
                </span>
              ))}
              &nbsp; &nbsp;
              <DownOutlined />
            </span>
          </Button>
        </div>
      )}

      <Modal
        centered
        title="Select an account "
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
        width={390}
        footer={[]}>
        <div style={{ height: 330, marginTop: 20, overflowY: 'auto' }}>
          {AccountStore.accountList.map((row, index) => (
            <div
              className={classNames(
                'accountContent',
                row.address === AccountStore.currentAccount.address ? 'accountContentSelect' : 'accountContent'
              )}
              key={index}
              style={{ padding: 10 }}
              onClick={() => {
                selectAccount(row.address);
              }}>
              <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
                <Row>
                  <Col span={24}>
                    <span style={{ fontSize: '15px', fontWeight: 'bold' }}>
                      {'Account ' + (index + 1) + ' '}
                      {row.isMultisig ? '(Multisig)' : '(Abstract)'}
                    </span>
                  </Col>
                </Row>
                <Row>
                  <Col span={18}>
                    <span>{truncateWalletAddrLong(row.address)}</span>
                  </Col>
                  <Col span={6}>
                    <span style={{ textAlign: 'right' }}>{formatWeiToEth(row.nativeBalance)}</span>
                  </Col>
                </Row>
              </Space>
            </div>
          ))}
        </div>
        <div style={{ height: 100, marginTop: 10, overflowY: 'auto' }}>
          <span>
            <Button
              type="link"
              onClick={() => {
                setAddAccountFlag(true);
              }}>
              <PlusOutlined style={{ color: '#1677ff' }} />
              Add Multisig Wallet Account
            </Button>
            <AddAccountDialog isOpen={addAccountFlag} onClose={handleAddAccountClose} />
          </span>
        </div>
      </Modal>
    </>
  );
};

export default observer(AccountListDialog);
