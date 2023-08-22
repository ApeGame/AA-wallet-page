import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react';
import { Col, Row, Space } from 'antd';
import { formatWeiToEth } from '@/utils/formatterEth';
import { CopyToClipLong } from '@/components/CopyToClip/CopyToClip';
import { AccountStore } from '@/store/account';
import { GetAccountAsset } from '@/actions/Token/token';
import { Link } from 'react-router-dom';
import { MultisigInfo } from '@/model/multisig';
import { GetMultisigHistoryList, GetStatus, GetMultisigAddress } from '@/actions/MultisigWallet/multisigWallet';
import { truncateWalletAddrLong } from '@/utils/truncateWalletAddr';

import '@/assets/styles/accountStyle/style.scss';

const contentStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#000000',
  marginTop: 20,
};

const Comp = () => {
  const navigateTo = useNavigate();

  const [multisigAddressList, setMultisigAddressList] = useState<MultisigInfo[]>([]);

  const loadData = async () => {
    setMultisigAddressList([]);

    const getAddressRes = await GetMultisigAddress();
    console.log('getAddressRes', getAddressRes);
    if (getAddressRes.code === 200) {
      setMultisigAddressList(
        getAddressRes.data.map((item) => {
          return item;
        })
      );
    }
  };

  useEffect(() => {
    // load
    loadData();
  }, []);

  return (
    <div style={{ height: 400, overflowY: 'auto', marginTop: 20 }}>
      {multisigAddressList &&
        multisigAddressList.map((row, index) => (
          <Space
            direction="vertical"
            size="large"
            style={{
              display: 'flex',
              width: '100%',
              paddingTop: 30,
              paddingBottom: 30,
              borderBottom: '1px solid #D3D3D3',
            }}
            key={index}
            className="accountContentSend">
            <Row justify="space-around" align="middle">
              <Col span={10}>
                <span>Wallet Address : </span>
              </Col>
              <Col span={14}>
                <CopyToClipLong address={row.abstract_account || ''} />
              </Col>
            </Row>
            <Row justify="space-around" align="middle">
              <Col span={10}>
                <span>Threshold Number : </span>
              </Col>
              <Col span={14}> {row.threshold}</Col>
            </Row>
            <Row justify="space-around" align="middle">
              <Col span={10}>
                <span>Member Address : </span>
              </Col>
              <Col span={14} style={{ display: 'flex', flexDirection: 'column' }}>
                <Space direction="vertical" size="small" style={{ display: 'flex', width: '100%' }}>
                  {row.signer_aa_account &&
                    row.signer_aa_account.map((item) => <CopyToClipLong address={item || ''} />)}
                </Space>
              </Col>
            </Row>
          </Space>
        ))}
    </div>
  );
};

export default observer(Comp);
