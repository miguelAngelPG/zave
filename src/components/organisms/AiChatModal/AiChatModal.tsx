import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { useColor } from "@/hooks/useColor";
import { Mic, Send, X } from "lucide-react-native";
import React from 'react';
import { Dimensions, StyleSheet, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import Animated, { FadeIn, FadeOut, SlideInDown, SlideOutDown } from "react-native-reanimated";

interface AiChatModalProps {
    visible: boolean;
    onClose: () => void;
}

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

// Render globally, controlled by state, without RN Modal to prevent animation conflict
export const AiChatModal = ({ visible, onClose }: AiChatModalProps) => {
    const cardColor = useColor('card');
    const primaryColor = useColor('primary');
    const textColor = useColor('text');
    const backgroundColor = useColor('background');

    if (!visible) return null;

    return (
        <View style={[StyleSheet.absoluteFill, { zIndex: 100 }]} pointerEvents="box-none">
            {/* Backdrop */}
            <TouchableWithoutFeedback onPress={onClose}>
                <Animated.View
                    entering={FadeIn.duration(200)}
                    exiting={FadeOut.duration(200)}
                    style={styles.overlay}
                />
            </TouchableWithoutFeedback>

            {/* Sheet Content */}
            <Animated.View
                entering={SlideInDown.springify().damping(18)}
                exiting={SlideOutDown.duration(200)}
                style={[styles.sheet, { backgroundColor: cardColor }]}
            >
                {/* Handle Bar */}
                <View style={styles.handleContainer}>
                    <View style={styles.handle} />
                </View>

                {/* Header */}
                <View style={styles.header}>
                    <View>
                        <Text variant="title" style={{ fontSize: 20 }}>Zave Assistant</Text>
                        <Text variant="caption" style={{ color: primaryColor, fontWeight: '600' }}>En línea</Text>
                    </View>
                    <Button variant="ghost" size="icon" icon={X} onPress={onClose} style={{ backgroundColor: 'rgba(0,0,0,0.05)', borderRadius: 20 }} />
                </View>

                {/* Chat Area - Placeholder */}
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, gap: 16 }}>
                    <Text style={{ textAlign: 'center', opacity: 0.5 }}>
                        "Hola Carlos, ¿en qué te ayudo hoy?"
                    </Text>
                    <View style={{ flexDirection: 'row', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
                        {['Registrar Gasto', 'Ver Presupuesto', 'Escanear Ticket'].map((suggestion) => (
                            <TouchableOpacity key={suggestion} style={{ paddingHorizontal: 16, paddingVertical: 8, backgroundColor: 'rgba(0,0,0,0.05)', borderRadius: 100 }}>
                                <Text variant="caption" style={{ fontWeight: '600' }}>{suggestion}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* Input Bar */}
                <View style={[styles.inputBar, { borderTopColor: 'rgba(0,0,0,0.05)' }]}>
                    <View style={[styles.inputContainer, { backgroundColor: 'rgba(0,0,0,0.03)' }]}>
                        <TextInput
                            placeholder="Escribe un mensaje..."
                            placeholderTextColor={textColor}
                            style={[styles.input, { color: textColor }]}
                        />
                        <TouchableOpacity>
                            <Mic size={20} color={primaryColor} />
                        </TouchableOpacity>
                    </View>
                    <Button variant="default" size="icon" icon={Send} style={{ borderRadius: 24, width: 48, height: 48 }} />
                </View>
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.4)',
    },
    sheet: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '85%', // Tall sheet
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        paddingBottom: 40, // Safe area
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.1,
        shadowRadius: 16,
        elevation: 20,
    },
    handleContainer: {
        alignItems: 'center',
        paddingVertical: 12,
    },
    handle: {
        width: 40,
        height: 4,
        borderRadius: 2,
        backgroundColor: 'rgba(0,0,0,0.2)',
    },
    header: {
        paddingHorizontal: 24,
        paddingBottom: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0,0,0,0.05)',
    },
    inputBar: {
        padding: 16,
        paddingBottom: 32,
        borderTopWidth: 1,
        flexDirection: 'row',
        gap: 12,
        alignItems: 'center',
    },
    inputContainer: {
        flex: 1,
        height: 48,
        borderRadius: 24,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
    },
    input: {
        flex: 1,
        height: '100%',
        fontSize: 16,
        marginRight: 8,
    }
});
