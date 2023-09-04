import { useState, useEffect } from 'react';
import { Col, Row, Button, Space, Divider } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import { AccountStore } from '@/store/account';
import { observer } from 'mobx-react';
import { useNavigate } from 'react-router-dom';
import { CopyToClipLong } from '@/components/CopyToClip/CopyToClip';
import { NftSkill } from '@/components/Nft/nftAttributeSkill';
import { useSearchParams } from 'react-router-dom';
import { NftImage } from '@/components/Nft/nftImage';
import { NftAttribute } from '@/components/Nft/nftAttribute';

const NftDetail = () => {
  const navigateTo = useNavigate();
  const [search] = useSearchParams();

  const [skillOpenFlag, setSkillOpenFlag] = useState(false);
  const handleSkillClose = () => {
    setSkillOpenFlag(false);
  };

  useEffect(() => {
    // load
    // loadData();
    AccountStore.loadUserData();
  }, []);

  return (
    <>
      <NftSkill isOpen={skillOpenFlag} onClose={handleSkillClose} />
      <div style={{ color: '#000000', marginTop: 35 }}>
        <div style={{ display: 'flex', margin: 30 }}>
          <Space>
            <span>
              <LeftOutlined
                onClick={() => {
                  navigateTo('/overview');
                }}
              />
            </span>
            <span style={{ fontSize: 15, fontWeight: 'bold' }}>
              {AccountStore.currentAccount.isMultisig ? AccountStore.currentAccount.name : 'Account'}
            </span>
            <span>/</span>
            <span style={{ fontSize: 15, fontWeight: 'bold' }}>{AccountStore.getCurrentNetworkWithStorage().name}</span>
            <span>,</span>
            <span style={{ fontSize: 15, fontWeight: 'bold' }}>
              {AccountStore.currentAccount.erc721AccountMap &&
                AccountStore.currentAccount.erc721AccountMap[search.get('tokenAddress') || ''].name}
            </span>
          </Space>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              cursor: 'pointer',
              backgroundColor: '#E6F0FA',
              borderRadius: '15px',
              height: 360,
              width: 360,
            }}>
            {AccountStore.currentAccount.erc721AccountMap && (
              <NftImage
                tokenUri={
                  AccountStore.currentAccount.erc721AccountMap[search.get('tokenAddress') || ''].token_uri[
                    search.get('tokenId') || ''
                  ]
                }
                size={280}
              />
            )}
            {/* <img style={{ height: 280, width: 280 }} src={nftHeroImage} alt="" /> */}
          </div>
        </div>

        <div style={{ display: 'flex', marginLeft: 30, marginTop: 30 }}>
          {AccountStore.currentAccount.erc721AccountMap && (
            <span style={{ fontSize: 15, fontWeight: 'bold' }}>
              {AccountStore.getCurrentNetworkWithStorage().name +
                ' , ' +
                AccountStore.currentAccount.erc721AccountMap[search.get('tokenAddress') || ''].name +
                ' ' +
                search.get('tokenId')}
            </span>
          )}
        </div>

        <div style={{ display: 'flex', marginLeft: 30, marginTop: 30, color: '#808080' }}>
          <span style={{ fontSize: 15, fontWeight: 'bold' }}>#{search.get('tokenId')}</span>
        </div>

        <div style={{ display: 'flex', marginLeft: 30, marginTop: 30 }}>
          <span style={{ fontSize: 15, fontWeight: 'bold' }}>Attribute</span>
        </div>

        <div style={{ padding: 30 }}>
          {AccountStore.currentAccount.erc721AccountMap && (
            <NftAttribute
              tokenUri={
                AccountStore.currentAccount.erc721AccountMap[search.get('tokenAddress') || ''].token_uri[
                  search.get('tokenId') || ''
                ]
              }
            />
          )}
        </div>

        {/* <div style={{ display: 'flex', marginLeft: 30, marginTop: 30 }}>
          <span style={{ fontSize: 15, fontWeight: 'bold' }}>Describe</span>
        </div>

        <div style={{ display: 'flex', paddingLeft: 30, paddingRight: 30, marginTop: 10 }}>
          <span style={{ fontSize: 15, textAlign: 'left', lineHeight: '150%' }}>
            {
              'Meta Apes is a free-to-play and win-to-earn MMO strategy game designed for mobile. It is set in a post-apocalyptic world, in which humanity has ended and a new era ruled by Apes has begun. Next on the agenda is space domination. Each player will have to work closely with his or her Gang to become the strongest Clan and win the ultimate race to space. '
            }
          </span>
        </div> */}

        {/* <div style={{ padding: 30 }}>
          <span style={{ fontSize: 15, fontWeight: 'bold', display: 'flex' }}>NFT attribute</span>
          <Space direction="vertical" size="small" style={{ display: 'flex', marginTop: 10 }}>
            <Row>
              <Col span={6} style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{ fontWeight: 'bold' }}>Level</span>
              </Col>
              <Col span={18} style={{ display: 'flex', flexDirection: 'row-reverse', alignItems: 'center' }}>
                1
              </Col>
            </Row>
            <Row>
              <Col span={6} style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{ fontWeight: 'bold' }}>Description</span>
              </Col>
              <Col span={18} style={{ display: 'flex', flexDirection: 'row-reverse', alignItems: 'center' }}>
                The Mad Rider
              </Col>
            </Row>
            <Row>
              <Col span={6} style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{ fontWeight: 'bold' }}>Name</span>
              </Col>
              <Col span={18} style={{ display: 'flex', flexDirection: 'row-reverse', alignItems: 'center' }}>
                Oscar
              </Col>
            </Row>
            <Row>
              <Col span={6} style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{ fontWeight: 'bold' }}>Quality</span>
              </Col>
              <Col span={18} style={{ display: 'flex', flexDirection: 'row-reverse', alignItems: 'center' }}>
                Rare
              </Col>
            </Row>
            <Row>
              <Col span={6} style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{ fontWeight: 'bold' }}>Age</span>
              </Col>
              <Col span={18} style={{ display: 'flex', flexDirection: 'row-reverse', alignItems: 'center' }}>
                Senior
              </Col>
            </Row>
          </Space>
        </div> */}

        {/* <div style={{ paddingLeft: 30, paddingRight: 30 }}>
          <span style={{ fontSize: 15, fontWeight: 'bold', display: 'flex' }}>NFT properties skills</span>
          <Space direction="vertical" size="middle" style={{ display: 'flex', marginTop: 15 }}>
            <Row style={{ cursor: 'pointer' }} onClick={() => setSkillOpenFlag(true)}>
              <Col span={12} style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{ fontWeight: 'bold' }}>Dragon's Breath</span>
              </Col>
              <Col span={6} style={{ display: 'flex', alignItems: 'center' }}>
                <span>19242011</span>
              </Col>
              <Col span={6} style={{ display: 'flex', flexDirection: 'row-reverse', alignItems: 'center' }}>
                <img style={{ height: 30, width: 30 }} src={skill1} alt="" />
              </Col>
            </Row>
            <Row style={{ cursor: 'pointer' }} onClick={() => setSkillOpenFlag(true)}>
              <Col span={12} style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{ fontWeight: 'bold' }}>Great Ape Strength</span>
              </Col>
              <Col span={6} style={{ display: 'flex', alignItems: 'center' }}>
                <span>19242131</span>
              </Col>
              <Col span={6} style={{ display: 'flex', flexDirection: 'row-reverse', alignItems: 'center' }}>
                <img style={{ height: 30, width: 30 }} src={skill2} alt="" />
              </Col>
            </Row>
            <Row style={{ cursor: 'pointer' }} onClick={() => setSkillOpenFlag(true)}>
              <Col span={12} style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{ fontWeight: 'bold' }}>Fire the Cannons!</span>
              </Col>
              <Col span={6} style={{ display: 'flex', alignItems: 'center' }}>
                <span>19240141</span>
              </Col>
              <Col span={6} style={{ display: 'flex', flexDirection: 'row-reverse', alignItems: 'center' }}>
                <img style={{ height: 30, width: 30 }} src={skill3} alt="" />
              </Col>
            </Row>
            <Row style={{ cursor: 'pointer' }} onClick={() => setSkillOpenFlag(true)}>
              <Col span={12} style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{ fontWeight: 'bold' }}>Recalibrated Arms</span>
              </Col>
              <Col span={6} style={{ display: 'flex', alignItems: 'center' }}>
                <span>19242321</span>
              </Col>
              <Col span={6} style={{ display: 'flex', flexDirection: 'row-reverse', alignItems: 'center' }}>
                <img style={{ height: 30, width: 30 }} src={skill4} alt="" />
              </Col>
            </Row>
            <Row style={{ cursor: 'pointer' }} onClick={() => setSkillOpenFlag(true)}>
              <Col span={12} style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{ fontWeight: 'bold' }}>Hot-Tempered Monkey</span>
              </Col>
              <Col span={6} style={{ display: 'flex', alignItems: 'center' }}>
                <span>19240631</span>
              </Col>
              <Col span={6} style={{ display: 'flex', flexDirection: 'row-reverse', alignItems: 'center' }}>
                <img style={{ height: 30, width: 30 }} src={skill5} alt="" />
              </Col>
            </Row>
          </Space>
        </div> */}

        <Divider />

        <div style={{ padding: 15, display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
          <Row>
            <Col span={12} style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ fontWeight: 'bold' }}>Contract Address</span>
            </Col>
            <Col span={12} style={{ display: 'flex', flexDirection: 'row-reverse', alignItems: 'center' }}>
              <CopyToClipLong address={'0x866df3e1b203cc3bf50eb4f707d29ce5b665d4d1'} />
            </Col>
          </Row>

          <Button
            style={{ marginTop: 30 }}
            size="large"
            type="primary"
            onClick={() => {
              navigateTo('/sendNFT');
            }}>
            Send
          </Button>
        </div>

        <div style={{ height: 70 }}></div>
      </div>
    </>
  );
};

export default observer(NftDetail);
