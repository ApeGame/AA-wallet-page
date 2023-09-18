import { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { Col, Row, Button } from 'antd';
import { SyncOutlined } from '@ant-design/icons';
import { ActivityStore } from '@/store/activity';
import { Activity, SignatureActivity } from './activity';

import '@/assets/styles/accountStyle/style.scss';

const Comp = () => {
  const [activityType, setActivityType] = useState('all');

  useEffect(() => {
    // load
    console.log('load user operation');
    // loadData();
    ActivityStore.loadActivityData();
  }, [activityType]);

  return (
    <>
      <div>
        <Row
          style={{
            display: 'flex',
            alignItems: 'center',
            paddingLeft: 15,
            paddingRight: 25,
            backgroundColor: '#FFFFFF',
            height: 45,
          }}>
          <Col span={7} style={{ display: 'flex' }}>
            <Button
              type={activityType === 'all' ? 'link' : 'text'}
              onClick={() => {
                setActivityType('all');
              }}>
              All Activity
            </Button>
          </Col>
          <Col span={7} style={{ display: 'flex' }}>
            <Button
              type={activityType === 'signature' ? 'link' : 'text'}
              onClick={() => {
                setActivityType('signature');
              }}>
              Signature Activity
            </Button>
          </Col>
          <Col span={10} style={{ display: 'flex', alignItems: 'center', flexDirection: 'row-reverse' }}>
            <SyncOutlined
              style={{ fontSize: 18, color: '#356DF3' }}
              onClick={() => {
                ActivityStore.loadActivityData();
              }}
            />
          </Col>
        </Row>
        <div style={{ height: 365, overflowY: 'auto', color: '#000000' }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {activityType === 'all' && ActivityStore.allActivity.length === 0 && <></>}
            {activityType === 'all' &&
              ActivityStore.allActivity &&
              ActivityStore.allActivity.map((row, index) => <Activity activityRecord={row} key={index} />)}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {activityType === 'signature' && ActivityStore.needActivity.length === 0 && <span>No signature date</span>}
            {activityType === 'signature' &&
              ActivityStore.needActivity &&
              ActivityStore.needActivity.map((row, index) => (
                <SignatureActivity
                  key={index}
                  activityRecord={row}
                  loadData={ActivityStore.loadActivityData}
                  setActivityType={setActivityType}
                />
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default observer(Comp);
