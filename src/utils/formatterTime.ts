import moment from 'moment';

export const formatterTime = (val: string) => {
  return val ? moment(val).format('YYYY-MM-DD HH:mm:ss') : '';
};

export const formatterTimeStampTime = (val: number) => {
  return moment(val * 1000).format('YYYY-MM-DD HH:mm:ss');
};
