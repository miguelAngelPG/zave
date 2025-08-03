import { spacing } from '@/src/theme';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { BalanceSectionProps } from '../../../types/balance.types';
import { ExpandButton } from '../../atoms/Button/ExpandButton';
import { BalanceAmount } from '../../atoms/Text/BalanceAmount';
import { GreetingText } from '../../atoms/Text/GreetingText';
import { SubtitleText } from '../../atoms/Text/SubtitleText';
import { CalculationBreakdown } from '../../molecules/CalculationBreakdown/CalculationBreakdown';
import { StatsGrid } from '../StatsGrid/StatsGrid';

export const BalanceSection: React.FC<BalanceSectionProps> = ({ 
  greeting = "¡Buen día!",
  amount,
  subtitle = "Tienes disponible para gastar",
  stats,
  onExpandPress
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const handleExpand = (): void => {
    const newExpandedState = !isExpanded;
    setIsExpanded(newExpandedState);
    onExpandPress?.(newExpandedState);
  };

  // Datos del breakdown basados en el amount
  const breakdown = {
    income: 12500,
    fixedExpenses: 4200,
    debts: 3053,
    available: amount
  };

  return (
    <View style={styles.container}>
      <GreetingText>{greeting}</GreetingText>
      <BalanceAmount amount={amount} />
      <SubtitleText>{subtitle}</SubtitleText>
      <ExpandButton 
        onPress={handleExpand}
        isExpanded={isExpanded}
      />
      <CalculationBreakdown 
        isExpanded={isExpanded}
        breakdown={breakdown}
      />
      <StatsGrid stats={stats} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000000',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
});
