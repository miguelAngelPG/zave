import { useColor } from '@/hooks/useColor';
import { useScrollContext } from '@/src/context/ScrollContext';
import * as Haptics from 'expo-haptics';
import { useState } from 'react';
import { Dimensions } from 'react-native';
import { useAnimatedStyle, useDerivedValue, withSpring, withTiming } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');
const SPRING_CONFIG = { damping: 15, stiffness: 120, mass: 0.6 };
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

        // If compact, shrink to a small pill (70px) surrounding only the AI button
        const targetWidth = isExpanded ? expandedWidth : (isCompact.value ? 70 : normalWidth);

        return {
            width: withSpring(targetWidth, SPRING_CONFIG),
            height: withSpring(isExpanded ? expandedHeight : (isCompact.value ? 60 : 65), SPRING_CONFIG),
            borderRadius: withSpring(isExpanded ? 36 : (isCompact.value ? 30 : 32.5), SPRING_CONFIG),
            transform: [
                { translateY: withSpring(isExpanded ? -10 : 0, SPRING_CONFIG) }
            ]
        };
    });

    const navIconsStyle = useAnimatedStyle(() => {
        // Hide icons when expanded OR when compact (morphed into pill)
        const hideIcons = isExpanded || isCompact.value;
        return {
            opacity: withTiming(hideIcons ? 0 : 1, { duration: 150 }),
            transform: [
                { scale: withTiming(hideIcons ? 0 : 1, { duration: 150 }) }
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
