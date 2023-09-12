import { makeAutoObservable, runInAction } from 'mobx';
import { ActivityRecord } from '@/model/multisig';
import { GetMultisigHistoryList, GetNeedSignatureList } from '@/actions/MultisigWallet/multisigWallet';

class Activity {
  allActivity: ActivityRecord[] = [];

  needActivity: ActivityRecord[] = [];

  state = 'pending'; // "pending", "done" or "error"

  requestFlag = 0;

  constructor() {
    makeAutoObservable(this);
  }

  async loadActivityData() {
    // this.accountList = [];
    this.state = 'pending';

    try {
      const allRes = await GetMultisigHistoryList();
      const needRes = await GetNeedSignatureList();

      runInAction(() => {
        this.allActivity = [];
        this.needActivity = [];
        if (allRes.code === 200) {
          allRes.data.map((item) => {
            this.allActivity.push(item);
          });
        }
        if (needRes.code === 200) {
          needRes.data.map((item) => {
            this.needActivity.push(item);
          });
        }
        this.state = 'done';
      });
    } catch (e) {
      runInAction(() => {
        this.state = 'error';
      });
    }
  }
}

export const ActivityStore = new Activity();
