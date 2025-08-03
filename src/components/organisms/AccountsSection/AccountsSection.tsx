import { spacing, typography } from '@/src/theme';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AccountsSectionProps } from '../../../types/accounts.types';
import { AccountCard } from '../../molecules/AccountCard/AccountCard';

export const AccountsSection: React.FC<AccountsSectionProps> = ({
  accounts,
  onAccountPress,
  onManagePress
}) => (
  <View style={styles.container}>
    <View style={styles.header}>
      <Text style={styles.title}>Mis Cuentas</Text>
      <TouchableOpacity onPress={onManagePress} activeOpacity={0.7}>
        <Text style={styles.manageButton}>Ver todas</Text>
      </TouchableOpacity>
    </View>
    
    <ScrollView 
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
      style={styles.scrollView}
    >
      {accounts.map((account) => (
        <AccountCard
          key={account.id}
          account={account}
          onPress={() => onAccountPress?.(account.id)}
        />
      ))}
    </ScrollView>
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000000',
    paddingVertical: spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  title: {
    color: '#FFFFFF',
    fontSize: typography.h3.fontSize,
    fontWeight: typography.h3.fontWeight,
  },
  manageButton: {
    color: '#3B82F6',
    fontSize: typography.bodySmall.fontSize,
    fontWeight: typography.label.fontWeight,
  },
  scrollView: {
    paddingLeft: spacing.lg,
  },
  scrollContent: {
    paddingRight: spacing.lg,
  },
});