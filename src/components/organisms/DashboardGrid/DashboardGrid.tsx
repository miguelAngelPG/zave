import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Sortable from 'react-native-sortables';
import { DashboardWidgetConfig, useDashboard, WidgetId } from '../../../context/DashboardContext';
import { colors, spacing, typography } from '../../../theme';
import { Text } from '../../atoms/Text/Text';

import { DashboardWidgetDrawer } from './DashboardWidgetDrawer';
import { BASE_COL_WIDTH, BASE_ROW_HEIGHT, DashboardWidgetWrapper, GAP } from './DashboardWidgetWrapper';

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

        return (
            <DashboardWidgetWrapper key={w.id} widget={w} isEditing={isEditing}>
                <WidgetComponent {...widgetProps} size={w.size} />
            </DashboardWidgetWrapper>
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

            <View style={{ marginTop: spacing.xs, minHeight: isEditing ? 500 : 0 }}>
                {isEditing && (
                    <View style={StyleSheet.absoluteFillObject} pointerEvents="none">
                        <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap', gap: GAP }}>
                            {Array.from({ length: 24 }).map((_, i) => (
                                <View
                                    key={i}
                                    style={{
                                        width: BASE_COL_WIDTH,
                                        height: BASE_ROW_HEIGHT,
                                        backgroundColor: 'rgba(255,255,255,0.03)',
                                        borderRadius: 20,
                                        borderWidth: 1,
                                        borderColor: 'rgba(255,255,255,0.08)',
                                        borderStyle: 'dashed'
                                    }}
                                />
                            ))}
                        </View>
                    </View>
                )}

                <Sortable.Flex
                    sortEnabled={isEditing}
                    onDragEnd={({ order }) => {
                        const newOrderKeys = order(widgets.filter(w => w.visible));
                        reorderWidgets(newOrderKeys);
                    }}
                    rowGap={GAP}
                    columnGap={GAP}
                    activeItemScale={1.03}
                    strategy="insert"
                >
                    {widgets.filter(w => w.visible).map(w => renderWidget(w))}
                </Sortable.Flex>
            </View>

            {/* Widget Drawer (Only in Edit Mode) */}
            {isEditing && <DashboardWidgetDrawer />}


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
    }
});
