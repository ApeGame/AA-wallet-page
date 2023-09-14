import { useEffect, useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { truncateWalletAddrLong } from '@/utils/truncateWalletAddr';
import { CopyFilled } from '@ant-design/icons';
import { Tooltip } from 'antd';

interface ICopyToClipProps {
  address: string;
}

export const CopyToClipWidth = ({ address }: ICopyToClipProps) => {
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
            <CopyFilled style={{ paddingLeft: '1rem', color: '#0048F4' }} />
          </Tooltip>
        </CopyToClipboard>
      </h4>
    </div>
  );
};
