import { spacing } from '@/src/theme';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { StatItem } from '../../molecules/StatItem/StatItem';

interface StatsData {
  spent: string;
  credit: string;
  days: string;
  goal: string;
}

interface StatsGridProps {
  stats: StatsData;
}

export const StatsGrid: React.FC<StatsGridProps> = ({ stats }) => (
  <View style={styles.container}>
    <StatItem 
      value={stats.spent} 
      label="Gastado"
      isRed
    />
    <StatItem 
      value={stats.credit} 
      label="Crédito"
      isOrange
    />
    <StatItem 
      value={stats.days} 
      label="Días"
    />
    <StatItem 
      value={stats.goal} 
      label="Meta"
      isPositive
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1A1A1A',
    borderRadius: 20,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});