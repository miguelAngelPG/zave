import React, { useCallback, useState } from 'react';
import { Dimensions, View } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { spacing } from '../../../theme';
import { styles } from './BalanceSection.styles';
import { BalanceSlide } from './BalanceSlide';
import { BudgetSlide } from './BudgetSlide';
import { CreditCardSlide } from './CreditCardSlide';
import { EmptySlide } from './EmptySlide';
import { GoalSlide } from './GoalSlide';
import { PaginationDots } from './PaginationDots';
import { useBalancePrivacy } from './useBalancePrivacy';
import { useBalanceSlides } from './useBalanceSlides';

export interface BalanceSectionProps {
  totalBalance?: number;
  pendingFixedExpenses?: number;
  budget?: {
    limit: number;
    spent: number;
    dailyRemaining: number;
  };
  mainGoal?: {
    currentAmount: number;
    targetAmount: number;
    deadline: string;
    name: string;
    percentage: number;
  };
  creditCard?: {
    name: string;
    available: number;
    limit: number;
    dueDate: string;
    daysUntilDue: number;
  };
  savingsChallenge?: {
    name: string;
    currentWeek: number;
    totalWeeks: number;
    savedAmount: number;
  };
  onPressAddBudget?: () => void;
  onPressAddGoal?: () => void;
  onManageModules?: () => void;
  alerts?: {
    type: 'urgent' | 'warning' | 'info';
    title: string;
    subtitle: string;
  }[];
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export const BalanceSection: React.FC<BalanceSectionProps> = ({
  totalBalance = 45230.50,
  pendingFixedExpenses = 12500.00,
  budget,
  mainGoal,
  creditCard,
  savingsChallenge,
  onPressAddBudget,
  onPressAddGoal,
  onManageModules,
  alerts = [],
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { isBalanceHidden, blurOpacity, togglePrivacy } = useBalancePrivacy(false);
  const { slides } = useBalanceSlides({ budget, mainGoal, creditCard, savingsChallenge, alerts });

  const safeToSpend = totalBalance - pendingFixedExpenses;

  const formatCurrency = useCallback((amount: number, compact = false): string => {
    if (compact && amount >= 1000) {
      return `$${(amount / 1000).toFixed(1)}k`;
    }
    return `$${amount.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }, []);

  const renderSlide = useCallback(({ item }: { item: typeof slides[0] }) => {
    const cardContent = (
      <>
        {item.type === 'balance' && (
          <BalanceSlide
            safeToSpend={safeToSpend}
            pendingFixedExpenses={pendingFixedExpenses}
            totalBalance={totalBalance}
            isBalanceHidden={isBalanceHidden}
            blurOpacity={blurOpacity}
            togglePrivacy={togglePrivacy}
            formatCurrency={formatCurrency}
          />
        )}

        {item.type === 'budget' && budget && (
          <BudgetSlide budget={budget} formatCurrency={formatCurrency} />
        )}

        {item.type === 'goal' && mainGoal && (
          <GoalSlide goal={mainGoal} formatCurrency={formatCurrency} />
        )}

        {item.type === 'creditCard' && creditCard && (
          <CreditCardSlide creditCard={creditCard} formatCurrency={formatCurrency} />
        )}

        {item.type === 'config' && (
          <EmptySlide
            icon="settings-outline"
            title="Personalizar Inicio"
            subtitle="Configura qué información quieres ver aquí"
            buttonText="Configurar"
            onPress={onManageModules}
          />
        )}
      </>
    );

    return (
      <View style={styles.slideContainer}>
        <View style={{
          backgroundColor: 'rgba(255,255,255,0.03)',
          borderRadius: 24,
          padding: spacing.lg,
          width: '90%',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 12,
          elevation: 5,
          borderWidth: 1,
          borderColor: 'rgba(255,255,255,0.05)',
          justifyContent: 'center',
          minHeight: 220, // Fix for Android flex: 1 collapse
        }}>
          {cardContent}
        </View>
      </View>
    );
  }, [
    safeToSpend,
    pendingFixedExpenses,
    totalBalance,
    isBalanceHidden,
    blurOpacity,
    togglePrivacy,
    formatCurrency,
    budget,
    mainGoal,
    creditCard,
    onPressAddBudget,
    onPressAddGoal,
    onManageModules,
  ]);

  return (
    <View style={styles.container}>
      <View style={styles.carouselContainer}>
        <Carousel
          width={SCREEN_WIDTH}
          height={280}
          data={slides}
          renderItem={renderSlide}
          onSnapToItem={setActiveIndex}
          loop={false}
          pagingEnabled={true}
          snapEnabled={true}
          windowSize={2}
        />
      </View>

      <PaginationDots total={slides.length} activeIndex={activeIndex} />
    </View>
  );
};
