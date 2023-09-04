import { useEffect, useState } from 'react';
import { GetNftAttribute } from '@/actions/Token/token';
import { Col, Row, Space } from 'antd';

export const NftAttribute = ({ tokenUri }: { tokenUri: string }) => {
  const [attribute, setAttribute] = useState({} as any);

  const getAttribute = async () => {
    const res = await GetNftAttribute(tokenUri);
    console.log('getImageUrl', JSON.parse(res));
    if (res) {
      setAttribute(JSON.parse(res));
    }
  };

  useEffect(() => {
    getAttribute();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {attribute && (
        <>
          <Space direction="vertical" size="small" style={{ display: 'flex' }}>
            {Object.keys(attribute).map((key, index) => {
              // console.log('key', key, 'type', typeof attribute[key]);
              if (key !== 'image' && typeof attribute[key] !== 'object' && attribute[key]) {
                return (
                  <Row key={index}>
                    <Col span={6} style={{ display: 'flex', alignItems: 'center' }}>
                      <span style={{ fontWeight: 'bold' }}>{key}</span>
                    </Col>
                    <Col span={18} style={{ display: 'flex', flexDirection: 'row-reverse', alignItems: 'center' }}>
                      {attribute[key]}
                    </Col>
                  </Row>
                );
              }
            })}
          </Space>
        </>
      )}
    </>
  );
};
