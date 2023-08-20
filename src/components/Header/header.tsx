/* eslint-disable react-refresh/only-export-components */
import React, { useEffect, useState } from 'react';
import { Col, Row, Dropdown, Space } from 'antd';
import { LogoutOutlined, BlockOutlined, HomeOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { setSendTransactionType, getSendTransactionType } from '@/utils/localStorage';
import { DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { sendType } from '@/store/send';
import { observer } from 'mobx-react';

const headerStyle: React.CSSProperties = {
  color: '#000000',
  height: 65,
  backgroundColor: '#FFFFFF',
};

const titleStyle: React.CSSProperties = {
  textAlign: 'center',
  fontSize: '16px',
  fontWeight: 'bold',
};

const networkStyle: React.CSSProperties = {
  textAlign: 'center',
  fontSize: '0.1px',
  fontWeight: 'bold',
};

const moreStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'row-reverse',
  cursor: 'pointer',
};

const ContentHeader = () => {
  const navigateTo = useNavigate();

  const [sendTxType, setSendTxType] = useState(sendType.sendType);

  useEffect(() => {
    if (getSendTransactionType() === '0') {
      setSendTxType('General Transaction');
    } else {
      setSendTxType('Multisig Transaction');
    }
  }, []);

  const onClick: MenuProps['onClick'] = ({ key }) => {
    //  message.info(`Click on item ${key}`);
    setSendTransactionType(key);
    if (key === '0') {
      setSendTxType('General Transaction');
      sendType.general();
    } else {
      setSendTxType('Multisig Transaction');
      sendType.multisig();
    }
  };

  const items: MenuProps['items'] = [
    {
      label: 'General Transaction',
      key: '0',
    },
    {
      label: 'Multisig Transaction',
      key: '1',
    },
  ];

  const loginOut = () => {
    localStorage.clear();
    navigateTo('/login');
  };

  return (
    <div style={headerStyle}>
      <Row>
        <Col span={2} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <p style={networkStyle}>BAS</p>
        </Col>
        <Col span={14} style={titleStyle}>
          <Dropdown
            menu={{ items, onClick }}
            trigger={['click']}
            placement="bottomLeft"
            arrow={{ pointAtCenter: true }}>
            <Space>
              <span>{sendTxType}</span>
              <DownOutlined />
            </Space>
          </Dropdown>
        </Col>

        <Col span={2} style={moreStyle}>
          <HomeOutlined
            onClick={() => {
              navigateTo('/overview');
            }}
          />
        </Col>
        <Col span={2} style={moreStyle}>
          <BlockOutlined
            onClick={() => {
              navigateTo('/multisigWallet');
            }}
          />
        </Col>
        <Col span={2} style={moreStyle}>
          <LogoutOutlined onClick={loginOut} />
        </Col>
      </Row>
    </div>
  );
};

export default observer(ContentHeader);
