import { useColor } from '@/hooks/useColor';
import { LinearGradient } from 'expo-linear-gradient';
import { Camera, MessageSquare, Mic, Sparkles, X } from 'lucide-react-native';
import React, { useRef, useState } from 'react';
import {
    Animated,
    Dimensions,
    Pressable,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

interface SpeedDialMethod {
    id: string;
    icon: any;
    label: string;
    color: string;
    onPress: () => void;
}

interface SpeedDialProps {
    onMethodSelect?: (methodId: string) => void;
    isProcessing?: boolean;
}

export const SpeedDial: React.FC<SpeedDialProps> = ({
    onMethodSelect,
    isProcessing = false,
}) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const primaryColor = useColor('primary');

    const methods: SpeedDialMethod[] = [
        {
            id: 'chat',
            icon: MessageSquare,
            label: 'Chat AI',
            color: '#3B82F6', // Blue
            onPress: () => console.log('Chat method'),
        },
        {
            id: 'scan',
            icon: Camera,
            label: 'Escanear',
            color: '#10B981', // Emerald
            onPress: () => console.log('Scan method'),
        },
        {
            id: 'voice',
            icon: Mic,
            label: 'Voz',
            color: '#F43F5E', // Rose
            onPress: () => console.log('Voice method'),
        },
    ];

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
    // Adjusted to fan out nicely from bottom right
    const positions = [
        { x: -70, y: -90 }, // Top Left ish
        { x: -25, y: -110 }, // Top Center ish
        { x: 10, y: -80 },   // Top Right ish
    ];

    const toggleSpeedDial = () => {
        if (isProcessing) return;

        const toValue = isExpanded ? 0 : 1;
        setIsExpanded(!isExpanded);

        // Main FAB rotation
        Animated.timing(fabRotation, {
            toValue: toValue,
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
                    delay: toValue ? index * 80 : 0,
                    useNativeDriver: true,
                }),
                // Position animation
                Animated.parallel([
                    Animated.timing(miniFabsPosition[index].x, {
                        toValue: toValue ? position.x : 0,
                        duration: 400,
                        delay: toValue ? index * 80 : 0,
                        useNativeDriver: true,
                    }),
                    Animated.timing(miniFabsPosition[index].y, {
                        toValue: toValue ? position.y : 0,
                        duration: 400,
                        delay: toValue ? index * 80 : 0,
                        useNativeDriver: true,
                    }),
                ]),
                // Label fade
                Animated.timing(labelsOpacity[index], {
                    toValue,
                    duration: 200,
                    delay: toValue ? index * 80 + 150 : 0,
                    useNativeDriver: true,
                }),
            ]);
        });

        Animated.parallel(animations).start();
    };

    const handleMethodPress = (method: SpeedDialMethod, index: number) => {
        // Quick scale animation
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

        setTimeout(() => {
            toggleSpeedDial();
            method.onPress();
            onMethodSelect?.(method.id);
        }, 200);
    };

    const fabRotationInterpolate = fabRotation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '45deg'],
    });

    return (
        <View style={styles.container} pointerEvents="box-none">
            {/* Overlay */}
            {isExpanded && (
                <Pressable
                    style={[StyleSheet.absoluteFill, { width: Dimensions.get('window').width, height: Dimensions.get('window').height, top: -Dimensions.get('window').height + 150, left: -Dimensions.get('window').width + 80 }]}
                    onPress={toggleSpeedDial}
                >
                    {/* Overlay handled via Pressable size hack or Portal ideally */}
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
                    <Animated.View style={[styles.labelContainer, { opacity: labelsOpacity[index] }]}>
                        <View style={styles.label}>
                            <Text style={styles.labelText}>{method.label}</Text>
                        </View>
                    </Animated.View>

                    <TouchableOpacity
                        style={[styles.miniFab, { backgroundColor: method.color }]}
                        onPress={() => handleMethodPress(method, index)}
                        activeOpacity={0.8}
                    >
                        <method.icon size={22} color="white" />
                    </TouchableOpacity>
                </Animated.View>
            ))}

            {/* Main FAB */}
            <TouchableOpacity
                onPress={toggleSpeedDial}
                activeOpacity={0.9}
                disabled={isProcessing}
                style={styles.shadowWrapper}
            >
                <Animated.View style={{ transform: [{ rotate: fabRotationInterpolate }] }}>
                    <LinearGradient
                        colors={['#7C3AED', '#2563EB']} // Violet to Blue
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.mainFab}
                    >
                        {isExpanded ? (
                            <X size={28} color="white" />
                        ) : (
                            <Sparkles size={26} color="white" fill="white" />
                        )}
                    </LinearGradient>
                </Animated.View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 110, // Higher to clear the floating tabs
        right: 20,
        zIndex: 9999, // Ensure it's on top
        alignItems: 'center',
        justifyContent: 'center',
    },
    shadowWrapper: {
        shadowColor: '#7C3AED',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.4,
        shadowRadius: 12,
        elevation: 10,
        borderRadius: 30,
    },
    mainFab: {
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.2)',
    },
    miniFabContainer: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
    },
    labelContainer: {
        position: 'absolute',
        right: 55,
        backgroundColor: '#1F2937',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
        minWidth: 80,
        alignItems: 'center',
    },
    label: {

    },
    labelText: {
        color: '#FFFFFF',
        fontSize: 12,
        fontWeight: '600',
    },
    miniFab: {
        width: 44,
        height: 44,
        borderRadius: 22,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 6,
        borderWidth: 2,
        borderColor: 'white',
    },
});