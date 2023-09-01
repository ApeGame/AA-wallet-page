import { useState } from 'react';
import { Col, Row, Button } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { ImportNft } from './importNft';

import nftImage from '@/assets/img/nft/ApeChain.png';
import nftHeroImage from '@/assets/img/nft/IconHeroDenver.png';

const listStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  fontSize: '15px',
};

const NftOverview = () => {
  const [isFold, setIsFold] = useState(false);

  const [importFlag, setImportFlag] = useState(false);
  const handleImportClose = () => {
    setImportFlag(false);
  };

  return (
    <>
      <ImportNft isOpen={importFlag} onClose={handleImportClose} />
      <div style={{ color: '#000000', marginTop: 35, height: 325 }}>
        <Row>
          <Col span={5} style={{ display: 'flex', alignItems: 'center' }}>
            <img style={{ height: 38, width: 38, marginLeft: 30 }} src={nftImage} alt="" />
          </Col>
          <Col span={16} style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ fontSize: 15, fontWeight: 'bold' }}>{'MetaApes (1)'}</span>
          </Col>
          <Col span={3} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
            <DownOutlined
              onClick={() => {
                setIsFold(!isFold);
              }}
            />
          </Col>
        </Row>
        {!isFold && (
          <Row style={{ marginTop: 20 }}>
            <Col span={24} style={{ display: 'flex' }}>
              <img style={{ height: 140, width: 140, marginLeft: 30, cursor: 'pointer' }} src={nftHeroImage} alt="" />
            </Col>
          </Row>
        )}
      </div>
      <div style={listStyle}>
        <Button
          type="link"
          onClick={() => {
            setImportFlag(true);
          }}>
          Import NFT
        </Button>
      </div>
    </>
  );
};

export default NftOverview;
