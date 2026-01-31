import { LinearGradient } from 'expo-linear-gradient';
import { Camera, CreditCard, House, Keyboard, MessageSquare, Mic, PieChart, Sparkles, Target, X } from 'lucide-react-native';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import Animated, { FadeInDown, FadeInUp, LinearTransition, ZoomIn } from 'react-native-reanimated';
import { styles } from './LiquidTabBar.styles';
import { TabIcon } from './TabIcon';
import { useLiquidTabBar } from './useLiquidTabBar';

export const LiquidTabBar = (props: any) => {
    const {
        state,
        navigation,
        onChatPress
    } = props;

    const {
        aiMode,
        isExpanded,
        primaryColor,
        inactiveColor,
        dockStyle,
        navIconsStyle,
        gradientColors,
        handlePress,
        handleAiPress,
        handleAiLongPress,
        handleActionPress,
    } = useLiquidTabBar(state, navigation, onChatPress);

    return (
        <View pointerEvents="box-none" style={styles.container}>
            <Animated.View
                // Removed layout prop to avoid conflict with containerStyle width/height animations
                style={[styles.dock, dockStyle]}
            >
                {/* NAVIGATION ROW */}
                <View style={styles.navRow}>
                    <Animated.View style={[styles.iconWrapper, navIconsStyle]}>
                        <TabIcon
                            icon={House}
                            isFocused={state.index === 0}
                            color={state.index === 0 ? primaryColor : inactiveColor}
                            onPress={() => handlePress('index', state.index === 0)}
                            disabled={isExpanded}
                        />
                    </Animated.View>

                    <Animated.View style={[styles.iconWrapper, navIconsStyle]}>
                        <TabIcon
                            icon={CreditCard}
                            isFocused={state.index === 1}
                            color={state.index === 1 ? primaryColor : inactiveColor}
                            onPress={() => handlePress('accounts', state.index === 1)}
                            disabled={isExpanded}
                        />
                    </Animated.View>

                    <View style={{ width: 44 }} />

                    <Animated.View style={[styles.iconWrapper, navIconsStyle]}>
                        <TabIcon
                            icon={PieChart}
                            isFocused={state.index === 2}
                            color={state.index === 2 ? primaryColor : inactiveColor}
                            onPress={() => handlePress('analytics', state.index === 2)}
                            disabled={isExpanded}
                        />
                    </Animated.View>

                    <Animated.View style={[styles.iconWrapper, navIconsStyle]}>
                        <TabIcon
                            icon={Target}
                            isFocused={state.index === 3}
                            color={state.index === 3 ? primaryColor : inactiveColor}
                            onPress={() => handlePress('goals', state.index === 3)}
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
                                <TouchableOpacity style={styles.actionBtn} onPress={handleActionPress}>
                                    <View style={[styles.circleBtn, styles.largeBtn]}>
                                        <MessageSquare size={28} color="white" fill="white" />
                                    </View>
                                    <Animated.Text style={styles.actionLabel}>Chat</Animated.Text>
                                </TouchableOpacity>

                                {/* MANUAL */}
                                <TouchableOpacity style={styles.actionBtn} onPress={handleActionPress}>
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
                                colors={gradientColors}
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
