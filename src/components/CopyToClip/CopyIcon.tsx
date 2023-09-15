import { useEffect, useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { CopyFilled } from '@ant-design/icons';
import { Tooltip } from 'antd';

interface ICopyToClipProps {
  address: string;
}

export const CopyIcon = ({ address }: ICopyToClipProps) => {
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
      <CopyToClipboard text={address} onCopy={() => () => setCopy(true)}>
        <Tooltip title={isCopy ? 'copied' : 'copy to clipboard'} arrow placement="right">
          <CopyFilled style={{ paddingLeft: '1rem', color: '#0048F4' }} />
        </Tooltip>
      </CopyToClipboard>
    </div>
  );
};
