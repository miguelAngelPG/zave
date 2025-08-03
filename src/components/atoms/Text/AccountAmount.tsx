import { typography } from '@/src/theme';
import React from 'react';
import { StyleSheet, Text } from 'react-native';

interface AccountAmountProps {
  amount: number;
  currency?: string;
}

export const AccountAmount: React.FC<AccountAmountProps> = ({ 
  amount, 
  currency = '$' 
}) => {
  const formatAmount = (amount: number): string => amount.toLocaleString('es-MX');
  
  return (
    <Text style={styles.amount}>
      {currency}{formatAmount(amount)}
    </Text>
  );
};

const styles = StyleSheet.create({
  amount: {
    color: '#FFFFFF',
    fontSize: typography.h3.fontSize,
    fontWeight: typography.h3.fontWeight,
    textAlign: 'center',
    marginTop: 8,
  },
});