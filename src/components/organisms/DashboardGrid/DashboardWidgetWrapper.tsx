import { Ionicons } from '@expo/vector-icons';
import React, { useEffect } from 'react';
import { Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { DashboardWidgetConfig, useDashboard } from '../../../context/DashboardContext';
import { colors, spacing } from '../../../theme';

interface Props {
    widget: DashboardWidgetConfig;
    isEditing: boolean;
    children: React.ReactNode;
}

// 4-column system math
export const { width: windowWidth } = Dimensions.get('window');
export const GRID_PADDING = 32; // approx lateral padding from DashboardGrid container/parent
export const GAP = spacing.md;
export const BASE_COL_WIDTH = (windowWidth - GRID_PADDING - GAP * 3) / 4;
export const BASE_ROW_HEIGHT = BASE_COL_WIDTH; // square cells

export const DashboardWidgetWrapper: React.FC<Props> = ({ widget: w, isEditing, children }) => {
    const { toggleWidget, resizeWidget } = useDashboard();

    // Reanimated shared values for previewing size dynamically
    const previewCols = useSharedValue(w.size.cols);
    const previewRows = useSharedValue(w.size.rows);

    useEffect(() => {
        previewCols.value = w.size.cols;
        previewRows.value = w.size.rows;
    }, [w.size, isEditing]);

    const resizeGesture = Gesture.Pan()
        .enabled(isEditing)
        .onUpdate((e) => {
            const deltaCols = Math.round(e.translationX / (BASE_COL_WIDTH + GAP));
            const deltaRows = Math.round(e.translationY / (BASE_ROW_HEIGHT + GAP));

            const newCols = Math.max(1, Math.min(4, w.size.cols + deltaCols));
            const newRows = Math.max(1, Math.min(4, w.size.rows + deltaRows));

            if (previewCols.value !== newCols || previewRows.value !== newRows) {
                previewCols.value = newCols;
                previewRows.value = newRows;
            }
        })
        .onEnd(() => {
            if (previewCols.value !== w.size.cols || previewRows.value !== w.size.rows) {
                runOnJS(resizeWidget)(w.id, { cols: previewCols.value, rows: previewRows.value });
            }
        });

    const animatedStyle = useAnimatedStyle(() => {
        return {
            width: withSpring(previewCols.value * BASE_COL_WIDTH + (previewCols.value - 1) * GAP, { damping: 16, stiffness: 120 }),
            height: withSpring(previewRows.value * BASE_ROW_HEIGHT + (previewRows.value - 1) * GAP, { damping: 16, stiffness: 120 }),
        };
    });

    return (
        <Animated.View
            style={[
                animatedStyle,
                isEditing && styles.widgetWrapperEditing
            ]}
        >
            {/* Visual indicator of editing */}
            {isEditing && (
                <View style={styles.editOverlay} pointerEvents="box-none">
                    <View style={styles.editControlsTop} pointerEvents="box-none">
                        <TouchableOpacity onPress={() => toggleWidget(w.id)} style={styles.editBtn}>
                            <Ionicons name="close-outline" size={20} color={colors.dashboard.danger} />
                        </TouchableOpacity>
                    </View>
                </View>
            )}

            <View style={{ flex: 1, opacity: isEditing ? 0.8 : 1 }} pointerEvents={isEditing ? 'none' : 'auto'}>
                {children}
            </View>

            {/* Resize Handle only active while editing */}
            {isEditing && (
                <GestureDetector gesture={resizeGesture}>
                    <Animated.View style={styles.resizeHandle}>
                        <Ionicons name="resize" size={16} color={colors.dashboard.primary} style={{ transform: [{ rotate: '90deg' }] }} />
                    </Animated.View>
                </GestureDetector>
            )}
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    widgetWrapperEditing: {
        transform: [{ scale: 0.98 }],
    },
    editOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderRadius: 24, // match card radius
        zIndex: 10,
        justifyContent: 'space-between',
        padding: 12,
        pointerEvents: 'none'
    },
    editControlsTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    editBtn: {
        backgroundColor: colors.dashboard.background,
        padding: 8,
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
        pointerEvents: 'auto'
    },
    resizeHandle: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: 36,
        height: 36,
        backgroundColor: colors.dashboard.card,
        borderTopLeftRadius: 16,
        borderBottomRightRadius: 24,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: "#000",
        shadowOffset: { width: -2, height: -2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 6,
        zIndex: 20,
        borderWidth: 1,
        borderColor: colors.dashboard.border,
    }
});
