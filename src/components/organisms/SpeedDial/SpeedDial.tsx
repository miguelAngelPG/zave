import { spacing } from '@/src/theme';
import React, { useState, useRef } from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet,
    Animated,
    Dimensions,
    Pressable,
} from 'react-native';

interface SpeedDialMethod {
    id: string;
    emoji: string;
    label: string;
    color: string;
    onPress: () => void;
}

interface SpeedDialProps {
    methods?: SpeedDialMethod[];
    onMethodSelect?: (methodId: string) => void;
    isProcessing?: boolean;
}

const { width, height } = Dimensions.get('window');

export const SpeedDial: React.FC<SpeedDialProps> = ({
    methods = [
        {
            id: 'photo',
            emoji: '📸',
            label: 'Foto',
            color: '#3B82F6',
            onPress: () => console.log('Photo method'),
        },
        {
            id: 'voice',
            emoji: '🎤',
            label: 'Voz',
            color: '#10B981',
            onPress: () => console.log('Voice method'),
        },
        {
            id: 'manual',
            emoji: '✋',
            label: 'Manual',
            color: '#8B5CF6',
            onPress: () => console.log('Manual method'),
        },
    ],
    onMethodSelect,
    isProcessing = false,
}) => {
    const [isExpanded, setIsExpanded] = useState(false);

    // Animated values
    const fabRotation = useRef(new Animated.Value(0)).current;
    const overlayOpacity = useRef(new Animated.Value(0)).current;
    const miniFantsScale = useRef(methods.map(() => new Animated.Value(0))).current;
    const miniFabsPosition = useRef(
        methods.map(() => ({
            x: new Animated.Value(0),
            y: new Animated.Value(0),
        }))
    ).current;
    const labelsOpacity = useRef(methods.map(() => new Animated.Value(0))).current;

    // Positions for mini-FABs (arc pattern)
    const positions = [
        { x: -80, y: -140 }, // Photo - top-left
        { x: -32, y: -160 }, // Voice - top-center
        { x: 0, y: -120 },   // Manual - top-right
    ];

    const toggleSpeedDial = () => {
        if (isProcessing) return;

        const toValue = isExpanded ? 0 : 1;
        setIsExpanded(!isExpanded);

        // Main FAB rotation
        Animated.timing(fabRotation, {
            toValue: toValue * 45, // 45 degrees
            duration: 300,
            useNativeDriver: true,
        }).start();

        // Overlay fade
        Animated.timing(overlayOpacity, {
            toValue,
            duration: 200,
            useNativeDriver: true,
        }).start();

        // Mini-FABs animations with stagger
        const animations = methods.map((_, index) => {
            const position = positions[index];

            return Animated.parallel([
                // Scale animation
                Animated.timing(miniFantsScale[index], {
                    toValue,
                    duration: 400,
                    delay: toValue ? index * 100 : 0,
                    useNativeDriver: true,
                }),
                // Position animation
                Animated.parallel([
                    Animated.timing(miniFabsPosition[index].x, {
                        toValue: toValue ? position.x : 0,
                        duration: 400,
                        delay: toValue ? index * 100 : 0,
                        useNativeDriver: true,
                    }),
                    Animated.timing(miniFabsPosition[index].y, {
                        toValue: toValue ? position.y : 0,
                        duration: 400,
                        delay: toValue ? index * 100 : 0,
                        useNativeDriver: true,
                    }),
                ]),
                // Label fade
                Animated.timing(labelsOpacity[index], {
                    toValue,
                    duration: 200,
                    delay: toValue ? index * 100 + 200 : 0,
                    useNativeDriver: true,
                }),
            ]);
        });

        Animated.parallel(animations).start();
    };

    const handleMethodPress = (method: SpeedDialMethod, index: number) => {
        // Quick scale animation for feedback
        Animated.sequence([
            Animated.timing(miniFantsScale[index], {
                toValue: 1.2,
                duration: 100,
                useNativeDriver: true,
            }),
            Animated.timing(miniFantsScale[index], {
                toValue: 1,
                duration: 100,
                useNativeDriver: true,
            }),
        ]).start();

        // Close speed dial
        setTimeout(() => {
            toggleSpeedDial();
            method.onPress();
            onMethodSelect?.(method.id);
        }, 200);
    };

    const fabRotationInterpolate = fabRotation.interpolate({
        inputRange: [0, 45],
        outputRange: ['0deg', '45deg'],
    });

    return (
        <View style={styles.container}>
            {/* Overlay */}
            {isExpanded && (
                <Pressable
                    style={StyleSheet.absoluteFillObject}
                    onPress={toggleSpeedDial}
                >
                    <Animated.View
                        style={[
                            styles.overlay,
                            {
                                opacity: overlayOpacity,
                            },
                        ]}
                    />
                </Pressable>
            )}

            {/* Mini-FABs */}
            {methods.map((method, index) => (
                <Animated.View
                    key={method.id}
                    style={[
                        styles.miniFabContainer,
                        {
                            transform: [
                                { scale: miniFantsScale[index] },
                                { translateX: miniFabsPosition[index].x },
                                { translateY: miniFabsPosition[index].y },
                            ],
                        },
                    ]}
                    pointerEvents={isExpanded ? 'auto' : 'none'}
                >
                    {/* Label */}
                    <Animated.View
                        style={[
                            styles.labelContainer,
                            {
                                opacity: labelsOpacity[index],
                            },
                        ]}
                    >
                        <View style={styles.label}>
                            <Text style={styles.labelText}>{method.label}</Text>
                        </View>
                    </Animated.View>

                    {/* Mini-FAB */}
                    <TouchableOpacity
                        style={[
                            styles.miniFab,
                            { backgroundColor: method.color },
                        ]}
                        onPress={() => handleMethodPress(method, index)}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.miniFabEmoji}>{method.emoji}</Text>
                    </TouchableOpacity>
                </Animated.View>
            ))}

            {/* Main FAB */}
            <TouchableOpacity
                style={[
                    styles.mainFab,
                    {
                        backgroundColor: isProcessing
                            ? '#6B7280'
                            : isExpanded
                                ? '#374151'
                                : '#8B5CF6',
                    },
                ]}
                onPress={toggleSpeedDial}
                activeOpacity={0.8}
                disabled={isProcessing}
            >
                <Animated.View
                    style={{
                        transform: [{ rotate: fabRotationInterpolate }],
                    }}
                >
                    {isProcessing ? (
                        <View style={styles.spinner} />
                    ) : (
                        <Text style={styles.fabText}>+</Text>
                    )}
                </Animated.View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 80, // Above bottom tabs
        right: spacing.lg,
        zIndex: 1000,
    },
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },
    mainFab: {
        width: 56,
        height: 56,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#8B5CF6',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
    },
    fabText: {
        color: '#FFFFFF',
        fontSize: 24,
        fontWeight: '300',
    },
    spinner: {
        width: 20,
        height: 20,
        borderWidth: 2,
        borderColor: '#FFFFFF',
        borderTopColor: 'transparent',
        borderRadius: 10,
        // Note: You'll need to add rotation animation for spinner
    },
    miniFabContainer: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        flexDirection: 'row',
        alignItems: 'center',
    },
    labelContainer: {
        position: 'absolute',
        right: 60, // Position to the left of mini-FAB
        top: '50%',
        transform: [{ translateY: -12 }], // Center vertically
    },
    label: {
        backgroundColor: '#1F2937',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
    },
    labelText: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: '500',
    },
    miniFab: {
        width: 48,
        height: 48,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
    },
    miniFabEmoji: {
        fontSize: 18,
    },
});