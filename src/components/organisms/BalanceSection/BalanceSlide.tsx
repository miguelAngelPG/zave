import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { colors } from '../../../theme';
import { HealthIndicator } from '../../atoms/HealthIndicator/HealthIndicator'; // New Atom
import { Text } from '../../atoms/Text/Text';
import { BalanceFooterStat } from '../../molecules/BalanceFooterStat/BalanceFooterStat';
import { BalanceTooltip } from '../../molecules/BalanceTooltip/BalanceTooltip'; // New Molecule
import { PrivacyBlurOverlay } from '../../molecules/PrivacyBlurOverlay/PrivacyBlurOverlay';
import { styles } from './BalanceSection.styles';
import { useBalanceSlideTooltip } from './useBalanceSlideTooltip'; // New Hook

interface BalanceSlideProps {
    safeToSpend: number;
    pendingFixedExpenses: number;
    totalBalance: number;
    isBalanceHidden: boolean;
    blurOpacity: any;
    togglePrivacy: () => void;
    formatCurrency: (amount: number, compact?: boolean) => string;
}

export const BalanceSlide: React.FC<BalanceSlideProps> = ({
    safeToSpend,
    pendingFixedExpenses,
    totalBalance,
    isBalanceHidden,
    blurOpacity,
    togglePrivacy,
    formatCurrency,
}) => {
    // Extracted Logic Hook
    const { activeTooltip, showTooltip, fadeAnim } = useBalanceSlideTooltip();

    const handleTogglePrivacy = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        togglePrivacy();
    };

    return (
        <View style={{ flex: 1, width: '100%', position: 'relative' }}>
            {/* TOP SECTION */}
            <View style={styles.topSection}>
                <View style={[styles.labelContainer, { zIndex: 20 }]}>
                    <TouchableOpacity onPress={handleTogglePrivacy} hitSlop={15} style={{ marginRight: 6 }}>
                        <Ionicons
                            name={isBalanceHidden ? 'eye-off-outline' : 'eye-outline'}
                            size={20}
                            color={colors.text.tertiary}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => showTooltip('header')}
                        hitSlop={10}
                        style={{ flexDirection: 'row', alignItems: 'center' }}
                    >
                        <Text style={styles.label}>DISPONIBLE REAL</Text>
                        <Ionicons name="help-circle-outline" size={14} color={colors.text.tertiary} style={{ marginLeft: 4, opacity: 0.5 }} />
                    </TouchableOpacity>

                    {/* Extracted Health Indicator Atom */}
                    <HealthIndicator
                        totalBalance={totalBalance}
                        safeToSpend={safeToSpend}
                        style={{ marginLeft: 6 }}
                    />

                    {/* Header Tooltip Molecule */}
                    <BalanceTooltip
                        isVisible={activeTooltip === 'header'}
                        fadeAnim={fadeAnim}
                        text="Es tu saldo total MENOS lo reservado para gastos fijos y metas."
                        style={{ top: 28, left: 30, width: 200 }}
                        arrowStyle={{ top: -6, left: 20, borderBottomColor: '#2C2C2C', borderBottomWidth: 6 }}
                    />
                </View>

                <TouchableOpacity
                    activeOpacity={1}
                    onPress={handleTogglePrivacy}
                    style={{ width: '100%', alignItems: 'center', zIndex: 1 }}
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

            {/* FOOTER SECTION */}
            <View style={[styles.footer, { zIndex: 10 }]}>
                {/* Left Stat */}
                <TouchableOpacity
                    style={{ flex: 1, position: 'relative' }}
                    onPress={() => showTooltip('footer-left')}
                >
                    <BalanceFooterStat
                        icon="lock-closed-outline"
                        label="Reservado"
                        value={formatCurrency(pendingFixedExpenses, true)}
                        blurOpacity={blurOpacity}
                    />

                    {/* Footer Left Tooltip Molecule */}
                    <BalanceTooltip
                        isVisible={activeTooltip === 'footer-left'}
                        fadeAnim={fadeAnim}
                        text="Dinero apartado para tus gastos fijos y metas."
                        style={{ bottom: 45, left: -10, width: 140 }}
                        arrowStyle={{ bottom: -6, left: 30, borderTopColor: '#2C2C2C', borderTopWidth: 6 }}
                    />
                </TouchableOpacity>

                <View style={styles.verticalLine} />

                {/* Right Stat */}
                <TouchableOpacity
                    style={{ flex: 1, position: 'relative' }}
                    onPress={() => showTooltip('footer-right')}
                >
                    <BalanceFooterStat
                        icon="wallet-outline"
                        label="Total Cuenta"
                        value={formatCurrency(totalBalance, true)}
                        blurOpacity={blurOpacity}
                    />

                    {/* Footer Right Tooltip molecule */}
                    <BalanceTooltip
                        isVisible={activeTooltip === 'footer-right'}
                        fadeAnim={fadeAnim}
                        text="Suma total de todas tus cuentas bancarias."
                        style={{ bottom: 45, right: -10, width: 140 }}
                        arrowStyle={{ bottom: -6, right: 30, borderTopColor: '#2C2C2C', borderTopWidth: 6 }}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
};
