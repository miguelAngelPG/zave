import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { View } from "@/components/ui/view";
import { useColor } from "@/hooks/useColor";
import { AccountData } from "@/src/types/accounts.types";
import { LinearGradient } from "expo-linear-gradient";
import { Zap } from "lucide-react-native";
import React from 'react';
import { ScrollView } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

export const AccountsSection = () => {
  const primaryColor = useColor('primary');
  const cardColor = useColor('card');

  const accountsData: AccountData[] = [
    {
      id: '1',
      name: 'BBVA',
      bankCode: 'BBVA',
      amount: 2450,
      dueInfo: 'Vence mañana',
      urgencyLevel: 'urgent',
      backgroundColor: '#0F172A', // Slate 900
      iconColor: '#FFFFFF',
    },
    {
      id: '2',
      name: 'Santander',
      bankCode: 'SAN',
      amount: 1890,
      dueInfo: 'Vence en 5 días',
      urgencyLevel: 'warning',
      backgroundColor: '#BE185D', // Pink 700
      iconColor: '#FFFFFF',
    },
    {
      id: '3',
      name: 'Nu',
      amount: 5420,
      bankCode: 'NU',
      dueInfo: 'Disponible',
      urgencyLevel: 'normal',
      backgroundColor: '#7C3AED', // Violet 600
      iconColor: '#FFFFFF',
    },
  ];

  return (
    <Animated.View entering={FadeInDown.delay(400).duration(600)} style={{ gap: 20 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text variant="title" style={{ fontSize: 22 }}>Mis Tarjetas</Text>
        <Button variant="ghost" size="sm" label="+ Añadir" textStyle={{ color: primaryColor, fontWeight: '700' }} style={{ backgroundColor: cardColor, borderRadius: 12, height: 32 }} />
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 20, paddingRight: 24 }} style={{ marginHorizontal: -24, paddingHorizontal: 24 }}>
        {accountsData.map((account) => (
          <LinearGradient
            key={account.id}
            colors={[account.backgroundColor, account.backgroundColor]}
            style={{
              width: 160,
              height: 200,
              borderRadius: 28,
              padding: 20,
              justifyContent: 'space-between',
              shadowColor: account.backgroundColor,
              shadowOffset: { width: 0, height: 10 },
              shadowOpacity: 0.3,
              shadowRadius: 18,
              elevation: 10
            }}
          >
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <Text style={{ color: 'white', fontWeight: '800', fontSize: 18, opacity: 0.9 }}>{account.bankCode}</Text>
              <Icon name={Zap} size={16} color="rgba(255,255,255,0.6)" />
            </View>

            <View style={{ gap: 6 }}>
              <Text style={{ color: 'rgba(255,255,255,0.6)', fontSize: 12, fontWeight: '600', letterSpacing: 2 }}>•••• 4829</Text>
              <Text style={{ color: 'white', fontSize: 24, fontWeight: '800', letterSpacing: -1 }}>${account.amount}</Text>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <View style={{ paddingHorizontal: 8, paddingVertical: 4, backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: 8 }}>
                <Text style={{ color: 'rgba(255,255,255,0.9)', fontSize: 10, fontWeight: '600' }}>{account.dueInfo}</Text>
              </View>
              {/* Simple Circle Logo */}
              <View style={{ flexDirection: 'row', marginRight: 4 }}>
                <View style={{ width: 14, height: 14, borderRadius: 7, backgroundColor: 'rgba(255,255,255,0.5)' }} />
                <View style={{ width: 14, height: 14, borderRadius: 7, backgroundColor: 'rgba(255,255,255,0.5)', marginLeft: -6 }} />
              </View>
            </View>
          </LinearGradient>
        ))}
      </ScrollView>
    </Animated.View>
  );
};