import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { View } from "@/components/ui/view";
import { Lock, Wallet } from "lucide-react-native";
import React from 'react';
import Animated, { FadeInDown } from "react-native-reanimated";

export const BalanceSection = () => {
  return (
    <Animated.View entering={FadeInDown.delay(200).duration(600)} style={{ gap: 24, marginTop: 10 }}>
      {/* Main "Safe to Spend" Display */}
      <View style={{ gap: 4, alignItems: 'center' }}>
        <Text style={{ color: '#94a3b8', fontSize: 13, fontWeight: '600', textTransform: 'uppercase', letterSpacing: 2 }}>
          Disponible Real
        </Text>
        <Text style={{ fontSize: 56, fontWeight: '800', color: 'white', letterSpacing: -2, lineHeight: 68 }}>
          $4,304
        </Text>
        <Text style={{ color: '#64748b', fontSize: 14, fontWeight: '500' }}>
          Libre para gastar hoy
        </Text>
      </View>

      {/* Breakdown Row */}
      <View style={{ flexDirection: 'row', gap: 12 }}>
        {/* Total Assets */}
        <View style={{ flex: 1, padding: 16, backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: 24, borderWidth: 1, borderColor: 'rgba(255,255,255,0.05)', gap: 12 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <View style={{ width: 32, height: 32, borderRadius: 10, backgroundColor: 'rgba(255,255,255,0.1)', alignItems: 'center', justifyContent: 'center' }}>
              <Icon name={Wallet} size={16} color="rgba(255,255,255,0.8)" />
            </View>
            <Text style={{ color: '#94a3b8', fontSize: 12, fontWeight: '600' }}>Total</Text>
          </View>
          <Text style={{ color: 'rgba(255,255,255,0.8)', fontWeight: '700', fontSize: 16 }}>$12,504</Text>
        </View>

        {/* Committed / Locked */}
        <View style={{ flex: 1, padding: 16, backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: 24, borderWidth: 1, borderColor: 'rgba(255,255,255,0.05)', gap: 12 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <View style={{ width: 32, height: 32, borderRadius: 10, backgroundColor: 'rgba(248, 113, 113, 0.15)', alignItems: 'center', justifyContent: 'center' }}>
              <Icon name={Lock} size={16} color="#f87171" />
            </View>
            <Text style={{ color: '#94a3b8', fontSize: 12, fontWeight: '600' }}>Comprometido</Text>
          </View>
          <Text style={{ color: 'rgba(255,255,255,0.8)', fontWeight: '700', fontSize: 16 }}>$8,200</Text>
        </View>
      </View>
    </Animated.View>
  );
};
