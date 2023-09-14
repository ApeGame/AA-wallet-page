import { useState, useEffect } from 'react';
import { Col, Row, Button, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { ImportNft } from './importNft';
import { useNavigate } from 'react-router-dom';
import { AccountStore } from '@/store/account';
import { observer } from 'mobx-react';
import { NftImage } from '@/components/Nft/nftImage';

const listStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  fontSize: '15px',
  color: '#000000',
};

const NftOverview = () => {
  const navigateTo = useNavigate();

  const [isFold, setIsFold] = useState(false);

  const [importFlag, setImportFlag] = useState(false);
  const handleImportClose = () => {
    setImportFlag(false);
  };

  useEffect(() => {
    // console.log('NftOverview', AccountStore.currentAccount);
    // UpdateTokenAttribute();
  }, []);

  return (
    <>
      <ImportNft isOpen={importFlag} onClose={handleImportClose} />
      <div style={{ color: '#000000', marginTop: 35, height: 325 }}>
        {Object.keys(AccountStore.currentAccount.erc721AccountMap).map((key, index) => {
          return (
            <div key={index}>
              <Row>
                <Col span={21} style={{ display: 'flex', alignItems: 'center' }}>
                  <span style={{ fontSize: 15, fontWeight: 'bold', marginLeft: 30 }}>
                    {AccountStore.currentAccount.erc721AccountMap[key].name}
                  </span>
                </Col>
                <Col span={3} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                  <DownOutlined
                    onClick={() => {
                      setIsFold(!isFold);
                    }}
                  />
                </Col>
              </Row>
              {!isFold &&
                Object.keys(AccountStore.currentAccount.erc721AccountMap[key].token_uri).map((keyNft, index) => {
                  return (
                    <div key={index}>
                      <Row style={{ marginTop: 20 }}>
                        <Col span={24} style={{ display: 'flex' }}>
                          <div
                            style={{
                              height: 150,
                              width: 150,
                              marginLeft: 30,
                              cursor: 'pointer',
                              backgroundColor: '#E6F0FA',
                              borderRadius: '15px',
                            }}
                            onClick={() => {
                              // navigateTo('/nftDetail');
                              navigateTo(`/nftDetail?tokenAddress=${key}&tokenId=${keyNft}`);
                            }}>
                            <NftImage
                              tokenUri={AccountStore.currentAccount.erc721AccountMap[key].token_uri[keyNft]}
                              size={140}
                            />
                          </div>
                        </Col>
                      </Row>
                    </div>
                  );
                })}
            </div>
          );
        })}

        {/* <div>
          <Row>
            <Col span={21} style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ fontSize: 15, fontWeight: 'bold', marginLeft: 30 }}>{'MetaApes (1)'}</span>
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
                <div
                  style={{
                    height: 150,
                    width: 150,
                    marginLeft: 30,
                    cursor: 'pointer',
                    backgroundColor: '#E6F0FA',
                    borderRadius: '15px',
                  }}
                  onClick={() => {
                    navigateTo('/nftDetail');
                  }}>
                  <img style={{ height: 140, width: 140 }} src={nftHeroImage} alt="" />
                </div>
              </Col>
            </Row>
          )}
        </div> */}
      </div>
      {/* <div style={listStyle}>
        <Button
          type="link"
          onClick={() => {
            setImportFlag(true);
          }}>
          Import NFT
        </Button>
      </div> */}
      <div style={listStyle}>
        <Space>
          <span style={{ fontSize: 15 }}>Don't see your NFT?</span>
          <Button
            type="link"
            onClick={() => {
              setImportFlag(true);
            }}>
            Import NFT
          </Button>
        </Space>
      </div>
    </>
  );
};

export default observer(NftOverview);
