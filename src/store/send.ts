import { makeAutoObservable } from 'mobx';

class SendType {
  sendType = '0';

  constructor() {
    makeAutoObservable(this);
  }

  general() {
    this.sendType = '0';
  }

  multisig() {
    this.sendType = '1';
  }
}

export const sendType = new SendType();
