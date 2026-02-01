import { Text } from "@/components/ui/text";
import { View } from "@/components/ui/view";
import { LinearGradient } from "expo-linear-gradient";
import { Activity, ChevronDown, Lock, Wallet } from "lucide-react-native";
import React, { useState } from 'react';
import { Pressable } from 'react-native';
import Animated, { useAnimatedStyle, withSpring, withTiming } from "react-native-reanimated";
import { PHYSICS } from "../../../theme/animations";

// Calculated heights for manual animation control (Like LiquidTabBar)
const IDLE_HEIGHT = 110;
const EXPANDED_HEIGHT = 300;

export const BalanceSection = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  // 1. Manual Height Animation (Exactly like LiquidTabBar)
  const containerStyle = useAnimatedStyle(() => {
    return {
      height: withSpring(isExpanded ? EXPANDED_HEIGHT : IDLE_HEIGHT, PHYSICS.JELLY),
    };
  });

  // 2. Chevron Rotation
  const chevronStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: withSpring(isExpanded ? '180deg' : '0deg', PHYSICS.JELLY) }],
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

          {/* EXPANDED CONTENT (Absolute-like positioning or just flow) */}
          <Animated.View style={[{ marginTop: 30, gap: 16 }, expandedContentStyle]}>

            {/* Divider */}
            <View style={{ height: 1, backgroundColor: 'rgba(255,255,255,0.1)', marginBottom: 4 }} />

            {/* Breakdown */}
            <View style={{ gap: 16 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                  <Wallet size={14} color="#94a3b8" />
                  <Text style={{ color: '#94a3b8', fontSize: 13, fontWeight: '500' }}>Total Assets</Text>
                </View>
                <Text style={{ color: 'white', fontSize: 14, fontWeight: '700' }}>$12,504</Text>
              </View>

              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                  <Lock size={14} color="#f43f5e" />
                  <Text style={{ color: '#f43f5e', fontSize: 13, fontWeight: '500' }}>Comprometido</Text>
                </View>
                <Text style={{ color: '#f43f5e', fontSize: 14, fontWeight: '700' }}>- $8,200</Text>
              </View>

              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={{ color: '#cbd5e1', fontSize: 13, fontWeight: '500' }}>Diario Restante</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                  <Text style={{ color: '#4ade80', fontSize: 14, fontWeight: '700' }}>$30.00</Text>
                  <Activity size={12} color="#4ade80" />
                </View>
              </View>
            </View>

          </Animated.View>

        </LinearGradient>
      </Pressable>
    </Animated.View>
  );
};
