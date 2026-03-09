import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { colors, spacing } from '../../../../theme';
import { Text } from '../../../atoms/Text/Text';

import { WidgetSize } from '../../../../context/DashboardContext';

export interface WeeklySpendWidgetProps {
    data: number[];
    maxSpend: number;
    size?: WidgetSize;
}

export const WeeklySpendWidget: React.FC<WeeklySpendWidgetProps> = ({ data, maxSpend, size = { cols: 4, rows: 2 } }) => {
    const isSmall = size.cols <= 2;
    return (
        <View style={[styles.card, isSmall ? styles.smallCard : styles.largeCard]}>
            <View style={styles.cardHeader}>
                <Ionicons name="bar-chart-outline" size={18} color={colors.dashboard.primary} />
                <Text numberOfLines={1} adjustsFontSizeToFit style={styles.cardLabel}>Gasto Semanal</Text>
            </View>
            <View style={styles.chartContainer}>
                {data.slice(isSmall ? -4 : 0).map((amount, i, arr) => {
                    const originalIndex = isSmall ? i + (data.length - 4) : i;
                    const isToday = originalIndex === 3; // mock today logic
                    return (
                        <View key={originalIndex} style={styles.barContainer}>
                            <View style={[styles.bar, { height: `${(amount / maxSpend) * 100}%`, backgroundColor: isToday ? colors.dashboard.primaryFocus : colors.dashboard.chartInactive, opacity: isToday ? 1 : 0.7 }]} />
                        </View>
                    );
                })}
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 4 }}>
                <Text style={styles.statUnit}>{isSmall ? 'Jue' : 'Lun'}</Text>
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
        flex: 1,
        height: '100%',
    },
    smallCard: {
        flex: 1,
        height: '100%',
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
