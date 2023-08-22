import { useEffect, useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { truncateWalletAddrLong } from '@/utils/truncateWalletAddr';
import { CopyFilled } from '@ant-design/icons';
import { Tooltip } from 'antd';

interface ICopyToClipProps {
  address: string;
}

export const CopyToClipLong = ({ address }: ICopyToClipProps) => {
  const [isCopy, setCopy] = useState<boolean>(false);

  useEffect(() => {
    if (isCopy) {
      setTimeout(() => {
        setCopy(false);
      }, 1000);
    }
  }, [isCopy]);

  return (
    <div style={{ cursor: 'pointer' }}>
      <h4>
        {truncateWalletAddrLong(address)}
        <CopyToClipboard text={address} onCopy={() => () => setCopy(true)}>
          <Tooltip title={isCopy ? 'copied' : 'copy to clipboard'} arrow>
            <CopyFilled />
          </Tooltip>
        </CopyToClipboard>
      </h4>
    </div>
  );
};
