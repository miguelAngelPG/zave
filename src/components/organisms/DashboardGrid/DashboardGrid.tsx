import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useDashboard, WidgetId } from '../../../context/DashboardContext';
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
    const { widgets } = useDashboard();
    const [isCustomizing, setIsCustomizing] = useState(false);

    const renderWidget = (id: WidgetId) => {
        const WidgetComponent = WIDGET_REGISTRY[id];
        const widgetProps = MOCK_DATA[id];
        return WidgetComponent ? <WidgetComponent key={id} {...widgetProps} /> : null;
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.sectionTitle}>Tu Panorama</Text>

                <TouchableOpacity style={styles.customizeBtn} onPress={() => setIsCustomizing(true)}>
                    <Ionicons name="options-outline" size={18} color={colors.dashboard.textSecondary} />
                    <Text style={styles.customizeText}>Personalizar</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.gridContainer}>
                {widgets
                    .filter(w => w.visible)
                    // Ensure the array order dictates rendering
                    .map(w => renderWidget(w.id))}
            </View>

            <DashboardCustomizerModal
                visible={isCustomizing}
                onClose={() => setIsCustomizing(false)}
            />
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
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: spacing.md,
    },
});
