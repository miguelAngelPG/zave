export interface BalanceData {
  amount: number;
  currency?: string;
}

export interface StatsData {
  spent: string;
  credit: string;
  days: string;
  goal: string;
}

export interface BalanceSectionProps {
  greeting?: string;
  amount: number;
  subtitle?: string;
  stats: StatsData;
  onExpandPress?: (isExpanded: boolean) => void;
}
