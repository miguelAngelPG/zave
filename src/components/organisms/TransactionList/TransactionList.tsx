import { Text } from "@/components/ui/text";
import { View } from "@/components/ui/view";
import { useColor } from "@/hooks/useColor";
import { Coffee, ShoppingBag, Zap } from "lucide-react-native";
import React from 'react';
import { StyleSheet } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

export const TransactionList = () => {
    const cardColor = useColor('card');
    const primaryColor = useColor('primary');

    const transactions = [
        { id: '1', title: 'Starbucks', category: 'Coffee', amount: -45.00, date: 'Hoy, 9:41 AM', icon: Coffee, color: '#d97706' },
        { id: '2', title: 'Apple Store', category: 'Gadgets', amount: -2499.00, date: 'Ayer', icon: ShoppingBag, color: '#2563EB' },
        { id: '3', title: 'Electricidad', category: 'Bills', amount: -650.50, date: 'Ayer', icon: Zap, color: '#EAB308' },
    ];

    return (
        <Animated.View entering={FadeInDown.delay(400).duration(600)} style={{ gap: 16 }}>
            <View style={styles.header}>
                <Text variant="title" style={{ fontSize: 18 }}>Recientes</Text>
                <Text variant="caption" style={{ color: primaryColor, fontWeight: '600' }}>Ver todo</Text>
            </View>

            <View style={{ gap: 12 }}>
                {transactions.map((tx, index) => (
                    <Animated.View
                        key={tx.id}
                        entering={FadeInDown.delay(500 + (index * 100)).duration(500)}
                        style={[styles.row, {}]}
                    >
                        {/* ICON */}
                        <View style={[styles.iconBox, { backgroundColor: `${tx.color}20` }]}>
                            <tx.icon size={20} color={tx.color} />
                        </View>

                        {/* INFO */}
                        <View style={{ flex: 1, gap: 2 }}>
                            <Text style={styles.title}>{tx.title}</Text>
                            <Text style={styles.date}>{tx.date}</Text>
                        </View>

                        {/* AMOUNT */}
                        <Text style={[styles.amount, { color: tx.amount > 0 ? '#10B981' : undefined }]}>
                            {tx.amount < 0 ? `-$${Math.abs(tx.amount)}` : `+$${tx.amount}`}
                        </Text>
                    </Animated.View>
                ))}
            </View>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
        padding: 16,
        borderRadius: 20,
        backgroundColor: 'rgba(255,255,255,0.03)', // Very subtle glass
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.05)',
    },
    iconBox: {
        width: 44,
        height: 44,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 15,
        fontWeight: '600',
        color: 'white',
    },
    date: {
        fontSize: 12,
        color: 'rgba(255,255,255,0.5)',
    },
    amount: {
        fontSize: 16,
        fontWeight: '600',
        color: 'white',
    }
});
