// src/components/molecules/BalanceCard/BalanceCard.tsx (CORRECTO)
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Text } from '../../atoms/Text/Text';
import { spacing } from '../../../theme';

interface BalanceCardProps {
  balance: number;
  income: number;
  expenses: number;
}

export const BalanceCard: React.FC<BalanceCardProps> = ({
  balance,
  income,
  expenses,
}) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
    }).format(amount);
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#4C63D2', '#4C63D2']}
        style={styles.card}
      >
        {/* Balance Total */}
        <View style={styles.balanceSection}>
          <Text style={styles.balanceLabel}>Balance Total</Text>
          <Text style={styles.balanceAmount}>{formatCurrency(balance)}</Text>
        </View>

        {/* Ingresos y Gastos */}
        <View style={styles.summaryRow}>
          {/* Ingresos con bolita verde */}
          <View style={styles.summaryItem}>
            <View style={styles.itemRow}>
              <View style={[styles.dot, styles.greenDot]} />
              <Text style={styles.itemLabel}>Ingresos</Text>
            </View>
            <Text style={styles.itemAmount}>{formatCurrency(income)}</Text>
          </View>

          {/* Gastos con bolita roja */}
          <View style={styles.summaryItem}>
            <View style={styles.itemRow}>
              <View style={[styles.dot, styles.redDot]} />
              <Text style={styles.itemLabel}>Gastos</Text>
            </View>
            <Text style={styles.itemAmount}>{formatCurrency(expenses)}</Text>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginVertical: 8,
  },
  card: {
    borderRadius: 16,
    padding: 20,
  },
  
  // Balance Total (arriba, alineado a la izquierda)
  balanceSection: {
    alignItems: 'flex-start',
    marginBottom: 32,
  },
  balanceLabel: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,  // Más chico
    marginBottom: 8,
  },
  balanceAmount: {
    color: 'white',
    fontSize: 32,  // Grande
    fontWeight: 'bold',
  },
  
  // Ingresos y Gastos (abajo, lado a lado)
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  summaryItem: {
    alignItems: 'center',
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  greenDot: {
    backgroundColor: '#22C55E',  // Verde
  },
  redDot: {
    backgroundColor: '#EF4444',  // Rojo
  },
  itemLabel: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 12,  // Más chico
  },
  itemAmount: {
    color: 'white',
    fontSize: 18,  // Más grande que el label
    fontWeight: '600',
  },
});