import { observer } from 'mobx-react';
import '@/assets/styles/accountStyle/style.scss';
import './useSendOperationStyle.css'
import { useEffect } from 'react';

const View = () => {

  const receiveMessageFormIndex = (params) => {
    console.log('-----params------', params.data)
    
  }
  useEffect(() => {
    window.addEventListener("message", receiveMessageFormIndex, false);
    return () => {
      window.removeEventListener("message", receiveMessageFormIndex, false);
    }
    // eslint-disable-next-line
  }, [])

  return (
    <div className='sdkRoot'>
      <p>123</p>
    </div>
  );
};

export default observer(View);
