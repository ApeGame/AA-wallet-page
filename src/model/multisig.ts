export interface MultisigRecord {
  id: string;
  sender: string;
  data: string;
  user_operation_hash: string;
  status: number;
}

export interface MultisigInfo {
  abstract_account: string;
  threshold: number;
  signer_aa_account: string[];
}
