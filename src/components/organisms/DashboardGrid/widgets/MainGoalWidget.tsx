import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { colors, spacing } from '../../../../theme';
import { Text } from '../../../atoms/Text/Text';

export interface MainGoalWidgetProps {
    name: string;
    current: number;
    target: number;
    percentage: number;
}

export const MainGoalWidget: React.FC<MainGoalWidgetProps> = ({ name, current, target, percentage }) => {
    return (
        <View style={[styles.card, styles.wideCard]}>
            <View style={{ flex: 1, gap: 6 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                        <Ionicons name="airplane" size={16} color={colors.dashboard.accentPinkLight} />
                        <Text style={styles.goalTitle}>{name}</Text>
                    </View>
                    <Text style={styles.goalPercent}>{percentage}%</Text>
                </View>
                <View style={styles.progressBg}>
                    <View style={[styles.progressFill, { width: `${percentage}%` }]} />
                </View>
                <Text style={styles.goalAmount}>${current.toLocaleString()} / ${target.toLocaleString()}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.dashboard.card,
        borderRadius: 24,
        padding: spacing.md,
        borderWidth: 1.5,
        borderColor: colors.dashboard.border,
        justifyContent: 'space-between',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6,
    },
    wideCard: {
        flexGrow: 1,
        flexBasis: '100%',
        paddingVertical: 16,
    },
    goalTitle: {
        color: colors.dashboard.textPrimary,
        fontWeight: '700',
        fontSize: 15,
    },
    goalPercent: {
        color: colors.dashboard.accentPinkLight,
        fontWeight: '700',
        fontSize: 14,
    },
    progressBg: {
        height: 8,
        backgroundColor: colors.dashboard.border, // re-use border 'rgba(255,255,255,0.1)'
        borderRadius: 4,
        width: '100%',
        overflow: 'hidden',
    },
    progressFill: {
        height: '100%',
        backgroundColor: colors.dashboard.accentPink,
        borderRadius: 4,
    },
    goalAmount: {
        color: colors.dashboard.textSecondary,
        fontSize: 12,
        fontWeight: '500',
        marginTop: 2,
    }
});
