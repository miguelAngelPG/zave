import { View } from "@/components/ui/view";
import { useColor } from "@/hooks/useColor";
import { AccountsSection } from "@/src/components/organisms/AccountsSection/AccountsSection";
import { ActivitySection } from "@/src/components/organisms/ActivitySection/ActivitySection";
import { BalanceSection } from "@/src/components/organisms/BalanceSection/BalanceSection";
import { HeaderSection } from "@/src/components/organisms/HeaderSection/HeaderSection";
import { QuickActions } from "@/src/components/organisms/QuickActions/QuickActions";
import { LinearGradient } from "expo-linear-gradient";
import React from 'react';
import { ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const backgroundColor = useColor('background');

  return (
    <View style={{ flex: 1, backgroundColor }}>
      {/* Background Gradient */}
      <LinearGradient
        colors={['rgba(37, 99, 235, 0.05)', 'transparent', 'rgba(124, 58, 237, 0.05)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFillObject}
        pointerEvents="none"
      />

      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ padding: 24, paddingBottom: 110, gap: 36 }}
          showsVerticalScrollIndicator={false}
        >
          <HeaderSection />
          <BalanceSection />
          <QuickActions />
          <AccountsSection />
          <ActivitySection />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
