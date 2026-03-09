import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { WidgetSize } from '../../../../context/DashboardContext';
import { colors, spacing } from '../../../../theme';
import { Text } from '../../../atoms/Text/Text';

export interface RecentTransactionsWidgetProps {
    transactions: { id: string; name: string; amount: number; isExpense: boolean }[];
    size?: WidgetSize;
}

export const RecentTransactionsWidget: React.FC<RecentTransactionsWidgetProps> = ({ transactions, size = { cols: 4, rows: 2 } }) => {
    const isSmall = size.cols <= 2;
    // max to show: 1 for 2x2, 2 for 4x2, up to 4 for taller widgets
    const displayCount = size.rows >= 4 ? (isSmall ? 3 : 4) : (isSmall ? 1 : 2);

    return (
        <View style={styles.card}>
            <View style={styles.cardHeader}>
                <Ionicons name="receipt-outline" size={18} color={colors.dashboard.primaryFocus} />
                <Text numberOfLines={1} adjustsFontSizeToFit style={styles.cardLabel}>Movimientos</Text>
            </View>
            <View style={styles.list}>
                {transactions.slice(0, displayCount).map(t => (
                    <View key={t.id} style={styles.transactionItem}>
                        <View style={styles.iconBox}>
                            <Ionicons name={t.isExpense ? "cart" : "wallet"} size={16} color={colors.dashboard.textSecondary} />
                        </View>
                        <View style={{ flex: 1, marginRight: 8 }}>
                            <Text numberOfLines={1} style={styles.transactionName}>{t.name}</Text>
                        </View>
                        <Text numberOfLines={1} style={[styles.transactionAmount, { color: t.isExpense ? colors.dashboard.textPrimary : colors.dashboard.success }]}>
                            {t.isExpense ? '-' : '+'}${Math.abs(t.amount)}
                        </Text>
                    </View>
                ))}
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
        color: colors.dashboard.primaryFocus,
        fontSize: 12,
        fontWeight: '700',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    list: {
        flex: 1,
        gap: 12,
        justifyContent: 'flex-start',
    },
    transactionItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconBox: {
        width: 32,
        height: 32,
        borderRadius: 10,
        backgroundColor: colors.dashboard.background,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 8,
        borderWidth: 1,
        borderColor: colors.dashboard.border,
    },
    transactionName: {
        color: colors.dashboard.textPrimary,
        fontSize: 14,
        fontWeight: '600',
    },
    transactionAmount: {
        fontSize: 14,
        fontWeight: '700',
    }
});
