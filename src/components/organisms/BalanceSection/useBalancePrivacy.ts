import * as Haptics from 'expo-haptics';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Animated, Easing } from 'react-native';

/**
 * useBalancePrivacy - Custom hook for managing privacy state and animations
 * 
 * Handles:
 * - Privacy toggle state
 * - Blur animation (fade in/out)
 * - Haptic feedback
 */
export const useBalancePrivacy = (initialState = false) => {
    const [isBalanceHidden, setIsBalanceHidden] = useState(initialState);
    const blurOpacity = useRef(new Animated.Value(initialState ? 1 : 0)).current;

    useEffect(() => {
        Animated.timing(blurOpacity, {
            toValue: isBalanceHidden ? 1 : 0,
            duration: 300,
            useNativeDriver: true,
            easing: Easing.inOut(Easing.ease),
        }).start();
    }, [isBalanceHidden, blurOpacity]);

    const togglePrivacy = useCallback(() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        setIsBalanceHidden((prev) => !prev);
    }, []);

    return {
        isBalanceHidden,
        blurOpacity,
        togglePrivacy,
    };
};

