import React from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { Text } from '../../atoms/Text/Text';

interface BalanceTooltipProps {
    isVisible: boolean;
    fadeAnim: Animated.Value;
    text: string;
    style?: any;
    arrowStyle?: any;
}

/**
 * BalanceTooltip - Molecule component
 * A floating tooltip bubble with text and an arrow indicator.
 */
export const BalanceTooltip: React.FC<BalanceTooltipProps> = ({
    isVisible,
    fadeAnim,
    text,
    style,
    arrowStyle,
}) => {
    if (!isVisible) return null;

    return (
        <Animated.View
            style={[
                styles.tooltipContainer,
                style,
                { opacity: fadeAnim, transform: [{ translateY: fadeAnim.interpolate({ inputRange: [0, 1], outputRange: [4, 0] }) }] }
            ]}
            pointerEvents="none"
        >
            <Text style={styles.tooltipText}>{text}</Text>
            <View style={[styles.arrow, arrowStyle]} />
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    tooltipContainer: {
        position: 'absolute',
        backgroundColor: '#2C2C2C',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 8,
        zIndex: 100,
    },
    tooltipText: {
        color: '#E5E7EB',
        fontSize: 11,
        lineHeight: 14,
        textAlign: 'center',
    },
    arrow: {
        position: 'absolute',
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderLeftWidth: 6,
        borderRightWidth: 6,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
    }
});
