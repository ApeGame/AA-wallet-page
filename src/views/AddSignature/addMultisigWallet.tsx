import { Input, Button, message, Space } from 'antd';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CreateMultisigAddress } from '@/actions/MultisigWallet/multisigWallet';
import { getUserInfo } from '@/utils/localStorage';

const contentStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '60px',
  width: '100%',
  color: '#000000',
  marginTop: '30px',
  paddingLeft: 15,
  paddingRight: 15,
};

const listStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  height: '300px',
  width: '100%',
  color: '#000000',
  paddingLeft: 15,
  paddingRight: 15,
  marginTop: '80px',
};

const View = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const [abstractAddressList, setAbstractAddressList] = useState<string[]>([]);
  const [abstractAddress, setAbstractAddress] = useState('');
  const [threshold, setThreshold] = useState(0);

  const createSig = async () => {
    setIsLoading(true);
    const addRes = await CreateMultisigAddress(getUserInfo().abstractAccount, threshold, abstractAddressList);
    if (addRes.code === 200) {
      messageApi.success('Success');
    } else {
      messageApi.error('Fail');
    }
    setIsLoading(false);
  };

  return (
    <div>
      {contextHolder}
      <div style={{ color: '#000000', marginTop: '10px' }}>
        <span>owner(self) : {getUserInfo().abstractAccount}</span>
      </div>
      <div style={contentStyle}>
        <span>Add Multisig Wallet Account</span>
        <Link to="/multisigWallet" style={{ marginLeft: '220px' }}>
          Back
        </Link>
      </div>
      <div style={contentStyle}>
        <Space direction="vertical" size="middle">
          <Space.Compact style={{ width: '440px' }}>
            <Input
              placeholder="Set Threshold Number"
              onChange={(e) => {
                if (e != null) {
                  setThreshold(parseInt(e.target.value.trim()));
                }
              }}
            />
            <Button type="primary">Set</Button>
          </Space.Compact>

          <Space.Compact style={{ width: '440px' }}>
            <Input
              placeholder="Add Abstract Address"
              onChange={(e) => {
                if (e != null) {
                  setAbstractAddress(e.target.value.trim());
                }
              }}
            />
            <Button
              type="primary"
              onClick={() => {
                setAbstractAddressList((prevAddress) => [...prevAddress, abstractAddress]);
              }}>
              Set
            </Button>
          </Space.Compact>
        </Space>
      </div>

      <div style={listStyle}>
        <div>
          <div>
            <div>AbstractAddressList:</div>
            {abstractAddressList.map((item: string, index) => {
              return <div key={index}>{item}</div>;
            })}
          </div>
        </div>
      </div>

      <div style={contentStyle}>
        <Button type="primary" loading={isLoading} onClick={createSig}>
          Submit
        </Button>
      </div>
    </div>
  );
};

export default View;
