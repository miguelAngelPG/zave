export interface AccountData {
  id: string;
  name: string;
  bankCode: string;
  amount: number;
  dueInfo?: string;
  urgencyLevel: 'urgent' | 'warning' | 'normal';
  backgroundColor: string;
  gradient?: readonly [string, string];
  iconColor: string;
}

export interface AccountsSectionProps {
  accounts: AccountData[];
  onAccountPress?: (accountId: string) => void;
  onManagePress?: () => void;
}