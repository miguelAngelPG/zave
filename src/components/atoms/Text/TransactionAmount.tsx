import React from 'react';
import { StyleSheet, Text } from 'react-native';

interface TransactionAmountProps {
  amount: number;
  type: 'expense' | 'income';
  currency?: string;
}

export const TransactionAmount: React.FC<TransactionAmountProps> = ({
  amount,
  type,
  currency = '$'
}) => {
  const formatAmount = (amount: number): string => amount.toLocaleString('es-MX');
  const sign = type === 'income' ? '+' : '-';
  
  return (
    <Text style={[
      styles.amount,
      type === 'income' ? styles.income : styles.expense
    ]}>
      {sign}{currency}{formatAmount(amount)}
    </Text>
  );
};

const styles = StyleSheet.create({
  amount: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'right',
  },
  expense: {
    color: '#EF4444',
  },
  income: {
    color: '#10B981',
  },
});