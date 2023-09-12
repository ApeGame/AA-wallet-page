import { useEffect, useState } from 'react';
import { GetNftAttribute } from '@/actions/Token/token';

export const NftImage = ({ tokenUri, size }: { tokenUri: string; size: number }) => {
  const [imageUri, setImageUri] = useState('');

  const getImageUrl = async () => {
    const res = await GetNftAttribute(tokenUri);
    console.log('getImageUrl', JSON.parse(res).image);
    if (res) {
      setImageUri(JSON.parse(res).image);
    }
  };

  useEffect(() => {
    getImageUrl();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {imageUri && (
        <>
          <img style={{ height: size, width: size }} src={imageUri} alt="" />
        </>
      )}
    </>
  );
};
