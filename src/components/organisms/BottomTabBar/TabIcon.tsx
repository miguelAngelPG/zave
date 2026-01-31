import React, { useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSequence, withSpring, withTiming, ZoomIn } from 'react-native-reanimated';
import { styles } from './LiquidTabBar.styles';

export const TabIcon = ({ icon: Icon, isFocused, color, onPress, disabled }: any) => {
    const scale = useSharedValue(1);

    useEffect(() => {
        if (isFocused) {
            // Little bounce effect when selected
            scale.value = withSequence(
                withTiming(1.2, { duration: 150 }),
                withSpring(1, { damping: 12 })
            );
        } else {
            scale.value = withSpring(1);
        }
    }, [isFocused]);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }]
    }));

    return (
        <TouchableOpacity onPress={onPress} disabled={disabled} style={styles.iconBtn} activeOpacity={0.7}>
            <Animated.View style={animatedStyle}>
                <Icon size={24} color={color} strokeWidth={isFocused ? 2.5 : 2} />
                {/* Optional Glow Dot for active state */}
                {isFocused && (
                    <Animated.View
                        entering={ZoomIn.duration(200)}
                        style={{
                            position: 'absolute',
                            bottom: -8,
                            alignSelf: 'center',
                            width: 4, height: 4, borderRadius: 2,
                            backgroundColor: color
                        }}
                    />
                )}
            </Animated.View>
        </TouchableOpacity>
    );
};
