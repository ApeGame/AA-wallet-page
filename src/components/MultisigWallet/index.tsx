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
    <div style={{ color: '#000000', height: 330, overflowY: 'auto', width: '100%' }}>
      {multisigAddressList && multisigAddressList.map((row, index) => <WalletInfo key={index} wallet={row} />)}
    </div>
  );
};

export default observer(Comp);
