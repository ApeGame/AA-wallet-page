import React, { useEffect } from 'react';
import { Input, Col, Row, Button } from 'antd';
import { automaticMint, getAutomaticMintList } from '@/actions/mint';
import '@/assets/styles/global.scss';
import { Table } from 'antd';
import { automaticMintHistory } from '@/actions/mint';
import type { ColumnsType } from 'antd/es/table';
import { formatterTime } from '@/utils/formatterTime';

const View = () => {
  const [cardNo, setCardNo] = React.useState('');
  const [amount, setAmount] = React.useState<number>(0);
  const [rate, setRate] = React.useState('');
  const [mintRes, setMintRes] = React.useState('');
  const [mintLoad, setMintLoad] = React.useState<boolean>(false);
  const [automaticMintHistoryList, setAutomaticMintHistoryList] = React.useState<automaticMintHistory[]>();

  const HistoryColumns: ColumnsType<automaticMintHistory> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (text) => text / 100,
    },
    {
      title: 'User Bank Account',
      dataIndex: 'userAccount',
      key: 'userAccount',
    },
    {
      title: 'token rate',
      dataIndex: 'token_rate',
      key: 'token_rate',
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
      const listRes = await getAutomaticMintList();
      // console.log('listRes', listRes);
      setAutomaticMintHistoryList(listRes.data);
    }
    loadData();
  }, []);

  const handleMint = async () => {
    console.log('cardNo', cardNo);
    console.log('amount', amount);
    console.log('rate', rate);
    setMintRes('minting');
    const mintRes = await automaticMint({ cardNo: cardNo, amount: amount * 100, tokenRate: parseFloat(rate) });
    if (mintRes.code == -1) {
      setMintRes('mint fail');
      setMintLoad(false);
    } else {
      setMintRes('mint success');
      setMintLoad(false);
    }
  };

  return (
    <div className="content">
      <p className="contentTitle">Automatic Mint AINR</p>
      <div className="contentInner">
        <div style={{ paddingTop: '20px' }}>
          <Row>
            <Col span={6}>
              <div className="subTitle">{'CardNo(银行卡号):'}</div>
            </Col>
            <Col span={18}>
              <Input
                className="inputContent"
                placeholder="bank number"
                onChange={(e) => {
                  if (e != null) {
                    setCardNo(e.target.value);
                  }
                }}
              />
            </Col>
          </Row>
        </div>
        <div style={{ paddingTop: '20px' }}>
          <Row>
            <Col span={6}>
              <div className="subTitle">{'Amount(Mint总额):'}</div>
            </Col>
            <Col span={18}>
              <Input
                className="inputContent"
                placeholder="amount"
                onChange={(e) => {
                  if (e != null) {
                    setAmount(parseInt(e.target.value));
                  }
                }}
              />
            </Col>
          </Row>
        </div>
        <div style={{ paddingTop: '20px' }}>
          <Row>
            <Col span={6}>
              <div className="subTitle">{'Rate:(挂单汇率)'}</div>
            </Col>
            <Col span={18}>
              <Input
                className="inputContent"
                placeholder="rate"
                onChange={(e) => {
                  if (e != null) {
                    setRate(e.target.value);
                  }
                }}
              />
            </Col>
          </Row>
        </div>
        <div style={{ paddingTop: '20px' }}>
          <Row>
            <Col span={6}>
              <Button type="primary" onClick={handleMint} loading={mintLoad}>
                Mint
              </Button>
            </Col>
            <Col span={18}>
              <div className="result">
                <p>mint result: {mintRes}</p>
              </div>
            </Col>
          </Row>
        </div>
      </div>

      <div style={{ paddingTop: '120px' }}>
        <p className="contentTitle">Auto Mint List</p>
        <div className="contentInner">
          <div style={{ paddingTop: '20px' }}>
            <Table
              dataSource={automaticMintHistoryList}
              columns={HistoryColumns}
              rowKey="id"
              pagination={false}
              size="small"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default View;
