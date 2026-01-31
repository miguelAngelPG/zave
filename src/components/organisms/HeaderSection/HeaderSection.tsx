import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Text } from "@/components/ui/text";
import { View } from "@/components/ui/view";
import { LinearGradient } from "expo-linear-gradient";
import { Sparkles } from "lucide-react-native";
import React, { useEffect } from 'react';
import { TouchableOpacity } from "react-native";
import Animated, { FadeInDown, useAnimatedStyle, useSharedValue, withRepeat, withSequence, withTiming } from "react-native-reanimated";

export const HeaderSection = ({ onAvatarPress }: { onAvatarPress?: () => void }) => {
    // Breathing animation for the AI Ring
    const glowOpacity = useSharedValue(0.5);

    useEffect(() => {
        glowOpacity.value = withRepeat(
            withSequence(
                withTiming(1, { duration: 2000 }),
                withTiming(0.5, { duration: 2000 })
            ),
            -1,
            true
        );
    }, []);

    const animatedGlow = useAnimatedStyle(() => ({
        opacity: glowOpacity.value
    }));

    return (
        <Animated.View
            entering={FadeInDown.delay(100).duration(600)}
            style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}
        >
            <TouchableOpacity style={{ gap: 4 }} onPress={onAvatarPress}>
                <Text variant="caption" style={{ textTransform: 'uppercase', letterSpacing: 0.5, fontWeight: '600' }}>Lunes, 27 Enero</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                    <Text variant="heading" style={{ letterSpacing: -1 }}>Hola, Carlos</Text>
                    <Sparkles size={20} color="#FBBF24" fill="#FBBF24" />
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={{ padding: 4 }} onPress={onAvatarPress}>
                <Animated.View style={[animatedGlow]}>
                    <LinearGradient
                        colors={['#7C3AED', '#2563EB']} // AI Gradient Ring
                        style={{ padding: 2, borderRadius: 99 }}
                    >
                        <View style={{ padding: 2, backgroundColor: 'white', borderRadius: 99 }}>
                            <Avatar style={{ width: 48, height: 48 }}>
                                <AvatarImage source={{ uri: "https://github.com/shadcn.png" }} />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                        </View>
                    </LinearGradient>
                </Animated.View>
                {/* Online/Status Indicator - Green for AI Ready */}
                <View style={{ position: 'absolute', bottom: 6, right: 6, width: 14, height: 14, borderRadius: 7, backgroundColor: '#10B981', borderWidth: 2, borderColor: '#fff', zIndex: 10 }} />
            </TouchableOpacity>
        </Animated.View>
    );
};
