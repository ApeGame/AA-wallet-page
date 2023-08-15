import React, { useEffect } from 'react';
import { Input, Col, Row, Button } from 'antd';
import { bindGenerateBankAccount, generateBankAccount } from '@/actions/generateBankAccount';
import { BankWithDraws, getBankWithDrawsList } from '@/actions/withdraw';
import type { ColumnsType } from 'antd/es/table';
import { Table } from 'antd';
import { formatterTime } from '@/utils/formatterTime';

import '@/assets/styles/global.scss';

const View = () => {
  const [bankName, setBankName] = React.useState('');
  const [bankMobile, setBankMobile] = React.useState('');
  const [bankEmail, setBankEmail] = React.useState('');
  const [res, setRes] = React.useState('');
  const [load, setLoad] = React.useState<boolean>(false);
  const [bankWithDrawsList, setBankWithDrawsList] = React.useState<BankWithDraws[]>();

  const BankColumns: ColumnsType<BankWithDraws> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Account',
      dataIndex: 'account',
      key: 'account',
    },
    {
      title: 'Balance',
      dataIndex: 'balance',
      key: 'balance',
      render: (text) => text / 10000,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'CreatedAt',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: formatterTime,
    },
  ];

  useEffect(() => {
    async function loadData() {
      const bankWithDrawsRes = await getBankWithDrawsList();
      if (bankWithDrawsRes.code !== -1) {
        setBankWithDrawsList(bankWithDrawsRes.data);
      }
    }
    loadData();
  }, [res]);

  const handleGenerate = async () => {
    setLoad(true);
    const generateRes = await generateBankAccount({ name: bankName, mobile: bankMobile, email: bankEmail });
    if (generateRes.code !== -1) {
      setRes(generateRes.data.bankNO);
      // bind
      const bindRes = await bindGenerateBankAccount({ name: bankName, bank_number: generateRes.data.bankNO });
      if (bindRes.code === 200) {
        setLoad(false);
        setRes('bank number:' + generateRes.data.bankNO + ' bind address:' + bindRes.data.crypto_address);
      } else {
        setLoad(false);
        setRes('bank bind address fail');
      }
    } else {
      setLoad(false);
      setRes('generate fail');
    }
  };

  return (
    <div className="content">
      <p className="contentTitle">Generate Mock Bank Account</p>
      <div className="contentInner">
        <div style={{ paddingTop: '20px' }}>
          <Row>
            <Col span={6}>
              <div className="subTitle">{'Name(银行用户名):'}</div>
            </Col>
            <Col span={18}>
              <Input
                className="inputContent"
                placeholder="bank account name"
                onChange={(e) => {
                  if (e != null) {
                    setBankName(e.target.value);
                  }
                }}
              />
            </Col>
          </Row>
        </div>
        <div style={{ paddingTop: '20px' }}>
          <Row>
            <Col span={6}>
              <div className="subTitle">{'Mobile(银行用户电话号码):'}</div>
            </Col>
            <Col span={18}>
              <Input
                className="inputContent"
                placeholder="Mobile"
                onChange={(e) => {
                  if (e != null) {
                    setBankMobile(e.target.value);
                  }
                }}
              />
            </Col>
          </Row>
        </div>
        <div style={{ paddingTop: '20px' }}>
          <Row>
            <Col span={6}>
              <div className="subTitle">{'Email(银行用户邮箱地址):'}</div>
            </Col>
            <Col span={18}>
              <Input
                className="inputContent"
                placeholder="Email"
                onChange={(e) => {
                  if (e != null) {
                    setBankEmail(e.target.value);
                  }
                }}
              />
            </Col>
          </Row>
        </div>
        <div style={{ paddingTop: '20px' }}>
          <Row>
            <Col span={6}>
              <Button type="primary" onClick={handleGenerate} loading={load}>
                Generate
              </Button>
            </Col>
            <Col span={18}>
              <div className="result">
                <p>generate result: {res}</p>
              </div>
            </Col>
          </Row>
        </div>
      </div>

      <div style={{ paddingTop: '120px' }}>
        <p className="contentTitle">Bank Account List</p>
        <div className="contentInner">
          <div style={{ paddingTop: '20px' }}>
            <Table dataSource={bankWithDrawsList} columns={BankColumns} rowKey="id" pagination={false} size="small" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default View;
