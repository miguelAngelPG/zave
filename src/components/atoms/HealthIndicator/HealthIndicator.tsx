import React, { useEffect, useMemo, useRef } from 'react';
import { Animated, StyleSheet } from 'react-native';

interface HealthIndicatorProps {
    totalBalance: number;
    safeToSpend: number;
    style?: any;
}

/**
 * HealthIndicator - Atom component
 * Visual indicator of financial health that changes color and pulses when critical.
 */
export const HealthIndicator: React.FC<HealthIndicatorProps> = ({
    totalBalance,
    safeToSpend,
    style,
}) => {
    const pulseAnim = useRef(new Animated.Value(1)).current;

    // Calculate dynamic health color
    const healthColor = useMemo(() => {
        if (totalBalance === 0) return '#6B7280'; // Gray (Neutral)
        const ratio = safeToSpend / totalBalance;
        if (ratio > 0.4) return '#10B981';  // Green (Healthy)
        if (ratio > 0.15) return '#F59E0B'; // Yellow (Warning)
        return '#EF4444';                   // Red (Critical)
    }, [safeToSpend, totalBalance]);

    // Pulse animation effect for critical state
    useEffect(() => {
        if (healthColor === '#EF4444') {
            Animated.loop(
                Animated.sequence([
                    Animated.timing(pulseAnim, {
                        toValue: 0.4,
                        duration: 800,
                        useNativeDriver: true,
                    }),
                    Animated.timing(pulseAnim, {
                        toValue: 1,
                        duration: 800,
                        useNativeDriver: true,
                    }),
                ])
            ).start();
        } else {
            pulseAnim.setValue(1);
        }
    }, [healthColor]);

    return (
        <Animated.View
            style={[
                styles.indicator,
                {
                    backgroundColor: healthColor,
                    opacity: pulseAnim,
                    transform: [{ scale: pulseAnim }]
                },
                style
            ]}
        />
    );
};

const styles = StyleSheet.create({
    indicator: {
        width: 6,
        height: 6,
        borderRadius: 3,
    },
});
