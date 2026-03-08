export interface InsightData {
  id: string;
  message: string;
  subtitle?: string;
  type: 'positive' | 'warning' | 'info' | 'achievement';
  actionLabel?: string;
  onAction?: () => void;
}

export interface InsightsSectionProps {
  insights: InsightData[];
  onViewMore?: () => void;
  onInsightPress?: (insightId: string) => void;
}