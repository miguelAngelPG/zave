import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { colors, spacing } from '../../../../theme';
import { Text } from '../../../atoms/Text/Text';

export interface NextBillWidgetProps {
    name: string;
    amount: number;
    date: string;
}

export const NextBillWidget: React.FC<NextBillWidgetProps> = ({ name, amount, date }) => {
    return (
        <View style={[styles.card, styles.smallCard]}>
            <View style={[styles.iconBox, { width: 48, height: 48, marginBottom: 8, backgroundColor: colors.dashboard.successBackground, borderColor: colors.dashboard.success }]}>
                <Ionicons name="musical-notes" size={24} color={colors.dashboard.success} />
            </View>
            <View>
                <Text style={styles.billTitleCompact}>{name}</Text>
                <Text style={styles.billDateCompact}>{date}</Text>
                <Text style={styles.billAmountCompact}>${amount}</Text>
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
    smallCard: {
        flexGrow: 1,
        flexBasis: '35%',
        height: 170,
        backgroundColor: colors.dashboard.background,
        alignItems: 'center',
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
