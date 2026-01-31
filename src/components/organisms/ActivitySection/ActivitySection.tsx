import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { View } from "@/components/ui/view";
import { useColor } from "@/hooks/useColor";
import { TransactionData } from "@/src/types/activity.types";
import React from 'react';
import { TouchableOpacity } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

export const ActivitySection = () => {
  const backgroundColor = useColor('background');
  const primaryColor = useColor('primary');
  const borderColor = useColor('border');

  const transactionsData: TransactionData[] = [
    {
      id: '1',
      name: 'Walmart Supercenter',
      amount: 1250,
      date: 'Hoy',
      time: '14:30',
      status: 'PAGADO',
      type: 'expense',
      emoji: '🛒',
    },
    {
      id: '2',
      name: 'Nómina Quincenal',
      amount: 15000,
      date: 'Ayer',
      time: '09:00',
      status: 'PAGADO',
      type: 'income',
      emoji: '💼',
      bankIndicatorColor: '#3B82F6',
    },
    {
      id: '3',
      name: 'Spotify Premium',
      amount: 129,
      date: 'Ayer',
      time: '18:20',
      status: 'PAGADO',
      type: 'expense',
      emoji: '🎵',
    },
    {
      id: '4',
      name: 'Uber Eats',
      amount: 245,
      date: 'Ayer',
      time: '20:15',
      status: 'PAGADO',
      type: 'expense',
      emoji: '🍔',
    },
  ];

  return (
    <Animated.View entering={FadeInDown.delay(600).duration(600)} style={{ gap: 24 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text variant="title" style={{ fontSize: 22 }}>Movimientos</Text>
        <Button variant="link" label="Ver todo" style={{ paddingHorizontal: 0 }} />
      </View>
      <Card style={{ padding: 0, borderRadius: 32, overflow: 'hidden' }}>
        <CardContent style={{ padding: 8 }}>
          {transactionsData.map((transaction, index) => (
            <View key={transaction.id}>
              <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', gap: 16, padding: 16 }}>
                <View style={{
                  width: 52, height: 52, borderRadius: 22,
                  backgroundColor: backgroundColor,
                  alignItems: 'center', justifyContent: 'center',
                  borderWidth: 1, borderColor: borderColor
                }}>
                  <Text style={{ fontSize: 24 }}>{transaction.emoji}</Text>
                </View>
                <View style={{ flex: 1, gap: 4 }}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text variant="body" style={{ fontWeight: '700', fontSize: 16 }}>{transaction.name}</Text>
                    <Text variant="body" style={{ fontWeight: '800', fontSize: 16, color: transaction.type === 'expense' ? primaryColor : '#10B981' }}>
                      {transaction.type === 'expense' ? '-' : '+'}${transaction.amount}
                    </Text>
                  </View>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text variant="caption" style={{ fontWeight: '500' }}>{transaction.date} • {transaction.time}</Text>
                    <Text variant="caption" style={{ fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.5 }}>{transaction.status}</Text>
                  </View>
                </View>
              </TouchableOpacity>
              {index < transactionsData.length - 1 && (
                <View style={{ height: 1, backgroundColor: borderColor, marginLeft: 82, opacity: 0.4 }} />
              )}
            </View>
          ))}
        </CardContent>
      </Card>
    </Animated.View>
  );
};
