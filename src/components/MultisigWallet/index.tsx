import { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { MultisigInfo } from '@/model/multisig';
import { GetMultisigAddress } from '@/actions/MultisigWallet/multisigWallet';
import { WalletInfo } from './wallet';

import '@/assets/styles/accountStyle/style.scss';

const Comp = () => {
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
    <div style={{ height: 400, overflowY: 'auto', marginTop: 20, color: '#000000' }}>
      {multisigAddressList &&
        multisigAddressList.map((row, index) => (
          <WalletInfo key={index} wallet={row} />
          // <Space
          //   key={index}
          //   direction="vertical"
          //   size="large"
          //   style={{
          //     display: 'flex',
          //     width: '100%',
          //     paddingTop: 30,
          //     paddingBottom: 30,
          //     borderBottom: '1px solid #D3D3D3',
          //   }}
          //   className="accountContentSend">
          //   <Row justify="space-around" align="middle">
          //     <Col span={10}>
          //       <span>Wallet Name : </span>
          //     </Col>
          //     <Col span={14}>{row.name}</Col>
          //   </Row>
          //   <Row justify="space-around" align="middle">
          //     <Col span={10}>
          //       <span>Wallet Address : </span>
          //     </Col>
          //     <Col span={14}>
          //       <CopyToClipLong key={index} address={row.abstract_account || ''} />
          //     </Col>
          //   </Row>
          //   <Row justify="space-around" align="middle">
          //     <Col span={10}>
          //       <span>Threshold Number : </span>
          //     </Col>
          //     <Col span={14}> {row.threshold}</Col>
          //   </Row>
          //   <Row justify="space-around" align="middle">
          //     <Col span={10}>
          //       <span>Member Address : </span>
          //     </Col>
          //     <Col span={14} style={{ display: 'flex', flexDirection: 'column' }}>
          //       <Space direction="vertical" size="small" style={{ display: 'flex', width: '100%' }}>
          //         {row.signer_aa_account &&
          //           row.signer_aa_account.map((item) => <CopyToClipLong key={index} address={item || ''} />)}
          //       </Space>
          //     </Col>
          //   </Row>
          // </Space>
        ))}
    </div>
  );
};

export default observer(Comp);
