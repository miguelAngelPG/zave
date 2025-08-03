export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface Account {
  id: string;
  name: string;
  type: 'debit' | 'credit' | 'cash';
  balance: number;
  institution: string;
  color: string;
}

export interface Transaction {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  category: string;
  subcategory?: string;
  description: string;
  date: string;
  accountId: string;
  account: string;
  isRecurring?: boolean;
  msi?: MSIInfo;
}

export interface MSIInfo {
  totalAmount: number;
  months: number;
  monthlyPayment: number;
  remainingMonths: number;
  nextPaymentDate: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  type: 'income' | 'expense';
  subcategories?: string[];
}

export interface FinancialSummary {
  totalBalance: number;
  monthlyIncome: number;
  monthlyExpenses: number;
  monthlyChange: number;
  accounts: Account[];
}