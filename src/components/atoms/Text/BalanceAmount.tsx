import React from 'react';
import { StyleSheet, Text } from 'react-native';

interface BalanceAmountProps {
  amount: number;
  currency?: string;
}

export const BalanceAmount: React.FC<BalanceAmountProps> = ({ 
  amount, 
  currency = '$' 
}) => {
  const formatAmount = (amount: number): string => amount.toLocaleString('es-MX');
  
  return (
    <Text style={styles.balance}>
      {currency}{formatAmount(amount)}
    </Text>
  );
};

const styles = StyleSheet.create({
  balance: {
    color: '#FFFFFF', // darkTheme.text.primary
    fontSize: 72, // Custom para el balance protagonista
    fontWeight: '300' as const,
    textAlign: 'center',
    letterSpacing: -2,
    lineHeight: 80,
  },
});