export type WithdrawalStatus =
  | "pending"
  | "approved"
  | "rejected"
  | "processing"
  | "completed";

export interface WithdrawalRequest {
  id: string;

  /* User Reference */
  userId: string;

  /* Amount */
  amount: number;
  currency?: string;

  /* Bank Details */
  bankName: string;
  accountNumber: string;
  ifscCode: string;
  upiId?: string;

  /* Status */
  status: WithdrawalStatus;
}