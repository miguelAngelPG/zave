import { useColor } from '@/hooks/useColor';
import { useScrollContext } from '@/src/context/ScrollContext';
import * as Haptics from 'expo-haptics';
import { useEffect, useState } from 'react';
import { Dimensions } from 'react-native';
import { useAnimatedStyle, useDerivedValue, useSharedValue, withDelay, withSpring, withTiming } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');
// Tuned for a "Solid Premium" feel (less bounce, more control)
const SOLID_CONFIG = { damping: 20, stiffness: 200, mass: 0.8 };
// Tuned for a "Rubber/Jelly" feel (Organic, snappy but fluid)
const JELLY_CONFIG = { damping: 16, stiffness: 240, mass: 1.2 };

const MAX_WIDTH = 360;

type AiMode = 'closed' | 'menu' | 'voice';

export const useLiquidTabBar = (state: any, navigation: any, onChatPress?: () => void) => {
    const insets = useSafeAreaInsets();
    const { scrollY, isScrolling } = useScrollContext(); // Global scroll value & state
    const cardColor = useColor('card');
    const primaryColor = useColor('primary');
    const inactiveColor = useColor('muted');

    // State
    const [aiMode, setAiMode] = useState<AiMode>('closed');
    const isExpanded = aiMode !== 'closed';
    const expandedHeight = aiMode === 'menu' ? 260 : 200;

    // Shared value to track if we are currently closing the menu
    // This allows us to use a SOLID animation for closing (clean), and JELLY only for scrolling (playful)
    const isMenuClosing = useSharedValue(false);

    useEffect(() => {
        if (aiMode === 'closed') {
            // Trigger solid animation mode when closing
            isMenuClosing.value = true;
            // Reset back to allow jelly mode after animation completes
            const timeout = setTimeout(() => {
                isMenuClosing.value = false;
            }, 600);
            return () => clearTimeout(timeout);
        }
    }, [aiMode]);

    // Actions
    const handlePress = (route: string, isFocused: boolean) => {
        if (isExpanded) {
            setAiMode('closed');
            return; // Don't navigate if just closing menu
        }

        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

        const event = navigation.emit({
            type: 'tabPress',
            target: route,
            canPreventDefault: true,
        });

        if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route);
        }
    };

    const handleAiLongPress = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        setAiMode('voice');
    };

    const handleAiPress = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        if (isExpanded) {
            setAiMode('closed');
        } else {
            setAiMode('menu');
        }
    };

    const handleActionPress = () => {
        setAiMode('closed');
        onChatPress?.();
    };

    // Derived Values
    // Detect "Bounce Compact Mode": 
    // - Shrinks ONLY when actively scrolling down (>20px).
    // - Bounces back to normal automatically when scrolling stops (isScrolling -> false).
    const isCompact = useDerivedValue(() => {
        return !isExpanded && scrollY.value > 20 && isScrolling.value;
    });

    // Animations
    const containerStyle = useAnimatedStyle(() => {
        // Normal width logic
        const expandedWidth = Math.min(width - 40, MAX_WIDTH);
        const normalWidth = 240;

        // If compact, shrink to a perfect Circle (66px) that matches the vertical framing
        // The button is 52px + 7px bottom margin. A 66px height centers it (7px top margin).
        const targetWidth = isExpanded ? expandedWidth : (isCompact.value ? 66 : normalWidth);
        const targetHeight = isExpanded ? expandedHeight : (isCompact.value ? 66 : 65);
        const targetBorderRadius = isExpanded ? 36 : (isCompact.value ? 33 : 32.5);
        const targetTranslateY = isExpanded ? -10 : 0;

        // Use JELLY config ONLY when returning from scroll (compact) mode.
        // If we are closing the menu (isMenuClosing), use SOLID to prevent glitchy wobbling on large layout changes.
        // If we are expanding, use SOLID.
        // If we are Compact, use SOLID (snappy entry).
        const shouldBounce = !isExpanded && !isCompact.value && !isMenuClosing.value;
        const config = shouldBounce ? JELLY_CONFIG : SOLID_CONFIG;

        return {
            width: withSpring(targetWidth, config),
            height: withSpring(targetHeight, config),
            borderRadius: withSpring(targetBorderRadius, config),
            transform: [
                { translateY: withSpring(targetTranslateY, config) }
            ]
        };
    });

    const navIconsStyle = useAnimatedStyle(() => {
        // Hide icons when expanded OR when compact (morphed into pill)
        const hideIcons = isExpanded || isCompact.value;
        return {
            // Hide instantly (50ms) to avoid clipping.
            // Show with delay (150ms) to let the bar expand first ("pop" effect).
            opacity: hideIcons
                ? withTiming(0, { duration: 50 })
                : withDelay(100, withTiming(1, { duration: 250 })),
            transform: [
                // Pop in effect or shrink out
                {
                    scale: hideIcons
                        ? withTiming(0.5, { duration: 50 })
                        : withDelay(100, withSpring(1, { damping: 12 }))
                }
            ]
        };
    });

    const dockStyle = [
        {
            backgroundColor: isExpanded ? '#0F172A' : cardColor,
            marginBottom: insets.bottom + 10,
            borderColor: isExpanded ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.05)',
        },
        containerStyle
    ];

    const gradientColors = aiMode === 'voice'
        ? ['#ef4444', '#dc2626'] as const
        : (isExpanded ? ['#334155', '#1e293b'] as const : ['#7C3AED', '#2563EB'] as const);

    return {
        // State
        aiMode,
        isExpanded,
        primaryColor,
        inactiveColor,
        state,

        // Styles
        dockStyle,
        navIconsStyle,
        gradientColors,

        // Handlers
        handlePress,
        handleAiPress,
        handleAiLongPress,
        handleActionPress,
    };
};
