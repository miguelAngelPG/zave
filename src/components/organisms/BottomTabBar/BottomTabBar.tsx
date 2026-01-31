import { useColor } from '@/hooks/useColor';
import * as Haptics from 'expo-haptics';
import { Calendar, ChartPie, CreditCard, Flag, House } from 'lucide-react-native';
import React, { useEffect } from 'react';
import { Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native';
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

const TabItem = ({
    isFocused,
    routeName,
    onPress,
    activeContentColor,
    inactiveColor,
    primaryColor
}: any) => {
    const animation = useSharedValue(0);

    useEffect(() => {
        animation.value = withSpring(isFocused ? 1 : 0, {
            damping: 15,
            stiffness: 150,
        });
    }, [isFocused]);

    const pillStyle = useAnimatedStyle(() => {
        return {
            opacity: animation.value,
            transform: [{ scale: animation.value }],
        };
    });

    const iconContainerStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { scale: interpolate(animation.value, [0, 1], [1, 1.1]) },
            ],
        };
    });

    // Get icon component
    const IconComponent = () => {
        const iconProps = {
            size: 24,
            color: isFocused ? activeContentColor : inactiveColor,
            strokeWidth: isFocused ? 2.5 : 2
        };

        switch (routeName) {
            case 'index': return <House {...iconProps} />;
            case 'accounts': return <CreditCard {...iconProps} />;
            case 'analytics': return <ChartPie {...iconProps} />;
            case 'goals': return <Flag {...iconProps} />;
            case 'payments': return <Calendar {...iconProps} />;
            default: return <House {...iconProps} />;
        }
    };

    return (
        <TouchableOpacity
            style={styles.tabItem}
            onPress={onPress}
            activeOpacity={1}
        >
            <Animated.View
                style={[
                    styles.activePill,
                    { backgroundColor: primaryColor },
                    pillStyle
                ]}
            />
            <Animated.View style={[styles.contentContainer, iconContainerStyle]}>
                <IconComponent />
            </Animated.View>
        </TouchableOpacity>
    );
};

export const CustomTabBar = ({ state, descriptors, navigation }: any) => {
    const insets = useSafeAreaInsets();

    // Theme colors
    const cardColor = useColor('card');
    const inactiveColor = useColor('muted');
    const primaryColor = useColor('primary');
    const activeContentColor = useColor('primaryForeground');

    return (
        <View pointerEvents="box-none" style={styles.container}>
            <View style={[
                styles.tabBar,
                {
                    backgroundColor: cardColor,
                    marginBottom: insets.bottom + 20,
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.1,
                    shadowRadius: 12,
                    elevation: 5,
                    borderWidth: 0.5,
                    borderColor: 'rgba(0,0,0,0.05)',
                }
            ]}>
                {state.routes.map((route: any, index: number) => {
                    const isFocused = state.index === index;

                    const onPress = () => {
                        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                        const event = navigation.emit({
                            type: 'tabPress',
                            target: route.key,
                            canPreventDefault: true,
                        });

                        if (!isFocused && !event.defaultPrevented) {
                            navigation.navigate(route.name, route.params);
                        }
                    };

                    return (
                        <TabItem
                            key={route.key}
                            isFocused={isFocused}
                            routeName={route.name}
                            onPress={onPress}
                            activeContentColor={activeContentColor}
                            inactiveColor={inactiveColor}
                            primaryColor={primaryColor}
                        />
                    );
                })}
            </View>
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
    },
    tabBar: {
        flexDirection: 'row',
        width: width - 60,
        borderRadius: 35,
        height: 65,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 6,
    },
    tabItem: {
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    activePill: {
        position: 'absolute',
        width: 48,
        height: 48,
        borderRadius: 24,
    },
    contentContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10,
    },
});