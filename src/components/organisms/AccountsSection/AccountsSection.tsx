import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { View } from "@/components/ui/view";
import { useColor } from "@/hooks/useColor";
import { AccountData } from "@/src/types/accounts.types";
import { LinearGradient } from "expo-linear-gradient";
import { Nfc, Plus } from "lucide-react-native";
import React from 'react';
import { ScrollView, StyleSheet } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { styles } from "./AccountsSection.styles";

export const AccountsSection = () => {
  const primaryColor = useColor('primary');
  const cardColor = useColor('card');

  const accountsData: AccountData[] = [
    {
      id: '1',
      name: 'BBVA',
      bankCode: 'BBVA',
      amount: 2450,
      dueInfo: 'Mañana',
      urgencyLevel: 'urgent',
      backgroundColor: '#1e3a8a',
      gradient: ['#2563EB', '#1e3a8a'], // Blue Glass
      iconColor: '#FFFFFF',
    },
    {
      id: '2',
      name: 'Santander',
      bankCode: 'SAN',
      amount: 1890,
      dueInfo: '5 días',
      urgencyLevel: 'warning',
      backgroundColor: '#be123c',
      gradient: ['#F43F5E', '#9F1239'], // Red Glass
      iconColor: '#FFFFFF',
    },
    {
      id: '3',
      name: 'Nu',
      amount: 5420,
      bankCode: 'NU',
      dueInfo: 'Al día',
      urgencyLevel: 'normal',
      backgroundColor: '#7e22ce',
      gradient: ['#A855F7', '#6B21A8'], // Purple Glass
      iconColor: '#FFFFFF',
    },
  ];

  return (
    <Animated.View entering={FadeInDown.delay(300).duration(600)} style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text variant="title" style={{ fontSize: 20 }}>Mis Tarjetas</Text>
        <Button
          variant="ghost"
          size="icon"
          icon={Plus}
          style={styles.addButton}
        />
      </View>

      {/* Horizontal Cards Scroll */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        style={styles.scrollStyle}
      >
        {accountsData.map((account) => (
          <Animated.View key={account.id} style={styles.cardContainer}>
            <LinearGradient
              colors={account.gradient || [account.backgroundColor, account.backgroundColor]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={[styles.card, { shadowColor: account.gradient ? account.gradient[0] : account.backgroundColor }]}
            >
              {/* Top Row: Chip & Contactless */}
              <View style={styles.topRow}>
                <View style={styles.chip} />
                <Nfc size={20} color="rgba(255,255,255,0.6)" />
              </View>

              {/* Middle: Number & Amount */}
              <View style={styles.cardMiddle}>
                <Text style={styles.fieldLabel}>{account.bankCode}</Text>
                <Text style={styles.amount}>${account.amount}</Text>
                <Text style={styles.cardNumber}>•••• 4829</Text>
              </View>

              {/* Bottom: Date & Logo */}
              <View style={styles.cardBottom}>
                <View style={styles.dateBadge}>
                  <Text style={styles.dateText}>{account.dueInfo}</Text>
                </View>
                {/* Master/Visa Logo Simulation */}
                <View style={styles.logoContainer}>
                  <View style={[styles.circle, { backgroundColor: 'rgba(255,255,255,0.5)' }]} />
                  <View style={[styles.circle, { backgroundColor: 'rgba(255,255,255,0.5)', marginLeft: -8 }]} />
                </View>
              </View>

              {/* Glass Reflection Overlay */}
              <LinearGradient
                colors={['rgba(255,255,255,0.15)', 'transparent']}
                style={StyleSheet.absoluteFill}
                pointerEvents="none"
              />
            </LinearGradient>
          </Animated.View>
        ))}
      </ScrollView>
    </Animated.View>
  );
};