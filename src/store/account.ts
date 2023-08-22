import { makeAutoObservable } from 'mobx';
import { AccountInfo } from '@/model/account';

class Account {
  accountList: AccountInfo[] = [];

  currentAccount: AccountInfo = {} as AccountInfo;

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
      this.accountList.map((item) => {
        if (item.address === address) {
          return item;
        }
      });
    }
    return {} as AccountInfo;
  }
}

export const AccountStore = new Account();
