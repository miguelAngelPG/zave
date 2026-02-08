import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { colors } from '../../../theme';
import { Text } from '../../atoms/Text/Text';
import { BalanceFooterStat } from '../../molecules/BalanceFooterStat/BalanceFooterStat';
import { PrivacyBlurOverlay } from '../../molecules/PrivacyBlurOverlay/PrivacyBlurOverlay';
import { styles } from './BalanceSection.styles';

interface BalanceSlideProps {
    safeToSpend: number;
    pendingFixedExpenses: number;
    totalBalance: number;
    isBalanceHidden: boolean;
    blurOpacity: any;
    togglePrivacy: () => void;
    formatCurrency: (amount: number, compact?: boolean) => string;
}

/**
 * BalanceSlide - Main balance display slide
 * Shows available balance with privacy controls and footer stats
 */
export const BalanceSlide: React.FC<BalanceSlideProps> = ({
    safeToSpend,
    pendingFixedExpenses,
    totalBalance,
    isBalanceHidden,
    blurOpacity,
    togglePrivacy,
    formatCurrency,
}) => {
    return (
        <>
            <View style={styles.topSection}>
                <View style={styles.labelContainer}>
                    <TouchableOpacity onPress={togglePrivacy} hitSlop={15} style={{ marginRight: 6 }}>
                        <Ionicons
                            name={isBalanceHidden ? 'eye-off-outline' : 'eye-outline'}
                            size={20}
                            color={colors.text.tertiary}
                        />
                    </TouchableOpacity>
                    <Text style={styles.label}>DISPONIBLE REAL</Text>
                    <View style={[styles.indicator, { backgroundColor: colors.warning }]} />
                </View>

                <TouchableOpacity
                    activeOpacity={1}
                    onPress={togglePrivacy}
                    style={{ width: '100%', alignItems: 'center' }}
                >
                    <View
                        style={{
                            backgroundColor: 'rgba(255,255,255,0.05)',
                            borderRadius: 16,
                            paddingVertical: 8,
                            paddingHorizontal: 24,
                            marginTop: 6,
                            marginBottom: 2,
                        }}
                    >
                        <PrivacyBlurOverlay
                            isVisible={blurOpacity}
                            content={formatCurrency(safeToSpend)}
                            textStyle={[styles.bigAmount, { width: 'auto', marginBottom: 0 }]}
                            containerStyle={{ minWidth: 120 }}
                            blurIntensity={50}
                            shadowRadius={20}
                            borderRadius={16}
                        />
                    </View>
                </TouchableOpacity>
                <Text style={styles.subLabel}>Libre para tus gastos diarios</Text>
            </View>

            <View style={styles.separator} />

            <View style={styles.footer}>
                <BalanceFooterStat
                    icon="lock-closed-outline"
                    label="Reservado"
                    value={formatCurrency(pendingFixedExpenses, true)}
                    blurOpacity={blurOpacity}
                />
                <View style={styles.verticalLine} />
                <BalanceFooterStat
                    icon="wallet-outline"
                    label="Total Cuenta"
                    value={formatCurrency(totalBalance, true)}
                    blurOpacity={blurOpacity}
                />
            </View>
        </>
    );
};
