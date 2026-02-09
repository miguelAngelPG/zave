import { Ionicons } from '@expo/vector-icons';
import React, { useRef, useState } from 'react';
import { Animated, StyleSheet, TouchableOpacity, View } from 'react-native';
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

type TooltipPosition = 'header' | 'footer-left' | 'footer-right' | null;

export const BalanceSlide: React.FC<BalanceSlideProps> = ({
    safeToSpend,
    pendingFixedExpenses,
    totalBalance,
    isBalanceHidden,
    blurOpacity,
    togglePrivacy,
    formatCurrency,
}) => {
    const [activeTooltip, setActiveTooltip] = useState<TooltipPosition>(null);
    const fadeAnim = useRef(new Animated.Value(0)).current;

    // Auto-hide tooltip ref
    const timeoutRef = useRef<any>(null);

    const showTooltip = (position: TooltipPosition) => {
        if (activeTooltip === position) {
            hideTooltip();
            return;
        }

        setActiveTooltip(position);
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
        }).start();

        // Auto hide after 3.5s
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(hideTooltip, 3500);
    };

    const hideTooltip = () => {
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 150,
            useNativeDriver: true,
        }).start(() => setActiveTooltip(null));
    };

    const renderTooltip = (text: string, style: any, arrowStyle: any) => {
        if (!activeTooltip) return null;

        return (
            <Animated.View
                style={[
                    localStyles.tooltipContainer,
                    style,
                    { opacity: fadeAnim, transform: [{ translateY: fadeAnim.interpolate({ inputRange: [0, 1], outputRange: [4, 0] }) }] }
                ]}
                pointerEvents="none"
            >
                <Text style={localStyles.tooltipText}>{text}</Text>
                <View style={[localStyles.arrow, arrowStyle]} />
            </Animated.View>
        );
    };

    return (
        <View style={{ flex: 1, width: '100%', position: 'relative' }}>
            <View style={styles.topSection}>
                <View style={[styles.labelContainer, { zIndex: 20 }]}>
                    <TouchableOpacity onPress={togglePrivacy} hitSlop={15} style={{ marginRight: 6 }}>
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

                    <View style={[styles.indicator, { backgroundColor: colors.warning, marginLeft: 6 }]} />

                    {/* Header Tooltip */}
                    {activeTooltip === 'header' && renderTooltip(
                        "Es tu saldo total MENOS lo reservado para gastos fijos y metas.",
                        { top: 28, left: 30, width: 200 },
                        { top: -6, left: 20, borderBottomColor: '#2C2C2C', borderBottomWidth: 6 }
                    )}
                </View>

                <TouchableOpacity
                    activeOpacity={1}
                    onPress={togglePrivacy}
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

            <View style={[styles.footer, { zIndex: 10 }]}>
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

                    {/* Footer Left Tooltip */}
                    {activeTooltip === 'footer-left' && renderTooltip(
                        "Dinero apartado para tus gastos fijos y metas.",
                        { bottom: 45, left: -10, width: 140 },
                        { bottom: -6, left: 30, borderTopColor: '#2C2C2C', borderTopWidth: 6 }
                    )}
                </TouchableOpacity>

                <View style={styles.verticalLine} />

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

                    {/* Footer Right Tooltip */}
                    {activeTooltip === 'footer-right' && renderTooltip(
                        "Suma total de todas tus cuentas bancarias.",
                        { bottom: 45, right: -10, width: 140 },
                        { bottom: -6, right: 30, borderTopColor: '#2C2C2C', borderTopWidth: 6 }
                    )}
                </TouchableOpacity>
            </View>
        </View>
    );
};

const localStyles = StyleSheet.create({
    tooltipContainer: {
        position: 'absolute',
        backgroundColor: '#2C2C2C',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 8,
        zIndex: 100,
    },
    tooltipText: {
        color: '#E5E7EB',
        fontSize: 11,
        lineHeight: 14,
        textAlign: 'center',
    },
    arrow: {
        position: 'absolute',
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderLeftWidth: 6,
        borderRightWidth: 6,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
    }
});
