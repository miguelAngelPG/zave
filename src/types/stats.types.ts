import { StatsData } from "./balance.types";

export interface StatItemProps {
  value: string;
  label: string;
  isPositive?: boolean;
  isRed?: boolean;
  isOrange?: boolean;
}

export interface StatsGridProps {
  stats: StatsData;
}