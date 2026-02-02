import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import React, { useState } from 'react';
import { Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { colors, spacing, typography } from '../../../theme';
import { Text } from '../../atoms/Text/Text';

export interface BalanceSectionProps {
  totalBalance: number;
  pendingFixedExpenses: number;
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
  const [isBalanceHidden, setIsBalanceHidden] = useState(false);
  const safeToSpend = totalBalance - pendingFixedExpenses;

  // "Intelligent" Configuration Logic
  // ------------------------------------------------
  // 1. Analyze Context
  const isBudgetCritical = budget && (budget.limit - budget.spent) / budget.limit < 0.2; // Less than 20% left
  const isGoalClose = mainGoal && mainGoal.percentage >= 90; // Close to achievement
  const isCreditCardUrgent = creditCard && creditCard.daysUntilDue <= 5;
  const criticalAlert = alerts.find(a => a.type === 'urgent');

  // 2. Assign Value/Priority
  const rawSlides: { type: string; priority: number; data: any }[] = [
    { type: 'balance', priority: 5, data: null }, // Default Home
  ];

  // Dynamic Injection: Critical Alert
  if (criticalAlert) {
    // Highest priority: User MUST see this first
    rawSlides.push({
      type: 'critical-alert',
      priority: 20,
      data: criticalAlert
    });
  }

  if (budget) {
    // If critical, it becomes the MOST important slide (Priority 10)
    // Otherwise, it sits after balance
    rawSlides.push({
      type: 'budget',
      priority: isBudgetCritical ? 10 : 4,
      data: budget
    });
  }

  if (creditCard) {
    // Credit card usually sits alongside budget
    // If urgent payment, it jumps priority
    rawSlides.push({
      type: 'credit-card',
      priority: isCreditCardUrgent ? 15 : 4.5, // Slightly higher than normal budget
      data: creditCard
    });
  }

  if (mainGoal) {
    // If goal is close, prioritize it over standard budget (Priority 8)
    rawSlides.push({
      type: 'goal',
      priority: isGoalClose ? 8 : 3,
      data: mainGoal
    });
  }

  if (savingsChallenge) {
    // Challenges are fun, but usually lower priority than bills
    rawSlides.push({
      type: 'savings-challenge',
      priority: 3.5, // Between Goal and Budget
      data: savingsChallenge
    });
  }

  // Always add a "Personalize" slide at the end
  rawSlides.push({ type: 'add-new', priority: 1, data: null });

  // 3. Sort intelligently
  const slides = rawSlides.sort((a, b) => b.priority - a.priority);

  const formatCurrency = (amount: number, minimal: boolean = false) => {
    if (isBalanceHidden) return '••••••';
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      minimumFractionDigits: minimal ? 0 : 2,
      maximumFractionDigits: minimal ? 0 : 2,
    }).format(amount);
  };

  const togglePrivacy = () => {
    Haptics.selectionAsync();
    setIsBalanceHidden(!isBalanceHidden);
  };

  const renderItem = ({ item }: { item: { type: string; data: any } }) => {
    // HIGH PRIORITY ALERT SLIDE
    if (item.type === 'critical-alert') {
      const alert = item.data;
      return (
        <View style={styles.slideContainer}>
          <View style={[styles.actionSlide, styles.alertSlide]}>
            <View style={[styles.iconCircle, { backgroundColor: 'rgba(239, 68, 68, 0.2)' }]}>
              <Ionicons name="alert-circle" size={24} color={colors.error} />
            </View>
            <Text style={styles.alertTitle}>{alert.title}</Text>
            <Text style={styles.alertSubtitle}>{alert.subtitle}</Text>
          </View>
        </View>
      );
    }

    // GENERIC ADD NEW MODULE (Dynamic Config Entry Point)
    if (item.type === 'add-new') {
      return (
        <View style={styles.slideContainer}>
          <TouchableOpacity
            style={[styles.actionSlide, { borderColor: 'rgba(255,255,255,0.15)' }]}
            onPress={onManageModules}
            activeOpacity={0.7}
          >
            <View style={styles.iconCircle}>
              <Ionicons name="apps-outline" size={24} color={colors.text.secondary} />
            </View>
            <Text style={[styles.actionTitle, { color: colors.text.secondary }]}>
              Personalizar Dashboard
            </Text>
            <Text style={styles.actionSubtitle}>
              Toca para agregar o quitar tarjetas
            </Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <View style={styles.slideContainer}>
        {/* SLIDE: REAL BALANCE */}
        {item.type === 'balance' && (
          <>
            <View style={styles.topSection}>
              <View style={styles.labelContainer}>
                <Text style={styles.label}>DISPONIBLE REAL</Text>
                <View style={[styles.indicator, { backgroundColor: colors.warning }]} />
              </View>

              <TouchableOpacity
                onPress={togglePrivacy}
                hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
                style={styles.eyeIconAbsolute}
              >
                <Ionicons name={isBalanceHidden ? "eye-off-outline" : "eye-outline"} size={16} color={colors.text.tertiary} />
              </TouchableOpacity>

              <TouchableOpacity activeOpacity={0.8} onPress={togglePrivacy} style={{ width: '100%', alignItems: 'center' }}>
                <Text style={styles.bigAmount} adjustsFontSizeToFit numberOfLines={1}>
                  {formatCurrency(safeToSpend)}
                </Text>
              </TouchableOpacity>
              <Text style={styles.subLabel}>Libre para tus gastos diarios</Text>
            </View>

            <View style={styles.separator} />

            <View style={styles.footer}>
              <View style={styles.statColumn}>
                <View style={styles.iconRow}>
                  <Ionicons name="lock-closed-outline" size={12} color={colors.text.tertiary} />
                  <Text style={styles.statLabel}>Reservado</Text>
                </View>
                <Text style={styles.statValue}>{formatCurrency(pendingFixedExpenses, true)}</Text>
              </View>
              <View style={styles.verticalLine} />
              <View style={styles.statColumn}>
                <View style={styles.iconRow}>
                  <Ionicons name="wallet-outline" size={12} color={colors.text.tertiary} />
                  <Text style={styles.statLabel}>Total Cuenta</Text>
                </View>
                <Text style={styles.statValue}>{formatCurrency(totalBalance, true)}</Text>
              </View>
            </View>
          </>
        )}

        {/* CREDIT CARD */}
        {item.type === 'credit-card' && (
          <>
            <View style={styles.topSection}>
              <View style={styles.labelContainer}>
                <Text style={styles.label}>CRÉDITO: {item.data.name}</Text>
                <View style={[styles.indicator, { backgroundColor: '#F472B6' }]} />
              </View>
              <TouchableOpacity onPress={togglePrivacy} hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }} style={styles.eyeIconAbsolute}>
                <Ionicons name={isBalanceHidden ? "eye-off-outline" : "eye-outline"} size={16} color={colors.text.tertiary} />
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.8} onPress={togglePrivacy} style={{ width: '100%', alignItems: 'center' }}>
                <Text style={styles.bigAmount} adjustsFontSizeToFit numberOfLines={1}>
                  {formatCurrency(item.data.available)}
                </Text>
              </TouchableOpacity>
              <Text style={styles.subLabel}>Disponible de {formatCurrency(item.data.limit, true)}</Text>
            </View>
            <View style={styles.separator} />
            <View style={styles.footer}>
              <View style={styles.statColumn}>
                <View style={styles.iconRow}>
                  <Ionicons name="calendar-outline" size={12} color={colors.text.tertiary} />
                  <Text style={styles.statLabel}>Fecha Límite</Text>
                </View>
                <Text style={[styles.statValue, item.data.daysUntilDue <= 5 && { color: colors.error }]}>
                  {item.data.dueDate}
                </Text>
              </View>
              <View style={styles.verticalLine} />
              <View style={styles.statColumn}>
                <View style={styles.iconRow}>
                  <Ionicons name="time-outline" size={12} color={colors.text.tertiary} />
                  <Text style={styles.statLabel}>Vence en</Text>
                </View>
                <Text style={[styles.statValue, item.data.daysUntilDue <= 5 && { color: colors.error }]}>
                  {item.data.daysUntilDue} días
                </Text>
              </View>
            </View>
          </>
        )}

        {/* SAVINGS CHALLENGE */}
        {item.type === 'savings-challenge' && (
          <>
            <View style={styles.topSection}>
              <View style={styles.labelContainer}>
                <Text style={styles.label}>RETO DE AHORRO</Text>
                <View style={[styles.indicator, { backgroundColor: '#2DD4BF' }]} />
              </View>
              <TouchableOpacity onPress={togglePrivacy} hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }} style={styles.eyeIconAbsolute}>
                <Ionicons name={isBalanceHidden ? "eye-off-outline" : "eye-outline"} size={16} color={colors.text.tertiary} />
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.8} onPress={togglePrivacy} style={{ width: '100%', alignItems: 'center' }}>
                <Text style={styles.bigAmount} adjustsFontSizeToFit numberOfLines={1}>
                  {formatCurrency(item.data.savedAmount)}
                </Text>
              </TouchableOpacity>
              <Text style={styles.subLabel}>{item.data.name}</Text>
            </View>
            <View style={styles.separator} />
            <View style={styles.footer}>
              <View style={styles.statColumn}>
                <View style={styles.iconRow}>
                  <Ionicons name="calendar-outline" size={12} color={colors.text.tertiary} />
                  <Text style={styles.statLabel}>Semana</Text>
                </View>
                <Text style={styles.statValue}>{item.data.currentWeek} / {item.data.totalWeeks}</Text>
              </View>
              <View style={styles.verticalLine} />
              <View style={styles.statColumn}>
                <View style={styles.iconRow}>
                  <Ionicons name="trending-up-outline" size={12} color={colors.text.tertiary} />
                  <Text style={styles.statLabel}>Progreso</Text>
                </View>
                <Text style={styles.statValue}>{Math.round((item.data.currentWeek / item.data.totalWeeks) * 100)}%</Text>
              </View>
            </View>
          </>
        )}

        {/* SLIDE: MONTHLY BUDGET */}
        {item.type === 'budget' && budget && (
          <>
            <View style={styles.topSection}>
              <View style={styles.labelContainer}>
                <Text style={styles.label}>PRESUPUESTO MENSUAL</Text>
                <View style={[styles.indicator, { backgroundColor: colors.primary[500] }]} />
              </View>

              <TouchableOpacity
                onPress={togglePrivacy}
                hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
                style={styles.eyeIconAbsolute}
              >
                <Ionicons name={isBalanceHidden ? "eye-off-outline" : "eye-outline"} size={16} color={colors.text.tertiary} />
              </TouchableOpacity>

              <TouchableOpacity activeOpacity={0.8} onPress={togglePrivacy} style={{ width: '100%', alignItems: 'center' }}>
                <Text style={styles.bigAmount} adjustsFontSizeToFit numberOfLines={1}>
                  {formatCurrency(budget.limit - budget.spent)}
                </Text>
              </TouchableOpacity>
              <Text style={styles.subLabel}>
                Restante de {formatCurrency(budget.limit, true)}
              </Text>
            </View>

            <View style={styles.separator} />

            <View style={styles.footer}>
              <View style={styles.statColumn}>
                <View style={styles.iconRow}>
                  <Ionicons name="calendar-outline" size={12} color={colors.text.tertiary} />
                  <Text style={styles.statLabel}>Diario Sugerido</Text>
                </View>
                <Text style={styles.statValue}>{formatCurrency(budget.dailyRemaining)}</Text>
              </View>
              <View style={styles.verticalLine} />
              <View style={styles.statColumn}>
                <View style={styles.iconRow}>
                  <Ionicons name="trending-down-outline" size={12} color={colors.text.tertiary} />
                  <Text style={styles.statLabel}>Gastado</Text>
                </View>
                <Text style={styles.statValue}>{formatCurrency(budget.spent, true)}</Text>
              </View>
            </View>
          </>
        )}

        {/* SLIDE: MAIN GOAL */}
        {item.type === 'goal' && mainGoal && (
          <>
            <View style={styles.topSection}>
              <View style={styles.labelContainer}>
                <Text style={styles.label}>META PRINCIPAL</Text>
                <View style={[styles.indicator, { backgroundColor: '#8B5CF6' }]} />
              </View>

              <TouchableOpacity
                onPress={togglePrivacy}
                hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
                style={styles.eyeIconAbsolute}
              >
                <Ionicons name={isBalanceHidden ? "eye-off-outline" : "eye-outline"} size={16} color={colors.text.tertiary} />
              </TouchableOpacity>

              <TouchableOpacity activeOpacity={0.8} onPress={togglePrivacy} style={{ width: '100%', alignItems: 'center' }}>
                <Text style={styles.bigAmount} adjustsFontSizeToFit numberOfLines={1}>
                  {formatCurrency(mainGoal.currentAmount)}
                </Text>
              </TouchableOpacity>
              <Text style={styles.subLabel}>
                {mainGoal.name} ({mainGoal.percentage}%)
              </Text>
            </View>

            <View style={styles.separator} />

            <View style={styles.footer}>
              <View style={styles.statColumn}>
                <View style={styles.iconRow}>
                  <Ionicons name="flag-outline" size={12} color={colors.text.tertiary} />
                  <Text style={styles.statLabel}>Faltan</Text>
                </View>
                <Text style={styles.statValue}>{formatCurrency(mainGoal.targetAmount - mainGoal.currentAmount, true)}</Text>
              </View>
              <View style={styles.verticalLine} />
              <View style={styles.statColumn}>
                <View style={styles.iconRow}>
                  <Ionicons name="time-outline" size={12} color={colors.text.tertiary} />
                  <Text style={styles.statLabel}>Fecha Meta</Text>
                </View>
                <Text style={styles.statValue}>{mainGoal.deadline}</Text>
              </View>
            </View>
          </>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Carousel
        loop={false}
        width={SCREEN_WIDTH}
        height={180} // Adjusted height based on content
        autoPlay={false}
        data={slides}
        scrollAnimationDuration={500}
        onSnapToItem={(index) => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          setActiveIndex(index);
        }}
        renderItem={renderItem}

      />

      {/* Pagination Dots */}
      <View style={styles.pagination}>
        {slides.map((_, i) => (
          <View
            key={i}
            style={[
              styles.dot,
              { backgroundColor: i === activeIndex ? colors.text.inverse : 'rgba(255,255,255,0.2)' }
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 0,
    width: '100%',
    alignItems: 'center',
  },
  slideContainer: {
    width: SCREEN_WIDTH,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.md,
  },
  topSection: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.sm,
    alignItems: 'center',
    width: '100%',
    position: 'relative',
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
    width: '100%', // Ensure it takes full width for strict centering
  },
  eyeIconAbsolute: {
    position: 'absolute',
    right: spacing.sm,
    top: spacing.md,
    zIndex: 10,
    padding: 8,
  },
  label: {
    ...typography.caption,
    fontSize: 10,
    letterSpacing: 1.5,
    fontWeight: '700',
    color: colors.text.tertiary,
    textTransform: 'uppercase',
  },
  indicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginLeft: spacing.xs,
  },
  bigAmount: {
    ...typography.display,
    color: colors.text.inverse,
    textAlign: 'center',
    marginVertical: 2,
    lineHeight: 42,
    width: '90%',
  },
  subLabel: {
    ...typography.caption,
    fontSize: 12,
    color: colors.text.tertiary,
    fontWeight: '400',
    marginTop: -4,
  },
  separator: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    width: '50%',
    alignSelf: 'center',
    marginVertical: spacing.sm,
  },
  footer: {
    flexDirection: 'row',
    paddingBottom: spacing.sm,
    paddingHorizontal: spacing.lg,
    justifyContent: 'center',
    gap: spacing.xl,
    width: '100%',
  },
  statColumn: {
    alignItems: 'center',
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
    gap: 4,
  },
  statLabel: {
    ...typography.caption,
    fontSize: 10,
    color: colors.text.tertiary,
  },
  statValue: {
    ...typography.body,
    fontSize: 14,
    fontWeight: '600',
    color: colors.text.inverse,
  },
  verticalLine: {
    width: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    height: '80%',
    alignSelf: 'center',
    marginHorizontal: spacing.md,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 0, // Reduced top margin as the carousel has internal padding
    gap: 6,
    height: 10,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  actionSlide: {
    width: '90%', // Slightly narrower to show it's different
    height: 140,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.md,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  actionTitle: {
    ...typography.body,
    fontWeight: '600',
    color: colors.text.inverse,
    marginBottom: 4,
  },
  actionSubtitle: {
    ...typography.caption,
    fontSize: 12,
    color: colors.text.tertiary,
    textAlign: 'center',
  },
  alertSlide: {
    borderColor: 'rgba(239, 68, 68, 0.4)',
    backgroundColor: 'rgba(239, 68, 68, 0.05)',
    borderStyle: 'solid',
  },
  alertTitle: {
    ...typography.body,
    fontWeight: '700',
    color: colors.error,
    marginBottom: 4,
  },
  alertSubtitle: {
    ...typography.caption,
    color: colors.text.secondary,
    textAlign: 'center',
  },
});
