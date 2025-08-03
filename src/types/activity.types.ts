export interface TransactionData {
  id: string;
  name: string;
  amount: number;
  date: string;
  time: string;
  status: 'DEUDA' | 'PAGADO' | 'PENDIENTE';
  type: 'expense' | 'income';
  emoji: string;
  bankIndicatorColor?: string;
}

export interface ActivitySectionProps {
  transactions: TransactionData[];
  onTransactionPress?: (transactionId: string) => void;
  onViewAll?: () => void;
}