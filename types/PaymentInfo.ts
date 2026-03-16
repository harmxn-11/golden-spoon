export interface PaymentInfo {
  user_id: string;
  bankName: string;
  accountNumber: string;
  ifscCode: string;
  upiId?: string;
}