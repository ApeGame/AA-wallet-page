import { makeAutoObservable } from 'mobx';
import { AccountInfo } from '@/model/account';
import { NetworkInfo } from '@/model/network';
import { getCurrentNetwork, setCurrentNetworkName } from '@/utils/localStorage';

class Account {
  accountList: AccountInfo[] = [];

  currentAccount: AccountInfo = {} as AccountInfo;

  currentNetwork: NetworkInfo = {} as NetworkInfo;

  networkList: NetworkInfo[] = [
    { name: 'Coq Testnet', symbol: 'COQ' },
    { name: 'Base Testnet', symbol: 'ETH' },
    { name: 'Linea Testnet', symbol: 'ETH' },
  ];

  constructor() {
    makeAutoObservable(this);
  }

  pushAccount(account: AccountInfo) {
    this.accountList.push(account);
  }

  setCurrentAccount(account: AccountInfo) {
    this.currentAccount = account;
  }

  getCurrentAccount(): AccountInfo {
    return this.currentAccount;
  }

  clearAccountList() {
    this.accountList.length = 0;
  }

  clearCurrentAccount() {
    this.currentAccount = {} as AccountInfo;
  }

  getAccountByAddress(address: string): AccountInfo {
    if (this.accountList) {
      for (let i = 0; i < this.accountList.length; i++) {
        if (this.accountList[i].address === address) {
          return this.accountList[i];
        }
      }
    } else {
      return {} as AccountInfo;
    }
    return {} as AccountInfo;
  }

  getAbstractAccount(): AccountInfo {
    if (this.accountList) {
      for (let i = 0; i < this.accountList.length; i++) {
        if (this.accountList[i].isMultisig) {
          return this.accountList[i];
        }
      }
    } else {
      return {} as AccountInfo;
    }
    return {} as AccountInfo;
  }

  updateAccountNameFlagByAddress(address: string, flag: boolean) {
    if (this.accountList) {
      this.accountList.map((item) => {
        if (item.address === address) {
          item.isUpdate = flag;
        }
      });
    }
  }

  updateAccountNameByAddress(address: string, name: string) {
    if (this.accountList) {
      this.accountList.map((item) => {
        if (item.address === address) {
          item.name = name;
        }
      });
    }
  }

  pushNetwork(network: NetworkInfo) {
    this.networkList.push(network);
  }

  setCurrentNetwork(network: NetworkInfo) {
    this.currentNetwork = network;
  }

  getCurrentNetworkWithStorage(): NetworkInfo {
    if (getCurrentNetwork()) {
      if (this.getNetworkByName(getCurrentNetwork()).name) {
        return {
          name: this.getNetworkByName(getCurrentNetwork()).name,
          symbol: this.getNetworkByName(getCurrentNetwork()).symbol,
        };
      } else {
        setCurrentNetworkName('Coq Testnet');
        return { name: 'Coq Testnet', symbol: 'COQ' };
      }
    } else {
      setCurrentNetworkName('Coq Testnet');
      return { name: 'Coq Testnet', symbol: 'COQ' };
    }
  }

  getCurrentNetworkSymbol(): string {
    return this.getCurrentNetworkWithStorage().symbol;
  }

  clearNetworkList() {
    this.networkList.length = 0;
  }

  clearCurrentNetwork() {
    this.currentNetwork = {} as NetworkInfo;
  }

  getNetworkByName(name: string): NetworkInfo {
    if (this.networkList) {
      for (let i = 0; i < this.networkList.length; i++) {
        if (this.networkList[i].name === name) {
          return this.networkList[i];
        }
      }
    } else {
      return {} as NetworkInfo;
    }
    return {} as NetworkInfo;
  }
}

export const AccountStore = new Account();
