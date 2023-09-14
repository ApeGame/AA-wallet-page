import { Input, Button, message } from 'antd';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { UpdateToken } from '@/actions/Token/token';
import { useNavigate } from 'react-router-dom';

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
  const navigateTo = useNavigate();

  const addToken = async () => {
    setIsLoading(true);
    if (tokenAddress.trim().length === 0) {
      messageApi.warning('token address cannot be empty');
    } else {
      const addRes = await UpdateToken(tokenAddress.trim());
      if (addRes.code === 200) {
        messageApi.success('Complete');
        navigateTo('/overview');
        // AccountStore.loadUserData();
      } else {
        messageApi.error(addRes.data);
      }
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
          size="large"
          placeholder="Enter Token Address"
          onChange={(e) => {
            if (e != null) {
              setTokenAddress(e.target.value);
            }
          }}
        />
      </div>

      <Button
        style={{ width: '90%', marginTop: '33rem' }}
        type="primary"
        size="large"
        loading={isLoading}
        onClick={addToken}>
        Add
      </Button>
    </div>
  );
};

export default View;
