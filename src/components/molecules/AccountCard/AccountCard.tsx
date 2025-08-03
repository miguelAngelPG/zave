import { spacing, typography } from '@/src/theme';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AccountData } from '../../../types/accounts.types';
import { AccountIcon } from '../../atoms/AccountIcon/AccountIcon';
import { AccountAmount } from '../../atoms/Text/AccountAmount';
import { DueInfo } from '../../atoms/Text/DueInfo';
import { UrgencyIndicator } from '../../atoms/UrgencyIndicator/UrgencyIndicator';

interface AccountCardProps {
  account: AccountData;
  onPress?: () => void;
}

export const AccountCard: React.FC<AccountCardProps> = ({ account, onPress }) => (
  <TouchableOpacity
    style={styles.container}
    onPress={onPress}
    activeOpacity={0.8}
  >
    <View style={styles.header}>
      <AccountIcon
        bankCode={account.bankCode}
        backgroundColor={account.backgroundColor}
        iconColor={account.iconColor}
      />
      <UrgencyIndicator urgencyLevel={account.urgencyLevel} />
    </View>
    
    <Text style={styles.bankName}>{account.name}</Text>
    
    {account.dueInfo && (
      <DueInfo info={account.dueInfo} urgencyLevel={account.urgencyLevel} />
    )}
    
    <AccountAmount amount={account.amount} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1F2937',
    borderRadius: 16,
    padding: spacing.md,
    marginRight: spacing.sm,
    width: 180,
    minHeight: 120,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.sm,
  },
  bankName: {
    color: '#FFFFFF',
    fontSize: typography.body.fontSize,
    fontWeight: typography.label.fontWeight,
    textAlign: 'center',
  },
});