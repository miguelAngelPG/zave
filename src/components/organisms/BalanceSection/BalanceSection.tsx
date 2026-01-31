import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { View } from "@/components/ui/view";
import { LinearGradient } from "expo-linear-gradient";
import { ArrowDownLeft, ArrowUpRight, Wallet } from "lucide-react-native";
import React from 'react';
import Animated, { FadeInDown } from "react-native-reanimated";

export const BalanceSection = () => {
  return (
    <Animated.View entering={FadeInDown.delay(200).duration(600)}>
      <LinearGradient
        colors={['#020617', '#1e293b', '#0f172a']} // Richer dark gradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          borderRadius: 32, padding: 32,
          shadowColor: "#020617", shadowOffset: { width: 0, height: 16 }, shadowOpacity: 0.4, shadowRadius: 32, elevation: 16,
          borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)'
        }}
      >
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 32 }}>
          <View>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 8 }}>
              <Text style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13, fontWeight: '700', letterSpacing: 1, textTransform: 'uppercase' }}>Balance Total</Text>
              <View style={{ backgroundColor: 'rgba(34, 197, 94, 0.2)', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 }}>
                <Text style={{ color: '#4ade80', fontSize: 10, fontWeight: '700' }}>+2.4%</Text>
              </View>
            </View>
            <Text style={{ fontSize: 44, fontWeight: '900', color: 'white', letterSpacing: -2 }}>$5,247.00</Text>
          </View>
          <View style={{ width: 52, height: 52, borderRadius: 26, backgroundColor: 'rgba(255,255,255,0.1)', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' }}>
            <Icon name={Wallet} size={24} color="white" />
          </View>
        </View>

        <View style={{ flexDirection: 'row', gap: 16 }}>
          <View style={{ flex: 1, backgroundColor: 'rgba(255,255,255,0.03)', padding: 16, borderRadius: 20, flexDirection: 'row', alignItems: 'center', gap: 12, borderWidth: 1, borderColor: 'rgba(255,255,255,0.05)' }}>
            <View style={{ width: 36, height: 36, borderRadius: 12, backgroundColor: 'rgba(16, 185, 129, 0.15)', alignItems: 'center', justifyContent: 'center' }}>
              <Icon name={ArrowDownLeft} size={20} color="#34D399" />
            </View>
            <View>
              <Text style={{ color: 'rgba(255,255,255,0.5)', fontSize: 11, fontWeight: '500' }}>Ingresos</Text>
              <Text style={{ color: 'white', fontWeight: '700', fontSize: 15 }}>$8,240</Text>
            </View>
          </View>
          <View style={{ flex: 1, backgroundColor: 'rgba(255,255,255,0.03)', padding: 16, borderRadius: 20, flexDirection: 'row', alignItems: 'center', gap: 12, borderWidth: 1, borderColor: 'rgba(255,255,255,0.05)' }}>
            <View style={{ width: 36, height: 36, borderRadius: 12, backgroundColor: 'rgba(244, 63, 94, 0.15)', alignItems: 'center', justifyContent: 'center' }}>
              <Icon name={ArrowUpRight} size={20} color="#FB7185" />
            </View>
            <View>
              <Text style={{ color: 'rgba(255,255,255,0.5)', fontSize: 11, fontWeight: '500' }}>Gastos</Text>
              <Text style={{ color: 'white', fontWeight: '700', fontSize: 15 }}>$2,993</Text>
            </View>
          </View>
        </View>
      </LinearGradient>
    </Animated.View>
  );
};
