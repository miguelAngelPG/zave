import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { colors, spacing } from '../../../../theme';
import { Text } from '../../../atoms/Text/Text';

export interface WeeklySpendWidgetProps {
    data: number[];
    maxSpend: number;
}

export const WeeklySpendWidget: React.FC<WeeklySpendWidgetProps> = ({ data, maxSpend }) => {
    return (
        <View style={[styles.card, styles.largeCard]}>
            <View style={styles.cardHeader}>
                <Ionicons name="bar-chart-outline" size={18} color={colors.dashboard.primary} />
                <Text style={styles.cardLabel}>Gasto Semanal</Text>
            </View>
            <View style={styles.chartContainer}>
                {data.map((amount, i) => (
                    <View key={i} style={styles.barContainer}>
                        <View style={[styles.bar, { height: `${(amount / maxSpend) * 100}%`, backgroundColor: i === 3 ? colors.dashboard.primaryFocus : colors.dashboard.chartInactive, opacity: i === 3 ? 1 : 0.7 }]} />
                    </View>
                ))}
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 4 }}>
                <Text style={styles.statUnit}>Lun</Text>
                <Text style={styles.statUnit}>Dom</Text>
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
    largeCard: {
        flexGrow: 1.5,
        flexBasis: '50%',
        height: 170,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 12
    },
    cardLabel: {
        color: colors.dashboard.primary,
        fontSize: 12,
        fontWeight: '700',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    chartContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        flex: 1,
        paddingBottom: 4
    },
    barContainer: {
        width: 8,
        height: '100%',
        justifyContent: 'flex-end',
    },
    bar: {
        width: '100%',
        borderRadius: 4,
    },
    statUnit: {
        color: colors.dashboard.textMuted,
        fontSize: 11,
        fontWeight: '500',
    },
});
