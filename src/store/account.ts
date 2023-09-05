import { makeAutoObservable, runInAction } from 'mobx';
import { AccountInfo } from '@/model/account';
import { NetworkInfo } from '@/model/network';
import { GetAccountAsset, GetAccountNftAsset } from '@/actions/Token/token';
import { getCurrentAddress } from '@/utils/localStorage';
import { GetUser } from '@/actions/User/user';
import { setUserRecoverEmail } from '@/utils/localStorage';
import { ActivityStore } from './activity';
import { NftAsset } from '@/model/token';

class Account {
  accountList: AccountInfo[] = [];

  currentAccount: AccountInfo = {} as AccountInfo;

  currentNetwork: NetworkInfo = {} as NetworkInfo;

  state = 'pending'; // "pending", "done" or "error"

  constructor() {
    makeAutoObservable(this);
  }

  async loadUserData() {
    // console.log('loadUserData!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');

    // this.accountList = [];
    this.state = 'pending';

    try {
      const nftAssetRes = await GetAccountNftAsset();
      const assetRes = await GetAccountAsset();
      const userRes = await GetUser();

      runInAction(async () => {
        this.accountList.length = 0;

        const nftMap = new Map<string, Map<string, NftAsset>>();

        if (nftAssetRes.code === 200) {
          nftMap.set(nftAssetRes.data.abstract_account.Address, nftAssetRes.data.abstract_account.Erc721S);

          Object.keys(nftAssetRes.data.multiple_abstract_account).map((key) => {
            nftMap.set(
              nftAssetRes.data.multiple_abstract_account[key].Address,
              nftAssetRes.data.multiple_abstract_account[key].Erc721S
            );
          });
        }

        console.log('nftMap!!!', nftMap);

        if (assetRes.code === 200 && nftAssetRes.code === 200) {
          this.pushAccount({
            address: assetRes.data.abstract_account.Address,
            erc20AccountMap: assetRes.data.abstract_account.Erc20,
            nativeBalance: assetRes.data.abstract_account.Native,
            isMultisig: false,
            isUpdate: false,
            name: assetRes.data.abstract_account.Name,
            erc721AccountMap: nftMap.get(assetRes.data.abstract_account.Address) || new Map<string, NftAsset>(),
          });
        }
        if (assetRes.data.multiple_abstract_account) {
          assetRes.data.multiple_abstract_account.map((item) => {
            this.pushAccount({
              address: item.Address,
              erc20AccountMap: item.Erc20,
              nativeBalance: item.Native,
              isMultisig: true,
              isUpdate: false,
              name: item.Name,
              erc721AccountMap: nftMap.get(item.Address) || new Map<string, NftAsset>(),
            });
          });
        }
        console.log('getCurrentAddress()', getCurrentAddress());
        if (getCurrentAddress()) {
          const currentWalletAddress = this.getAccountByAddress(getCurrentAddress());
          if (currentWalletAddress.address) {
            AccountStore.setCurrentAccount(currentWalletAddress);
          } else {
            this.setCurrentAccount({
              address: assetRes.data.abstract_account.Address,
              erc20AccountMap: assetRes.data.abstract_account.Erc20,
              nativeBalance: assetRes.data.abstract_account.Native,
              isMultisig: false,
              isUpdate: false,
              name: assetRes.data.abstract_account.Name,
              erc721AccountMap: nftMap.get(assetRes.data.abstract_account.Address) || new Map<string, NftAsset>(),
            });
          }
        } else {
          this.setCurrentAccount({
            address: assetRes.data.abstract_account.Address,
            erc20AccountMap: assetRes.data.abstract_account.Erc20,
            nativeBalance: assetRes.data.abstract_account.Native,
            isMultisig: false,
            isUpdate: false,
            name: assetRes.data.abstract_account.Name,
            erc721AccountMap: nftMap.get(assetRes.data.abstract_account.Address) || new Map<string, NftAsset>(),
          });
        }

        if (userRes.code === 200) {
          if (userRes.data.recover_email) {
            setUserRecoverEmail(userRes.data.recover_email);
          }
        }

        ActivityStore.loadActivityData();

        this.state = 'done';
      });
    } catch (e) {
      runInAction(() => {
        this.state = 'error';
      });
    }
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

  // setCurrentNetwork(network: NetworkInfo) {
  //   this.currentNetwork = network;
  // }
}

export const AccountStore = new Account();
