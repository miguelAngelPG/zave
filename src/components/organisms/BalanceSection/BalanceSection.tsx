import { Text } from "@/components/ui/text";
import { View } from "@/components/ui/view";
import { LinearGradient } from "expo-linear-gradient";
import { CheckCircle, ChevronDown, Lock, Wallet } from "lucide-react-native";
import React, { useState } from 'react';
import { Pressable } from 'react-native';
import Animated, { useAnimatedStyle, withSpring, withTiming } from "react-native-reanimated";
import { PHYSICS } from "../../../theme/animations";

// Calculated heights for manual animation control (Like LiquidTabBar)
const IDLE_HEIGHT = 110;

export const BalanceSection = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [measuredHeight, setMeasuredHeight] = useState(0);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  // 1. Manual Height Animation (Responsive to content)
  const containerStyle = useAnimatedStyle(() => {
    const targetHeight = isExpanded ? (IDLE_HEIGHT + measuredHeight + 50) : IDLE_HEIGHT;
    return {
      height: withSpring(targetHeight, PHYSICS.FLUID),
    };
  });

  // 2. Chevron Rotation
  const chevronStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: withSpring(isExpanded ? '180deg' : '0deg', PHYSICS.FLUID) }],
    };
  });

  // 3. Opacity for Daily Context (Right side) - Hides when expanding
  const dailyContextStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(isExpanded ? 0 : 1, { duration: 200 }),
      transform: [{ translateX: withTiming(isExpanded ? 20 : 0, { duration: 200 }) }]
    };
  });

  // 4. Opacity for Expanded Content - Shows when expanded
  const expandedContentStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(isExpanded ? 1 : 0, { duration: 300 }),
      transform: [{ translateY: withTiming(isExpanded ? 0 : 10, { duration: 300 }) }]
    };
  });

  return (
    <Animated.View style={[{ marginTop: 10, overflow: 'hidden', borderRadius: 24 }, containerStyle]}>
      <Pressable onPress={toggleExpand} style={({ pressed }) => ({ flex: 1, transform: [{ scale: pressed ? 0.99 : 1 }] })}>
        <LinearGradient
          colors={['#0f172a', '#334155']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{
            flex: 1,
            padding: 20,
            borderWidth: 1,
            borderColor: 'rgba(255,255,255,0.1)',
          }}
        >
          {/* IDLE ROW CONTENT */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>

            {/* LEFT: Main Balance */}
            <View style={{ gap: 4 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                <Text style={{ color: '#94a3b8', fontSize: 12, fontWeight: '600', letterSpacing: 1 }}>DISPONIBLE</Text>
                <Animated.View
                  style={{
                    backgroundColor: 'rgba(34, 197, 94, 0.1)',
                    paddingHorizontal: 6,
                    paddingVertical: 2,
                    borderRadius: 100,
                    opacity: isExpanded ? 0 : 1
                  }}
                >
                  <Text style={{ color: '#4ade80', fontSize: 9, fontWeight: '700' }}>LIVE</Text>
                </Animated.View>
              </View>
              <Text style={{ fontSize: 36, fontWeight: '800', color: 'white', letterSpacing: -1 }}>
                $4,304
              </Text>
            </View>

            {/* RIGHT: Daily Context (Absolute to prevent layout shifts) */}
            <Animated.View style={[{ position: 'absolute', right: 0, top: 8, alignItems: 'flex-end', gap: 6 }, dailyContextStyle]}>
              <Text style={{ color: '#cbd5e1', fontSize: 11, fontWeight: '600' }}>Diario: $120 / $150</Text>
              <View style={{ width: 80, height: 6, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 10 }}>
                <View style={{ width: '80%', height: '100%', backgroundColor: '#4ade80', borderRadius: 10 }} />
              </View>
            </Animated.View>

            {/* Toggle Indicator */}
            <Animated.View style={[{ position: 'absolute', right: 0, bottom: 0, opacity: 0.5 }, chevronStyle]}>
              <ChevronDown size={20} color="white" />
            </Animated.View>
          </View>

          {/* EXPANDED CONTENT (Responsive Layout Measurement) */}
          <Animated.View
            onLayout={(e) => setMeasuredHeight(e.nativeEvent.layout.height)}
            style={[{ marginTop: 30, gap: 16 }, expandedContentStyle]}
          >

            {/* Breakdown */}
            <View style={{ gap: 24 }}>

              {/* 1. VISUAL CONTEXT BAR (Instant Understanding) */}
              <View style={{ gap: 8 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={{ color: '#94a3b8', fontSize: 11, fontWeight: '600', letterSpacing: 0.5 }}>COMPOSICIÓN DE TU SALDO</Text>
                </View>

                <View style={{ height: 8, backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 10, overflow: 'hidden', flexDirection: 'row' }}>
                  {/* Red: Ocupado */}
                  <View style={{ flex: 0.65, backgroundColor: '#f43f5e', opacity: 0.9 }} />
                  {/* Green: Libre */}
                  <View style={{ flex: 0.35, backgroundColor: '#4ade80' }} />
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={{ color: '#f43f5e', fontSize: 10, fontWeight: '700' }}>65% YA TIENE DUEÑO ($8k)</Text>
                  <Text style={{ color: '#4ade80', fontSize: 10, fontWeight: '700' }}>35% ES TUYO ($4k)</Text>
                </View>
              </View>

              {/* 2. CONVERSATIONAL MATH LIST */}
              <View style={{ gap: 16 }}>
                {/* Row 1: The Fact */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                    <Wallet size={16} color="#94a3b8" />
                    <Text style={{ color: '#cbd5e1', fontSize: 14 }}>Tienes en Banco</Text>
                  </View>
                  <Text style={{ color: '#cbd5e1', fontSize: 14, fontWeight: '500' }}>$12,504</Text>
                </View>

                {/* Row 2: The Deduction */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                    <Lock size={16} color="#f43f5e" />
                    <View>
                      <Text style={{ color: '#fca5a5', fontSize: 14 }}>Menos: Pagos Fijos</Text>
                    </View>
                  </View>
                  <Text style={{ color: '#fca5a5', fontSize: 14, fontWeight: '600' }}>- $8,200</Text>
                </View>

                {/* Divider */}
                <View style={{ height: 1, backgroundColor: 'rgba(255,255,255,0.1)' }} />

                {/* Row 3: The Result */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                    <CheckCircle size={16} color="#4ade80" />
                    <Text style={{ color: 'white', fontSize: 14, fontWeight: '600' }}>Te quedan Libres</Text>
                  </View>
                  <Text style={{ color: 'white', fontSize: 15, fontWeight: '700' }}>$4,304</Text>
                </View>
              </View>

              {/* 3. DAILY ACTION (Highlighted) */}
              <View style={{ backgroundColor: 'rgba(74, 222, 128, 0.05)', borderRadius: 12, padding: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderWidth: 1, borderColor: 'rgba(74, 222, 128, 0.1)' }}>
                <View style={{ gap: 2 }}>
                  <Text style={{ color: '#4ade80', fontSize: 12, fontWeight: '700', letterSpacing: 0.5 }}>PRESUPUESTO PARA HOY</Text>
                  <Text style={{ color: '#86efac', fontSize: 11 }}>($4,304 disponibles ÷ 12 días restantes)</Text>
                </View>
                <Text style={{ color: '#4ade80', fontSize: 18, fontWeight: '800' }}>$358</Text>
              </View>

            </View>

          </Animated.View>

        </LinearGradient>
      </Pressable>
    </Animated.View>
  );
};
