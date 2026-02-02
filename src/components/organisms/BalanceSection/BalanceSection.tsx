import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import React, { useState } from 'react';
import { Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { colors, spacing, typography } from '../../../theme';
import { Text } from '../../atoms/Text/Text';

interface BalanceSectionProps {
  totalBalance: number;
  pendingFixedExpenses: number;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export const BalanceSection: React.FC<BalanceSectionProps> = ({
  totalBalance = 45230.50,
  pendingFixedExpenses = 12500.00
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isBalanceHidden, setIsBalanceHidden] = useState(false);
  const safeToSpend = totalBalance - pendingFixedExpenses;

  // Mock Data for Slides
  const budgetLimit = 20000;
  const budgetSpent = 8240;
  const dailyRemaining = 450;

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

  const renderItem = ({ index }: { index: number }) => {
    return (
      <View style={styles.slideContainer}>
        {/* SLIDE 1: REAL BALANCE */}
        {index === 0 && (
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

        {/* SLIDE 2: MONTHLY BUDGET */}
        {index === 1 && (
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
                  {formatCurrency(budgetLimit - budgetSpent)}
                </Text>
              </TouchableOpacity>
              <Text style={styles.subLabel}>
                Restante de {formatCurrency(budgetLimit, true)}
              </Text>
            </View>

            <View style={styles.separator} />

            <View style={styles.footer}>
              <View style={styles.statColumn}>
                <View style={styles.iconRow}>
                  <Ionicons name="calendar-outline" size={12} color={colors.text.tertiary} />
                  <Text style={styles.statLabel}>Diario Sugerido</Text>
                </View>
                <Text style={styles.statValue}>{formatCurrency(dailyRemaining)}</Text>
              </View>
              <View style={styles.verticalLine} />
              <View style={styles.statColumn}>
                <View style={styles.iconRow}>
                  <Ionicons name="trending-down-outline" size={12} color={colors.text.tertiary} />
                  <Text style={styles.statLabel}>Gastado</Text>
                </View>
                <Text style={styles.statValue}>{formatCurrency(budgetSpent, true)}</Text>
              </View>
            </View>
          </>
        )}

        {/* SLIDE 3: MAIN GOAL */}
        {index === 2 && (
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
                  {formatCurrency(12500)}
                </Text>
              </TouchableOpacity>
              <Text style={styles.subLabel}>
                Viaje a Japón (35%)
              </Text>
            </View>

            <View style={styles.separator} />

            <View style={styles.footer}>
              <View style={styles.statColumn}>
                <View style={styles.iconRow}>
                  <Ionicons name="flag-outline" size={12} color={colors.text.tertiary} />
                  <Text style={styles.statLabel}>Faltan</Text>
                </View>
                <Text style={styles.statValue}>{formatCurrency(22500, true)}</Text>
              </View>
              <View style={styles.verticalLine} />
              <View style={styles.statColumn}>
                <View style={styles.iconRow}>
                  <Ionicons name="time-outline" size={12} color={colors.text.tertiary} />
                  <Text style={styles.statLabel}>Fecha Meta</Text>
                </View>
                <Text style={styles.statValue}>Dic 2025</Text>
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
        data={[0, 1, 2]}
        scrollAnimationDuration={500}
        onSnapToItem={(index) => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          setActiveIndex(index);
        }}
        renderItem={renderItem}

      />

      {/* Pagination Dots */}
      <View style={styles.pagination}>
        {[0, 1, 2].map((_, i) => (
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
});
