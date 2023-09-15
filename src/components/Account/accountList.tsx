/* eslint-disable react-refresh/only-export-components */
import React, { useState } from 'react';
import { CheckCircleOutlined, PlusOutlined, EditOutlined, LogoutOutlined } from '@ant-design/icons';
import { AccountStore } from '@/store/account';
import { Button, Modal, Col, Row } from 'antd';
import { truncateWalletAddrLong } from '@/utils/truncateWalletAddr';
import { formatWeiToEth } from '@/utils/formatterEth';
import classNames from 'classnames';
import { AddAccountDialog } from './addAccount';
import { observer } from 'mobx-react';
import { AddAccountEmailDialog } from '@/components/Account/setAccountEmail';
import UpdateAccountNameDialog from './updateAccountName';
import { getUserRecoverEmail, setCurrentAddress } from '@/utils/localStorage';
import { getCurrentNetworkWithStorage } from './hooks/chainConfig';
import { removeUserInfo } from '@/utils/localStorage';
import { useNavigate } from 'react-router-dom';
import Identicon from 'identicon.js';
import md5 from 'js-md5';

import '@/assets/styles/accountStyle/style.scss';

const AccountListDialog = () => {
  const [open, setOpen] = useState(false);

  const navigateTo = useNavigate();

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

  const logOut = () => {
    removeUserInfo();
    navigateTo('/login');
    window.location.reload();
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
            erc721AccountMap: item.erc721AccountMap,
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
      {AccountStore.accountList.length !== 0 ? (
        <div>
          {/* <Button type="text" onClick={showModal}>
            <span style={{ fontSize: '15px', fontWeight: 'bold', color: '#000000' }}>
              {AccountStore.accountList.map((row, index) => (
                <span key={index}>
                  {row.address === AccountStore.currentAccount.address && (row.name ? row.name : 'Account')}
                </span>
              ))}
              &nbsp; &nbsp;
              <DownOutlined />
            </span>
          </Button> */}
          {/* <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              cursor: 'pointer',
              width: 50,
              height: 50,
              borderRadius: '50%',
              backgroundColor: '#E0E0E0',
            }}
            onClick={showModal}>
            <span style={{ fontSize: '25px', fontWeight: 'bold', color: '#9D9D9D' }}>
              {AccountStore.currentAccount.name && AccountStore.currentAccount.name[0]}
            </span>
          </div> */}

          <div
            style={{
              position: 'relative',
              cursor: 'pointer',
              width: 45,
              height: 45,
            }}
            onClick={showModal}>
            {AccountStore.currentAccount.address && (
              <div style={{ position: 'absolute' }}>
                <img
                  width={'100%'}
                  height={'100%'}
                  style={{ borderRadius: '100%' }}
                  src={`data:image/png;base64,${new Identicon(AccountStore.currentAccount.address, {
                    background: [0, 0, 0, 0],
                    size: 45,
                  }).toString()}`}
                />
              </div>
            )}
            {AccountStore.currentAccount.name && (
              <div style={{ position: 'absolute' }}>
                <img
                  width={'100%'}
                  height={'100%'}
                  style={{ borderRadius: '100%' }}
                  src={`data:image/png;base64,${new Identicon(md5(AccountStore.currentAccount.name), {
                    background: [0, 0, 0, 0],
                    size: 45,
                  }).toString()}`}
                />
              </div>
            )}
            {AccountStore.currentAccount.name && (
              <div style={{ position: 'absolute' }}>
                <img
                  width={'100%'}
                  height={'100%'}
                  style={{ borderRadius: '100%' }}
                  src={`data:image/png;base64,${new Identicon(md5('salt1'), {
                    background: [0, 0, 0, 0],
                    size: 45,
                  }).toString()}`}
                />
              </div>
            )}
          </div>
        </div>
      ) : (
        <></>
        // <span>
        //   updating &nbsp;
        //   <LoadingOutlined />
        // </span>
      )}

      <Modal
        centered
        title="Select An Account "
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
        width={410}
        footer={[]}>
        <div style={{ height: 360, marginTop: 20, overflowY: 'auto' }}>
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
                style={{ marginTop: 20, marginBottom: 20 }}>
                <Row>
                  <Col span={4} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    {/* <div
                      style={{
                        width: 35,
                        height: 35,
                        borderRadius: '30%',
                        background: 'linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        fontSize: '15px',
                        fontWeight: 'bold',
                      }}>
                      {row.name && row.name[0]}
                    </div> */}
                    <div
                      style={{
                        width: 35,
                        height: 35,
                        borderRadius: '30%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      {row.address && (
                        <div style={{ position: 'absolute' }}>
                          <img
                            width={'100%'}
                            height={'100%'}
                            style={{ borderRadius: '100%' }}
                            src={`data:image/png;base64,${new Identicon(md5(row.address), {
                              background: [0, 0, 0, 0],
                              size: 45,
                            }).toString()}`}
                          />
                        </div>
                      )}
                      {row.name && (
                        <div style={{ position: 'absolute' }}>
                          <img
                            width={'100%'}
                            height={'100%'}
                            style={{ borderRadius: '100%' }}
                            src={`data:image/png;base64,${new Identicon(md5(row.name), {
                              background: [0, 0, 0, 0],
                              size: 45,
                            }).toString()}`}
                          />
                        </div>
                      )}
                      {AccountStore.currentAccount.name && (
                        <div style={{ position: 'absolute' }}>
                          <img
                            width={'100%'}
                            height={'100%'}
                            style={{ borderRadius: '100%' }}
                            src={`data:image/png;base64,${new Identicon(md5('salt1'), {
                              background: [0, 0, 0, 0],
                              size: 45,
                            }).toString()}`}
                          />
                        </div>
                      )}
                    </div>
                  </Col>
                  <Col span={18}>
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
                      <Col span={16}>
                        <span
                          style={{
                            fontFamily: 'Poppins',
                            color: '#999',
                            fontStyle: 'normal',
                            fontWeight: '500',
                            lineHeight: '10px',
                            fontSize: '1',
                          }}>
                          {truncateWalletAddrLong(row.address)}
                        </span>
                      </Col>
                      <Col span={8}>
                        <span
                          style={{
                            textAlign: 'right',
                            fontFamily: 'Poppins',
                            color: '#999',
                            fontStyle: 'normal',
                            fontWeight: '500',
                            lineHeight: '10px',
                            fontSize: '1',
                          }}>
                          {formatWeiToEth(row.nativeBalance)} {getCurrentNetworkWithStorage().symbol}
                        </span>
                      </Col>
                    </Row>
                  </Col>
                  <Col span={2} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    {row.address === AccountStore.currentAccount.address && (
                      <CheckCircleOutlined style={{ color: '#39B54A', fontWeight: 'bolder' }} />
                    )}
                  </Col>
                </Row>
              </div>
            </div>
          ))}
        </div>
        <div style={{ height: 100, marginTop: 10, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
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
          <span>
            <Button
              type="link"
              onClick={() => {
                logOut();
              }}>
              <LogoutOutlined style={{ color: '#1677ff' }} />
              Log out
            </Button>
          </span>
        </div>
      </Modal>
    </>
  );
};

export default observer(AccountListDialog);
