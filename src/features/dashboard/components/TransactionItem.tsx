import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from '../../../components/atoms/Text/Text';
import { colors, spacing } from '../../../theme';

interface Transaction {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  category: string;
  description: string;
  date: string;
  account: string;
}

interface TransactionItemProps {
  transaction: Transaction;
  onPress?: () => void;
}

export const TransactionItem: React.FC<TransactionItemProps> = ({
  transaction,
  onPress,
}) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
    }).format(amount);
  };

  const getCategoryIcon = (category: string) => {
    const icons: Record<string, string> = {
      'Supermercado': '🛒',
      'Gasolina': '⛽',
      'Nómina': '💰',
      'Depósito': '🏦',
      'Netflix': '📺',
      'default': '💳',
    };
    return icons[category] || icons.default;
  };

  const getAccountColor = (account: string) => {
    const colors_map: Record<string, string> = {
      'BBVA': '#004481',
      'Santander': '#EC0000',
      'Banamex': '#E31E24',
      'default': colors.primary.main,
    };
    return colors_map[account] || colors_map.default;
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.iconContainer}>
        <Text variant="h3">{getCategoryIcon(transaction.category)}</Text>
      </View>
      
      <View style={styles.contentContainer}>
        <View style={styles.mainInfo}>
          <Text variant="body" weight="medium" numberOfLines={1}>
            {transaction.description}
          </Text>
          <Text variant="caption" color="secondary">
            {transaction.account} • {transaction.date}
          </Text>
        </View>
        
        <View style={styles.amountContainer}>
          <Text
            variant="body"
            weight="semibold"
            style={{
              color: transaction.type === 'income' ? colors.success : colors.error,
            }}
          >
            {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
          </Text>
        </View>
      </View>
      
      <View
        style={[
          styles.accountIndicator,
          { backgroundColor: getAccountColor(transaction.account) }
        ]}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background.card,
    padding: spacing.md,
    marginVertical: spacing.xs,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.background.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  mainInfo: {
    flex: 1,
  },
  amountContainer: {
    alignItems: 'flex-end',
  },
  accountIndicator: {
    width: 4,
    height: '100%',
    borderRadius: 2,
    position: 'absolute',
    right: 0,
  },
});