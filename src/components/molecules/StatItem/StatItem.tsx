import { spacing } from '@/src/theme';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StatItemProps } from '../../../types/stats.types';
import { StatValue } from '../../atoms/Text/StatValue';

export const StatItem: React.FC<StatItemProps> = ({ 
  value, 
  label, 
  isPositive = false,
  isRed = false,
  isOrange = false
}) => (
  <View style={styles.container}>
    <StatValue 
      value={value} 
      isPositive={isPositive}
      isRed={isRed}
      isOrange={isOrange}
    />
    <Text style={styles.label}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: spacing.md,
  },
  label: {
    color: '#9CA3AF',
    fontSize: 14,
    fontWeight: '400',
    marginTop: 4,
    textAlign: 'center',
  },
});