import { Input, Button, message } from 'antd';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { UpdateToken } from '@/actions/Token/token';

const contentStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '60px',
  width: '100%',
  color: '#000000',
  marginTop: '20px',
  paddingLeft: 15,
  paddingRight: 15,
};

const View = () => {
  const [tokenAddress, setTokenAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const addToken = async () => {
    setIsLoading(true);
    const addRes = await UpdateToken(tokenAddress.trim());
    if (addRes.code === 200) {
      messageApi.success('Complete');
    } else {
      messageApi.error('Fail');
    }
    setIsLoading(false);
  };

  return (
    <div>
      {contextHolder}
      <div style={contentStyle}>
        <span style={{ fontSize: 18 }}>Add Token</span>
        <Link to="/overview" style={{ marginLeft: '230px', fontSize: 18 }}>
          Back
        </Link>
      </div>
      <div style={contentStyle}>
        <Input
          placeholder="Enter Token Address"
          onChange={(e) => {
            if (e != null) {
              setTokenAddress(e.target.value);
            }
          }}
        />
      </div>

      <div style={contentStyle}>
        <Button type="primary" size="large" loading={isLoading} onClick={addToken}>
          Add
        </Button>
      </div>
    </div>
  );
};

export default View;
