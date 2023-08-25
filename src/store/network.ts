import { makeAutoObservable } from 'mobx';
import { NetworkInfo } from '@/model/network';

class NetworkStore {
  networkList: NetworkInfo[] = [];

  constructor() {
    makeAutoObservable(this);
  }
}

export const sendType = new NetworkStore();
