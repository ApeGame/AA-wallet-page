import { useState, useEffect } from 'react';
import { Col, Row, Button, Space, Divider, Dropdown, message } from 'antd';
import { LeftOutlined, EllipsisOutlined } from '@ant-design/icons';
import { AccountStore } from '@/store/account';
import { observer } from 'mobx-react';
import { useNavigate } from 'react-router-dom';
import { CopyToClipLong } from '@/components/CopyToClip/CopyToClip';
import { NftSkill } from '@/components/Nft/nftAttributeSkill';
import { useSearchParams } from 'react-router-dom';
import { NftImage } from '@/components/Nft/nftImage';
import { NftAttribute } from '@/components/Nft/nftAttribute';
import type { MenuProps } from 'antd';
import { DeleteNfts } from '@/actions/Token/token';
import { getCurrentNetworkWithStorage } from '@/components/Account/hooks/chainConfig';

const NftDetail = () => {
  const navigateTo = useNavigate();
  const [search] = useSearchParams();
  const [messageApi, contextHolder] = message.useMessage();

  const [skillOpenFlag, setSkillOpenFlag] = useState(false);
  const handleSkillClose = () => {
    setSkillOpenFlag(false);
  };

  useEffect(() => {
    // load
    // loadData();
    AccountStore.loadUserData();
  }, []);

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <Space
          onClick={async () => {
            const res = await DeleteNfts(
              AccountStore.currentAccount.address,
              search.get('tokenAddress') || '',
              parseInt(search.get('tokenId') || '')
            );
            if (res.code === 200) {
              setTimeout(() => navigateTo('/overview'), 700);
              messageApi.success('Complete');
            } else {
              messageApi.error(res.data);
            }
          }}>
          <span>Hide</span>
        </Space>
      ),
    },
  ];

  return (
    <>
      {contextHolder}
      <NftSkill isOpen={skillOpenFlag} onClose={handleSkillClose} />
      {AccountStore.currentAccount.erc721AccountMap[search.get('tokenAddress') || ''] && (
        <div style={{ color: '#000000', marginTop: 35 }}>
          <div style={{ display: 'flex', marginLeft: 20, paddingBottom: 20 }}>
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
              <span style={{ fontSize: 15, fontWeight: 'bold' }}>{getCurrentNetworkWithStorage().name}</span>
              <span>,</span>
              <span style={{ fontSize: 15, fontWeight: 'bold' }}>
                {AccountStore.currentAccount.erc721AccountMap &&
                  AccountStore.currentAccount.erc721AccountMap[search.get('tokenAddress') || ''] &&
                  AccountStore.currentAccount.erc721AccountMap[search.get('tokenAddress') || ''].name}
              </span>
              <span>
                <Dropdown menu={{ items }}>
                  <EllipsisOutlined />
                </Dropdown>
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
              {AccountStore.currentAccount.erc721AccountMap &&
                AccountStore.currentAccount.erc721AccountMap[search.get('tokenAddress') || ''] && (
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
                {getCurrentNetworkWithStorage().name +
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

          <Divider />

          <div style={{ padding: 15, display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
            <Row>
              <Col span={12} style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{ fontWeight: 'bold' }}>Contract Address</span>
              </Col>
              <Col span={12} style={{ display: 'flex', flexDirection: 'row-reverse', alignItems: 'center' }}>
                <CopyToClipLong address={search.get('tokenAddress') || ''} />
              </Col>
            </Row>

            <Button
              style={{ marginTop: 30 }}
              size="large"
              type="primary"
              onClick={() => {
                navigateTo(`/sendNFT?tokenAddress=${search.get('tokenAddress')}&tokenId=${search.get('tokenId')}`);
              }}>
              Send
            </Button>
          </div>

          <div style={{ height: 70 }}></div>
        </div>
      )}
    </>
  );
};

export default observer(NftDetail);
