import { useColor } from '@/hooks/useColor';
import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import { Camera, CreditCard, House, Keyboard, MessageSquare, Mic, Sparkles, X } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInDown, FadeInUp, LinearTransition, ZoomIn, useAnimatedStyle, useSharedValue, withSequence, withSpring, withTiming } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

const SPRING_CONFIG = { damping: 15, stiffness: 120, mass: 0.6 };
const MAX_WIDTH = 360; // Max width for the "Island" dock

type AiMode = 'closed' | 'menu' | 'voice';

// Sub-component for animated icons
const TabIcon = ({ icon: Icon, isFocused, color, onPress, disabled }: any) => {
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

export const LiquidTabBar = ({ state, descriptors, navigation, onChatPress }: any) => {
    const insets = useSafeAreaInsets();
    const cardColor = useColor('card');
    const primaryColor = useColor('primary');
    const inactiveColor = useColor('muted');
    const [aiMode, setAiMode] = useState<AiMode>('closed');

    const isExpanded = aiMode !== 'closed';
    const expandedHeight = aiMode === 'menu' ? 260 : 200;

    // Animation Styles
    const containerStyle = useAnimatedStyle(() => {
        // Calculate target width with a maximum cap to prevent "overflow" look on large screens
        const targetWidth = isExpanded ? Math.min(width - 40, MAX_WIDTH) : 240;

        return {
            width: withSpring(targetWidth, SPRING_CONFIG),
            height: withSpring(isExpanded ? expandedHeight : 65, SPRING_CONFIG),
            borderRadius: withSpring(isExpanded ? 36 : 32.5, SPRING_CONFIG),
            transform: [
                { translateY: withSpring(isExpanded ? -10 : 0, SPRING_CONFIG) }
            ]
        };
    });

    const navIconsStyle = useAnimatedStyle(() => {
        return {
            opacity: withTiming(isExpanded ? 0 : 1, { duration: 150 }),
            transform: [{ scale: withTiming(isExpanded ? 0.5 : 1, { duration: 150 }) }]
        };
    });

    const handlePress = (route: string, isFocused: boolean) => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        if (isExpanded) setAiMode('closed');
        const event = navigation.emit({ type: 'tabPress', target: route, canPreventDefault: true });
        if (!isFocused && !event.defaultPrevented) navigation.navigate(route);
    };

    const handleAiLongPress = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        setAiMode('voice');
    };

    const handleAiPress = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        if (isExpanded) setAiMode('closed');
        else setAiMode('menu');
    };

    return (
        <View pointerEvents="box-none" style={styles.container}>
            <Animated.View
                layout={LinearTransition.springify().damping(18)}
                style={[
                    styles.dock,
                    {
                        backgroundColor: isExpanded ? '#0F172A' : cardColor,
                        marginBottom: insets.bottom + 10,
                        borderColor: isExpanded ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.05)',
                    },
                    containerStyle
                ]}
            >
                {/* NAVIGATION ROW */}
                <View style={styles.navRow}>

                    {/* Home */}
                    <Animated.View style={[styles.iconWrapper, navIconsStyle]}>
                        <TabIcon
                            icon={House}
                            isFocused={state.index === 0}
                            color={state.index === 0 ? primaryColor : inactiveColor}
                            onPress={() => handlePress('index', state.index === 0)}
                            disabled={isExpanded}
                        />
                    </Animated.View>

                    {/* GAP */}
                    <View style={{ width: 60 }} />

                    {/* Wallet */}
                    <Animated.View style={[styles.iconWrapper, navIconsStyle]}>
                        <TabIcon
                            icon={CreditCard}
                            isFocused={state.index === 1}
                            color={state.index === 1 ? primaryColor : inactiveColor}
                            onPress={() => handlePress('accounts', state.index === 1)}
                            disabled={isExpanded}
                        />
                    </Animated.View>
                </View>

                {/* EXPANDED CONTENT VIEW */}
                {isExpanded && (
                    <View style={styles.expandedContent}>
                        {/* HEADER */}
                        <Animated.View entering={FadeInDown.delay(100).springify().damping(14)} style={styles.aiHeader}>
                            {aiMode === 'voice' ? (
                                <>
                                    <Mic size={16} color="#EF4444" />
                                    <Animated.Text style={styles.aiText}>Escuchando...</Animated.Text>
                                </>
                            ) : (
                                <Animated.Text style={styles.aiText}>¿Qué hacemos?</Animated.Text>
                            )}
                        </Animated.View>

                        {/* MENU OR VOICE UI */}
                        {aiMode === 'menu' ? (
                            <Animated.View entering={FadeInUp.delay(50).springify().damping(16)} style={styles.actionRow}>
                                {/* SCAN */}
                                <TouchableOpacity style={styles.actionBtn}>
                                    <View style={[styles.circleBtn, styles.smallBtn]}>
                                        <Camera size={22} color="white" />
                                    </View>
                                    <Animated.Text style={styles.actionLabel}>Scan</Animated.Text>
                                </TouchableOpacity>

                                {/* CHAT (Center) */}
                                <TouchableOpacity style={styles.actionBtn} onPress={() => { setAiMode('closed'); onChatPress?.(); }}>
                                    <View style={[styles.circleBtn, styles.largeBtn]}>
                                        <MessageSquare size={28} color="white" fill="white" />
                                    </View>
                                    <Animated.Text style={styles.actionLabel}>Chat</Animated.Text>
                                </TouchableOpacity>

                                {/* MANUAL */}
                                <TouchableOpacity style={styles.actionBtn} onPress={() => { setAiMode('closed'); onChatPress?.(); }}>
                                    <View style={[styles.circleBtn, styles.smallBtn]}>
                                        <Keyboard size={22} color="white" />
                                    </View>
                                    <Animated.Text style={styles.actionLabel}>Manual</Animated.Text>
                                </TouchableOpacity>
                            </Animated.View>
                        ) : (
                            <Animated.View entering={ZoomIn.delay(100).springify()} style={styles.waveContainer}>
                                <View style={[styles.waveBar, { height: 24, backgroundColor: '#EF4444' }]} />
                                <View style={[styles.waveBar, { height: 40, backgroundColor: '#F87171' }]} />
                                <View style={[styles.waveBar, { height: 24, backgroundColor: '#EF4444' }]} />
                                <View style={[styles.waveBar, { height: 16, backgroundColor: '#FECACA' }]} />
                            </Animated.View>
                        )}
                    </View>
                )}

                {/* FLOATING TRIGGER BUTTON */}
                <View style={styles.triggerContainer} pointerEvents="box-none">
                    <TouchableOpacity
                        style={styles.aiTriggerBtn}
                        onPress={handleAiPress}
                        onLongPress={handleAiLongPress}
                        delayLongPress={250}
                        activeOpacity={0.9}
                    >
                        <Animated.View layout={LinearTransition}>
                            <LinearGradient
                                colors={aiMode === 'voice' ? ['#ef4444', '#dc2626'] : (isExpanded ? ['#334155', '#1e293b'] : ['#7C3AED', '#2563EB'])}
                                style={[styles.aiGradient, isExpanded && styles.aiGradientActive]}
                            >
                                {isExpanded ? <X size={24} color="white" /> : <Sparkles size={22} color="white" />}
                            </LinearGradient>
                        </Animated.View>
                    </TouchableOpacity>
                </View>

            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    dock: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.15,
        shadowRadius: 25,
        elevation: 10,
        borderWidth: 1,
        overflow: 'hidden',
        alignItems: 'center',
    },
    navRow: {
        flexDirection: 'row',
        width: '100%',
        height: 65,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        position: 'absolute',
        bottom: 0,
    },
    triggerContainer: {
        position: 'absolute',
        bottom: 5,
        left: 0,
        right: 0,
        alignItems: 'center',
        zIndex: 20,
    },
    iconWrapper: {
        width: 60,
        alignItems: 'center',
        justifyContent: 'center'
    },
    iconBtn: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    aiTriggerBtn: {
        marginBottom: 2,
    },
    aiGradient: {
        width: 52,
        height: 52,
        borderRadius: 26,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#7C3AED",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 10,
        elevation: 6,
    },
    aiGradientActive: {
        width: 44,
        height: 44,
        borderRadius: 22,
        shadowColor: "transparent",
        opacity: 0.8,
    },
    // Expanded Content
    expandedContent: {
        width: '100%',
        height: '100%',
        paddingBottom: 60,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    aiHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        opacity: 0.6,
        position: 'absolute',
        top: 24,
        width: '100%',
    },
    aiText: {
        color: 'white',
        fontSize: 14,
        fontWeight: '500',
    },
    actionRow: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'center',
        gap: 20,
        width: '100%',
        paddingBottom: 20,
    },
    actionBtn: {
        alignItems: 'center',
        gap: 8,
        width: 70,
    },
    circleBtn: {
        borderRadius: 99,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.08)',
    },
    smallBtn: {
        width: 52,
        height: 52,
    },
    largeBtn: {
        width: 72,
        height: 72,
        backgroundColor: '#7C3AED',
        marginBottom: 8,
        shadowColor: "#7C3AED",
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.4,
        shadowRadius: 12,
    },
    actionLabel: {
        color: 'white',
        fontSize: 12,
        fontWeight: '500',
        opacity: 0.8,
    },
    waveContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
        height: 60,
        paddingBottom: 20,
    },
    waveBar: {
        width: 6,
        borderRadius: 3,
        backgroundColor: '#6366F1',
    }
});
