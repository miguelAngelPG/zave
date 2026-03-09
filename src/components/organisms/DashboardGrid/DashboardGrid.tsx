import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Animated from 'react-native-reanimated';
import Sortable from 'react-native-sortables';
import { DashboardWidgetConfig, useDashboard, WidgetId } from '../../../context/DashboardContext';
import { colors, spacing, typography } from '../../../theme';
import { Text } from '../../atoms/Text/Text';
import { DashboardCustomizerModal } from './DashboardCustomizerModal';

import { MainGoalWidget } from './widgets/MainGoalWidget';
import { NextBillWidget } from './widgets/NextBillWidget';
import { WeeklySpendWidget } from './widgets/WeeklySpendWidget';

const WIDGET_REGISTRY: Record<WidgetId, any> = {
    'weekly-spend': WeeklySpendWidget,
    'next-bill': NextBillWidget,
    'main-goal': MainGoalWidget,
};

// Temp mock data hook simulator (Later extract to useDashboardData hook)
const MOCK_DATA: Record<WidgetId, any> = {
    'weekly-spend': { data: [150, 300, 100, 450, 200, 120, 80], maxSpend: 500 },
    'next-bill': { name: 'Spotify', amount: 129, date: 'Man 14' },
    'main-goal': { name: 'Viaje a Japón', current: 15400, target: 45000, percentage: 34 },
};

export const DashboardGrid: React.FC = () => {
    const { widgets, toggleWidget, moveWidget, resizeWidget, reorderWidgets } = useDashboard();
    const [isEditing, setIsEditing] = useState(false);

    const renderWidget = (w: DashboardWidgetConfig) => {
        const WidgetComponent = WIDGET_REGISTRY[w.id];
        const widgetProps = MOCK_DATA[w.id];
        if (!WidgetComponent) return null;

        const isSmall = w.size === 'small';

        return (
            <Animated.View
                key={w.id}
                style={[
                    styles.widgetWrapper,
                    isSmall ? styles.widgetWrapperSmall : styles.widgetWrapperLarge,
                    isEditing && styles.widgetWrapperEditing
                ]}
            >
                {/* Visual indicator of editing */}
                {isEditing && (
                    <View style={styles.editOverlay}>
                        <View style={styles.editControlsTop}>
                            <TouchableOpacity onPress={() => toggleWidget(w.id)} style={styles.editBtn}>
                                <Ionicons name="eye-off-outline" size={18} color={colors.dashboard.textPrimary} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => resizeWidget(w.id, w.size === 'small' ? 'large' : 'small')} style={styles.editBtn}>
                                <Ionicons name={w.size === 'small' ? "expand-outline" : "contract-outline"} size={18} color={colors.dashboard.textPrimary} />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.editControlsBottom}>
                            <TouchableOpacity onPress={() => moveWidget(w.id, 'up')} style={styles.editBtn}>
                                <Ionicons name="arrow-back-outline" size={18} color={colors.dashboard.textPrimary} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => moveWidget(w.id, 'down')} style={styles.editBtn}>
                                <Ionicons name="arrow-forward-outline" size={18} color={colors.dashboard.textPrimary} />
                            </TouchableOpacity>
                        </View>
                    </View>
                )}

                <View style={{ flex: 1, opacity: isEditing ? 0.6 : 1 }}>
                    <WidgetComponent {...widgetProps} size={w.size} />
                </View>
            </Animated.View>
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.sectionTitle}>Tu Panorama</Text>

                <TouchableOpacity
                    style={[styles.customizeBtn, isEditing && styles.customizeBtnActive]}
                    onPress={() => setIsEditing(!isEditing)}
                >
                    <Ionicons name={isEditing ? "checkmark-outline" : "options-outline"} size={18} color={isEditing ? colors.dashboard.background : colors.dashboard.textSecondary} />
                    <Text style={[styles.customizeText, isEditing && { color: colors.dashboard.background }]}>
                        {isEditing ? 'Listo' : 'Personalizar'}
                    </Text>
                </TouchableOpacity>
            </View>

            <View style={{ marginTop: spacing.xs }}>
                <Sortable.Flex
                    sortEnabled={isEditing}
                    onDragEnd={({ order }) => {
                        const newOrder = order(widgets.filter(w => w.visible || isEditing));
                        if (isEditing) {
                            reorderWidgets(newOrder);
                        }
                    }}
                    rowGap={spacing.md}
                    columnGap={spacing.md}
                    activeItemScale={1.05}
                    strategy="insert"
                >
                    {widgets.map(w => {
                        if (!w.visible && !isEditing) return null;
                        return renderWidget(w);
                    })}
                </Sortable.Flex>
            </View>

            {!isEditing && ( // fallback modal for other configs or to restore if the modal was still there? Let's just hide it if editing
                <DashboardCustomizerModal
                    visible={false} // Keeping it false for now, since we do inline editing
                    onClose={() => { }}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: spacing.xl,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing.md,
        paddingHorizontal: spacing.xs,
    },
    sectionTitle: {
        ...typography.h3,
        fontSize: 18,
        color: colors.dashboard.textPrimary,
        fontWeight: '700',
        letterSpacing: 0.5,
    },
    customizeBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        backgroundColor: colors.dashboard.buttonBackground,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
    },
    customizeText: {
        color: colors.dashboard.textSecondary,
        fontSize: 12,
        fontWeight: '600',
    },
    customizeBtnActive: {
        backgroundColor: colors.dashboard.primary,
    },
    widgetWrapper: {
        // base layout is managed here
    },
    widgetWrapperSmall: {
        flexGrow: 1,
        flexBasis: '47%',
    },
    widgetWrapperLarge: {
        flexGrow: 1,
        flexBasis: '100%',
    },
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
    },
    editControlsTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    editControlsBottom: {
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
    }
});
