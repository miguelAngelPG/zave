import { spacing, typography } from '@/src/theme';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface CalculationBreakdownProps {
  isExpanded: boolean;
  breakdown: {
    income: number;
    fixedExpenses: number;
    debts: number;
    available: number;
  };
}

export const CalculationBreakdown: React.FC<CalculationBreakdownProps> = ({ 
  isExpanded, 
  breakdown 
}) => {
  const formatAmount = (amount: number): string => amount.toLocaleString('es-MX');

  if (!isExpanded) return null;

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.label}>Ingresos totales</Text>
        <Text style={styles.incomeAmount}>+${formatAmount(breakdown.income)}</Text>
      </View>
      
      <View style={styles.row}>
        <Text style={styles.label}>Gastos fijos</Text>
        <Text style={styles.expenseAmount}>-${formatAmount(breakdown.fixedExpenses)}</Text>
      </View>
      
      <View style={styles.row}>
        <Text style={styles.label}>Deudas pendientes</Text>
        <Text style={styles.debtAmount}>-${formatAmount(breakdown.debts)}</Text>
      </View>
      
      <View style={styles.separator} />
      
      <View style={styles.row}>
        <Text style={styles.totalLabel}>Disponible real</Text>
        <Text style={styles.totalAmount}>${formatAmount(breakdown.available)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1F2937',
    borderRadius: 12,
    padding: spacing.md,
    marginBottom: spacing.lg,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  label: {
    color: '#9CA3AF',
    fontSize: typography.bodySmall.fontSize,
    fontWeight: typography.bodySmall.fontWeight,
  },
  incomeAmount: {
    color: '#10B981',
    fontSize: typography.bodySmall.fontSize,
    fontWeight: typography.label.fontWeight,
  },
  expenseAmount: {
    color: '#EF4444',
    fontSize: typography.bodySmall.fontSize,
    fontWeight: typography.label.fontWeight,
  },
  debtAmount: {
    color: '#F59E0B',
    fontSize: typography.bodySmall.fontSize,
    fontWeight: typography.label.fontWeight,
  },
  separator: {
    height: 1,
    backgroundColor: '#374151',
    marginVertical: spacing.sm,
  },
  totalLabel: {
    color: '#FFFFFF',
    fontSize: typography.bodySmall.fontSize,
    fontWeight: typography.label.fontWeight,
  },
  totalAmount: {
    color: '#FFFFFF',
    fontSize: typography.body.fontSize,
    fontWeight: typography.label.fontWeight,
  },
});