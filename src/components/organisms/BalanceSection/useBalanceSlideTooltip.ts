import * as Haptics from 'expo-haptics';
import { useRef, useState } from 'react';
import { Animated } from 'react-native';

export type TooltipPosition = 'header' | 'footer-left' | 'footer-right' | null;

/**
 * useBalanceSlideTooltip - Hook for managing tooltip state and animations
 */
export const useBalanceSlideTooltip = () => {
    const [activeTooltip, setActiveTooltip] = useState<TooltipPosition>(null);
    const fadeAnim = useRef(new Animated.Value(0)).current;

    // Auto-hide tooltip ref
    const timeoutRef = useRef<any>(null);

    const showTooltip = (position: TooltipPosition) => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

        if (activeTooltip === position) {
            hideTooltip();
            return;
        }

        setActiveTooltip(position);
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
        }).start();

        // Auto hide after 3.5s
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(hideTooltip, 3500);
    };

    const hideTooltip = () => {
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 150,
            useNativeDriver: true,
        }).start(() => setActiveTooltip(null));
    };

    return {
        activeTooltip,
        setActiveTooltip,
        fadeAnim,
        showTooltip,
        hideTooltip,
    };
};
