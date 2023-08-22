import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react';
import { Col, Row } from 'antd';
import { formatWeiToEth } from '@/utils/formatterEth';
import { CopyToClipLong } from '@/components/CopyToClip/CopyToClip';
import { AccountStore } from '@/store/account';
import { GetAccountAsset } from '@/actions/Token/token';
import { Link } from 'react-router-dom';
import { truncateWalletAddrLong } from '@/utils/truncateWalletAddr';

import '@/assets/styles/accountStyle/style.scss';

const contentStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#000000',
  flexDirection: 'column',
};

const listStyle: React.CSSProperties = {
  marginTop: '30px',
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  fontSize: '15px',
};

const Comp = () => {
  const navigateTo = useNavigate();

  // const loadData = async () => {
  //   AccountStore.clearAccountList();
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
  //   // load
  //   loadData();
  // }, []);

  return (
    <div>
      <div style={contentStyle}>
        {AccountStore.currentAccount.erc20AccountMap &&
          Object.keys(AccountStore.currentAccount.erc20AccountMap).map((key, index) => {
            return (
              <div
                key={index}
                style={{ marginTop: 15 }}
                className="accountContentSend"
                onClick={() => {
                  navigateTo(`/tokenOverview?tokenAddress=${key}`);
                }}>
                {/* {key} {AccountStore.currentAccount.erc20AccountMap[key]} */}

                <Row justify="space-around" align="middle" style={{ height: 100, width: 400 }}>
                  <Col span={16} style={{ fontWeight: 'bold', fontSize: 17 }}>
                    <span>{truncateWalletAddrLong(key)}</span>
                    {/* <CopyToClipLong address={key || ''} /> */}
                  </Col>
                  <Col span={8}>
                    <span style={{ textAlign: 'right', fontSize: 18 }}>
                      {formatWeiToEth(AccountStore.currentAccount.erc20AccountMap[key])}
                    </span>
                  </Col>
                </Row>
              </div>
            );
          })}

        <div style={listStyle}>
          <Link to="/addToken">Import tokens</Link>
        </div>
      </div>
    </div>
  );
};

export default observer(Comp);
