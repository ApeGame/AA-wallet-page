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

  getAbstractAccount(): AccountInfo {
    if (this.accountList) {
      this.accountList.map((item) => {
        if (!item.isMultisig) {
          return item;
        }
      });
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
}

export const AccountStore = new Account();
