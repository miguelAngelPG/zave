import { spacing, typography } from '@/src/theme';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ActivitySectionProps } from '../../../types/activity.types';
import { TransactionCard } from '../../molecules/TransactionCard/TransactionCard';

export const ActivitySection: React.FC<ActivitySectionProps> = ({
  transactions,
  onTransactionPress,
  onViewAll
}) => (
  <View style={styles.container}>
    <View style={styles.header}>
      <Text style={styles.title}>Actividad Reciente</Text>
      <TouchableOpacity onPress={onViewAll} activeOpacity={0.7}>
        <Text style={styles.viewAll}>Ver todo</Text>
      </TouchableOpacity>
    </View>

    <View style={styles.transactionsList}>
      {transactions.map((transaction) => (
        <TransactionCard
          key={transaction.id}
          transaction={transaction}
          onPress={() => onTransactionPress?.(transaction.id)}
        />
      ))}
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000000',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  title: {
    color: '#FFFFFF',
    fontSize: typography.h3.fontSize,
    fontWeight: typography.h3.fontWeight,
  },
  viewAll: {
    color: '#3B82F6',
    fontSize: typography.bodySmall.fontSize,
    fontWeight: typography.label.fontWeight,
  },
  transactionsList: {
    gap: spacing.sm,
  },
});
