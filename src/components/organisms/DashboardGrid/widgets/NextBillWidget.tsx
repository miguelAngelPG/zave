import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { colors, spacing } from '../../../../theme';
import { Text } from '../../../atoms/Text/Text';

import { WidgetSize } from '../../../../context/DashboardContext';

export interface NextBillWidgetProps {
    name: string;
    amount: number;
    date: string;
    size?: WidgetSize;
}

export const NextBillWidget: React.FC<NextBillWidgetProps> = ({ name, amount, date, size = 'small' }) => {
    const isLarge = size === 'large';
    return (
        <View style={[styles.card, isLarge ? styles.largeCard : styles.smallCard]}>
            {isLarge ? (
                // Horizontal Layout for large
                <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1, justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                        <View style={[styles.iconBox, { width: 56, height: 56, backgroundColor: colors.dashboard.successBackground, borderColor: colors.dashboard.success }]}>
                            <Ionicons name="musical-notes" size={28} color={colors.dashboard.success} />
                        </View>
                        <View>
                            <Text style={[styles.billTitleCompact, { textAlign: 'left', fontSize: 16 }]}>{name}</Text>
                            <Text style={[styles.billDateCompact, { textAlign: 'left', fontSize: 14 }]}>{date}</Text>
                        </View>
                    </View>
                    <Text style={[styles.billAmountCompact, { fontSize: 24 }]}>${amount}</Text>
                </View>
            ) : (
                // Vertical Layout for small
                <>
                    <View style={[styles.iconBox, { width: 48, height: 48, marginBottom: 8, backgroundColor: colors.dashboard.successBackground, borderColor: colors.dashboard.success }]}>
                        <Ionicons name="musical-notes" size={24} color={colors.dashboard.success} />
                    </View>
                    <View>
                        <Text style={styles.billTitleCompact}>{name}</Text>
                        <Text style={styles.billDateCompact}>{date}</Text>
                        <Text style={styles.billAmountCompact}>${amount}</Text>
                    </View>
                </>
            )}
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
    smallCard: {
        flexGrow: 1,
        flexBasis: '47%',
        height: 170,
        backgroundColor: colors.dashboard.background,
        alignItems: 'center',
        justifyContent: 'center',
    },
    largeCard: {
        flexGrow: 1,
        flexBasis: '100%',
        height: 120, // slightly shorter for horizontal layout
        backgroundColor: colors.dashboard.background,
        justifyContent: 'center',
    },
    iconBox: {
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
    },
    billTitleCompact: {
        color: colors.dashboard.textPrimary,
        fontWeight: '700',
        fontSize: 14,
        textAlign: 'center',
        marginBottom: 2
    },
    billDateCompact: {
        color: colors.dashboard.danger,
        fontSize: 12,
        fontWeight: '600',
        textAlign: 'center',
        marginBottom: 4
    },
    billAmountCompact: {
        color: colors.dashboard.textPrimary,
        fontWeight: '700',
        fontSize: 16,
        textAlign: 'center',
    },
});
