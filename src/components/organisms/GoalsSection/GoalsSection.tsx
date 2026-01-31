import { Text } from "@/components/ui/text";
import { View } from "@/components/ui/view";
import { Target } from "lucide-react-native";
import React from 'react';
import Animated, { FadeInDown } from "react-native-reanimated";

export const GoalsSection = () => {
    return (
        <Animated.View entering={FadeInDown.delay(300).duration(600)} style={{ gap: 16 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text variant="title" style={{ fontSize: 18 }}>Monthly Goal</Text>
                <Target size={18} color="#94a3b8" />
            </View>

            <View style={{ padding: 20, backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: 24, borderWidth: 1, borderColor: 'rgba(255,255,255,0.05)', gap: 16 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                    <View style={{ gap: 4 }}>
                        <Text style={{ color: '#94a3b8', fontSize: 13, fontWeight: '500' }}>New Macbook Pro</Text>
                        <Text style={{ fontSize: 24, fontWeight: '700', color: 'white' }}>$1,850 <Text style={{ fontSize: 16, color: '#64748b' }}>/ $2,400</Text></Text>
                    </View>
                    <View style={{ backgroundColor: 'rgba(56, 189, 248, 0.1)', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 100 }}>
                        <Text style={{ color: '#38bdf8', fontSize: 12, fontWeight: '700' }}>77%</Text>
                    </View>
                </View>

                {/* Progress Bar */}
                <View style={{ height: 8, backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 100, overflow: 'hidden' }}>
                    <View style={{ width: '77%', height: '100%', backgroundColor: '#38bdf8', borderRadius: 100 }} />
                </View>

                <Text style={{ fontSize: 12, color: '#64748b' }}>
                    You are on track to reach your goal by March 15.
                </Text>
            </View>
        </Animated.View>
    );
};
