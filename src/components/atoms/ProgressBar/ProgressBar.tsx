import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withDelay, withTiming } from 'react-native-reanimated';

export interface ProgressBarProps {
    percentage: number;
    colorStart: string;
    colorEnd: string;
    height?: number;
    style?: ViewStyle;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
    percentage,
    colorStart,
    colorEnd,
    height = 6,
    style,
}) => {
    const width = useSharedValue(0);
    const targetWidth = Math.min(Math.max(percentage, 0), 100);

    useEffect(() => {
        width.value = 0;
        width.value = withDelay(100, withTiming(targetWidth, { duration: 1500 }));
    }, [percentage, targetWidth]); // Added targetWidth to dep array for correctness

    const animatedStyle = useAnimatedStyle(() => {
        return {
            width: `${width.value}%`,
        };
    });

    return (
        <View style={[styles.container, { height }, style]}>
            <View style={styles.background} />
            <Animated.View style={[styles.fill, animatedStyle]}>
                <LinearGradient
                    colors={[colorStart, colorEnd]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.gradient}
                />
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '60%', // Default width, can be overridden by style prop
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: 3, // Half of default height
        overflow: 'hidden',
        alignSelf: 'center',
    },
    background: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(255,255,255,0.05)',
    },
    fill: {
        height: '100%',
        borderRadius: 3,
    },
    gradient: {
        flex: 1,
    },
});
