import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { colors, spacing } from '../../../theme';
import { Text } from '../../atoms/Text/Text';
import { PrivacyBlurOverlay } from '../PrivacyBlurOverlay/PrivacyBlurOverlay';

interface BalanceFooterStatProps {
    icon: keyof typeof Ionicons.glyphMap;
    label: string;
    value: string;
    blurOpacity?: Animated.AnimatedInterpolation<number>;
}

/**
 * BalanceFooterStat - Molecular component for balance footer statistics
 * 
 * Displays financial stats with icon, label, and optional privacy blur
 */
export const BalanceFooterStat: React.FC<BalanceFooterStatProps> = ({
    icon,
    label,
    value,
    blurOpacity,
}) => {
    return (
        <View style={styles.container}>
            <View style={styles.iconRow}>
                <Ionicons name={icon} size={12} color={colors.text.tertiary} />
                <Text style={styles.label}>{label}</Text>
            </View>

            {blurOpacity ? (
                <PrivacyBlurOverlay
                    isVisible={blurOpacity}
                    content={value}
                    textStyle={styles.value}
                    containerStyle={styles.valueContainer}
                    blurIntensity={50}
                    shadowRadius={16}
                    borderRadius={4}
                />
            ) : (
                <Text style={styles.value}>{value}</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    iconRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.xs,
        marginBottom: spacing.xs,
    },
    label: {
        fontSize: 11,
        color: colors.text.tertiary,
        fontWeight: '500',
        letterSpacing: 0.5,
        textTransform: 'uppercase',
    },
    valueContainer: {
        minWidth: 60,
        alignItems: 'center',
    },
    value: {
        fontSize: 16,
        fontWeight: '600',
        color: colors.text.primary,
    },
});
