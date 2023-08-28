/* eslint-disable react-refresh/only-export-components */
import React, { useState } from 'react';
import { DownOutlined, PlusOutlined, EditOutlined } from '@ant-design/icons';
import { AccountStore } from '@/store/account';
import { Button, Modal, Col, Row, Space } from 'antd';
import { truncateWalletAddrLong } from '@/utils/truncateWalletAddr';
import { formatWeiToEth } from '@/utils/formatterEth';
import classNames from 'classnames';
import { AddAccountDialog } from './addAccount';
import { observer } from 'mobx-react';
import { AddAccountEmailDialog } from '@/components/Account/setAccountEmail';
import UpdateAccountNameDialog from './updateAccountName';
import { getUserRecoverEmail, setCurrentAddress } from '@/utils/localStorage';

import '@/assets/styles/accountStyle/style.scss';

const AccountListDialog = () => {
  const [open, setOpen] = useState(false);

  const [addAccountFlag, setAddAccountFlag] = React.useState(false);
  const handleAddAccountClose = () => {
    setAddAccountFlag(false);
  };

  const [setAccountEmailFlag, setSetAccountEmailFlag] = useState(false);
  const handleSetAccountEmailClose = () => {
    setSetAccountEmailFlag(false);
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
            isUpdate: false,
            name: item.name,
          });
        }
      });
    }
    setCurrentAddress(address);
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

  // useEffect(() => {
  //   async function loadData() {
  //     const res = await GetUser();
  //     console.log('GetUser res', res);
  //   }
  //   loadData();
  // }, []);

  return (
    <>
      {AccountStore.accountList.length !== 0 && (
        <div>
          <Button type="text" onClick={showModal}>
            <span style={{ fontSize: '15px', fontWeight: 'bold', color: '#000000' }}>
              {AccountStore.accountList.map((row, index) => (
                <span key={index}>
                  {row.address === AccountStore.currentAccount.address && (row.name ? row.name : 'Account')}
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
            <div key={index}>
              <UpdateAccountNameDialog
                isOpen={row.isUpdate}
                address={row.address}
                onClose={() => {
                  console.log('close');
                  AccountStore.updateAccountNameFlagByAddress(row.address, false);
                }}
              />
              <div
                className={classNames(
                  'accountContent',
                  row.address === AccountStore.currentAccount.address ? 'accountContentSelect' : 'accountContent'
                )}
                onClick={() => {
                  selectAccount(row.address);
                }}
                style={{ padding: 10 }}>
                <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
                  <Row>
                    <Col span={24}>
                      <span style={{ fontSize: '15px', fontWeight: 'bold' }}>
                        {row.name ? row.name : 'Account'}
                        {row.isMultisig ? '(Multisig)' : '(Abstract)'}
                      </span>

                      {row.isMultisig && (
                        <span
                          style={{ marginLeft: 10 }}
                          onClick={(e) => {
                            console.log('edit name');
                            e.stopPropagation();
                            AccountStore.updateAccountNameFlagByAddress(row.address, true);
                          }}>
                          <EditOutlined />
                        </span>
                      )}
                    </Col>
                  </Row>
                  <Row>
                    <Col span={15}>
                      <span>{truncateWalletAddrLong(row.address)}</span>
                    </Col>
                    <Col span={9}>
                      <span style={{ textAlign: 'right' }}>
                        {formatWeiToEth(row.nativeBalance)} {AccountStore.getCurrentNetworkSymbol()}
                      </span>
                    </Col>
                  </Row>
                </Space>
              </div>
            </div>
          ))}
        </div>
        <div style={{ height: 100, marginTop: 10, overflowY: 'auto' }}>
          {!getUserRecoverEmail() ? (
            <span>
              <Button
                type="link"
                onClick={() => {
                  setSetAccountEmailFlag(true);
                }}>
                <PlusOutlined style={{ color: '#1677ff' }} />
                Bind recover email
              </Button>
              <AddAccountEmailDialog isOpen={setAccountEmailFlag} onClose={handleSetAccountEmailClose} />
            </span>
          ) : (
            <span>Recovery email has been added : {getUserRecoverEmail()}</span>
          )}
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
