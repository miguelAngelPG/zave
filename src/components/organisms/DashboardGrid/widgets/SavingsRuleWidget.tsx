import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { WidgetSize } from '../../../../context/DashboardContext';
import { colors, spacing } from '../../../../theme';
import { Text } from '../../../atoms/Text/Text';

export interface SavingsRuleWidgetProps {
    ruleName: string;
    savedAmount: number;
    size?: WidgetSize;
}

export const SavingsRuleWidget: React.FC<SavingsRuleWidgetProps> = ({ ruleName, savedAmount, size = { cols: 2, rows: 2 } }) => {
    const isSmall = size.cols <= 2;
    return (
        <View style={styles.card}>
            <View style={styles.iconContainer}>
                <Ionicons name="flash" size={isSmall ? 24 : 28} color={colors.dashboard.accentPink} />
            </View>
            <View style={{ flex: 1, justifyContent: 'flex-end', marginTop: 8 }}>
                <Text numberOfLines={1} adjustsFontSizeToFit style={styles.ruleName}>{ruleName}</Text>
                <Text numberOfLines={1} adjustsFontSizeToFit style={styles.savedAmount}>+${savedAmount} ahorrado</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        flex: 1,
        height: '100%',
        backgroundColor: colors.dashboard.card,
        borderRadius: 24,
        padding: spacing.md,
        borderWidth: 1.5,
        borderColor: colors.dashboard.accentPinkLight + '40',
    },
    iconContainer: {
        width: 48,
        height: 48,
        borderRadius: 16,
        backgroundColor: colors.dashboard.accentPinkLight + '20',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: colors.dashboard.accentPinkLight + '40',
    },
    ruleName: {
        color: colors.dashboard.textPrimary,
        fontSize: 15,
        fontWeight: '700',
        marginBottom: 4,
    },
    savedAmount: {
        color: colors.dashboard.success,
        fontSize: 13,
        fontWeight: '600',
    }
});
