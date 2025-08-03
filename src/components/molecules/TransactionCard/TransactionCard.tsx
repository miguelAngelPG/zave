import { spacing } from '@/src/theme';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { TransactionData } from '../../../types/activity.types';
import { BankIndicator } from '../../atoms/BankIndicator/BankIndicator';
import { StatusBadge } from '../../atoms/StatusBadge/StatusBadge';
import { TransactionAmount } from '../../atoms/Text/TransactionAmount';
import { TransactionIcon } from '../../atoms/TransactionIcon/TransactionIcon';

interface TransactionCardProps {
  transaction: TransactionData;
  onPress?: () => void;
}

export const TransactionCard: React.FC<TransactionCardProps> = ({
  transaction,
  onPress
}) => {
  const getBorderColor = () => {
    switch (transaction.status) {
      case 'DEUDA': return '#EF4444';
      case 'PAGADO': return '#10B981';
      case 'PENDIENTE': return '#F59E0B';
      default: return '#374151';
    }
  };

  const getIconBackgroundColor = () => {
    if (transaction.name.includes('Domino')) return '#EA580C';
    if (transaction.name.includes('Shell')) return '#DC2626';
    if (transaction.name.includes('Salario')) return '#059669';
    return '#374151';
  };

  return (
    <TouchableOpacity
      style={[styles.container, { borderLeftColor: getBorderColor() }]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.content}>
        <View style={styles.leftSection}>
          <TransactionIcon
            emoji={transaction.emoji}
            backgroundColor={getIconBackgroundColor()}
          />
          <View style={styles.details}>
            <Text style={styles.name}>{transaction.name}</Text>
            <Text style={styles.datetime}>
              {transaction.date} {transaction.time}
            </Text>
          </View>
        </View>

        <View style={styles.rightSection}>
          <View style={styles.amountSection}>
            <TransactionAmount
              amount={transaction.amount}
              type={transaction.type}
            />
            <StatusBadge status={transaction.status} />
          </View>
          {transaction.bankIndicatorColor && (
            <BankIndicator color={transaction.bankIndicatorColor} />
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1F2937',
    borderRadius: 12,
    borderLeftWidth: 4,
    marginBottom: spacing.sm,
    overflow: 'hidden',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    paddingLeft: spacing.md + 4, // Extra padding for border
  },
  leftSection: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  details: {
    flex: 1,
  },
  name: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
  datetime: {
    color: '#9CA3AF',
    fontSize: 14,
    fontWeight: '400',
    marginTop: 2,
  },
  rightSection: {
    alignItems: 'flex-end',
    gap: spacing.xs,
  },
  amountSection: {
    alignItems: 'flex-end',
    gap: 4,
  },
});