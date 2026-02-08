import { BlurView } from 'expo-blur';
import React from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { Text } from '../../atoms/Text/Text';

interface PrivacyBlurOverlayProps {
    isVisible: Animated.AnimatedInterpolation<number>;
    content: string;
    textStyle?: any;
    containerStyle?: any;
    blurIntensity?: number;
    shadowRadius?: number;
    borderRadius?: number;
}

/**
 * PrivacyBlurOverlay - Molecular component for privacy blur effect
 * 
 * Creates a layered blur effect:
 * 1. Real content fades out
 * 2. Shadow text (blurred) fades in
 * 3. Glass overlay for premium finish
 */
export const PrivacyBlurOverlay: React.FC<PrivacyBlurOverlayProps> = ({
    isVisible,
    content,
    textStyle,
    containerStyle,
    blurIntensity = 50,
    shadowRadius = 16,
    borderRadius = 8,
}) => {
    return (
        <View style={[styles.container, containerStyle]}>
            {/* 1. REAL CONTENT (Fades Out) */}
            <Animated.View
                style={{
                    opacity: isVisible.interpolate({
                        inputRange: [0, 1],
                        outputRange: [1, 0]
                    })
                }}
            >
                <Text style={textStyle}>{content}</Text>
            </Animated.View>

            {/* 2. SHADOW BLUR TEXT (Fades In) */}
            <Animated.View
                pointerEvents="none"
                style={[
                    StyleSheet.absoluteFill,
                    {
                        opacity: isVisible,
                        justifyContent: 'center',
                        alignItems: 'center',
                    },
                ]}
            >
                <Text
                    style={[
                        textStyle,
                        {
                            color: 'transparent',
                            textShadowColor: 'rgba(255,255,255,0.9)',
                            textShadowOffset: { width: 0, height: 0 },
                            textShadowRadius: shadowRadius,
                        },
                    ]}
                >
                    {content}
                </Text>
            </Animated.View>

            {/* 3. GLASS OVERLAY */}
            <Animated.View
                pointerEvents="none"
                style={[
                    StyleSheet.absoluteFill,
                    {
                        opacity: isVisible,
                        zIndex: 10,
                        borderRadius,
                        overflow: 'hidden',
                    },
                ]}
            >
                <BlurView
                    intensity={blurIntensity}
                    tint="dark"
                    style={StyleSheet.absoluteFill}
                />
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
