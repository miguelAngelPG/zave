import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInDown, FadeOutDown } from 'react-native-reanimated';
import { DashboardWidgetConfig, useDashboard } from '../../../context/DashboardContext';
import { colors, spacing, typography } from '../../../theme';
import { Text } from '../../atoms/Text/Text';
import { BASE_COL_WIDTH, BASE_ROW_HEIGHT, GAP } from './DashboardWidgetWrapper';

interface Props {
    renderWidgetPreview: (w: DashboardWidgetConfig) => React.ReactNode;
}

export const DashboardWidgetDrawer: React.FC<Props> = ({ renderWidgetPreview }) => {
    const { widgets, toggleWidget } = useDashboard();
    const inactiveWidgets = widgets.filter(w => !w.visible);

    return (
        <Animated.View
            entering={FadeInDown.duration(300).springify()}
            exiting={FadeOutDown.duration(200)}
            style={styles.drawerContainer}
        >
            <Text style={styles.drawerTitle}>Widgets Disponibles</Text>
            <Text style={styles.drawerSubtitle}>Añade nuevos elementos a tu panorama</Text>

            <View style={styles.drawerGrid}>
                {inactiveWidgets.length === 0 && (
                    <Text style={styles.emptyDrawerText}>¡Ya tienes todos los widgets activos!</Text>
                )}
                <View style={styles.widgetPreviews}>
                    {inactiveWidgets.map(w => (
                        <View
                            key={w.id}
                            style={{
                                width: w.size.cols * BASE_COL_WIDTH + (w.size.cols - 1) * GAP,
                                height: w.size.rows * BASE_ROW_HEIGHT + (w.size.rows - 1) * GAP,
                                position: 'relative',
                            }}
                        >
                            <View style={{ flex: 1, pointerEvents: 'none' }}>
                                {renderWidgetPreview(w)}
                            </View>

                            <TouchableOpacity
                                style={styles.drawerAddOverlay}
                                onPress={() => toggleWidget(w.id)}
                            >
                                <View style={styles.drawerAddIconBg}>
                                    <Ionicons name="add" size={24} color={colors.dashboard.background} />
                                </View>
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>
            </View>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    drawerContainer: {
        marginTop: spacing.xl,
        paddingTop: spacing.lg,
        borderTopWidth: 1,
        borderTopColor: colors.dashboard.border,
    },
    drawerTitle: {
        ...typography.h3,
        color: colors.dashboard.textPrimary,
        marginBottom: 4,
    },
    drawerSubtitle: {
        fontSize: 14,
        color: colors.dashboard.textMuted,
        marginBottom: spacing.md,
    },
    drawerGrid: {
        gap: spacing.sm,
    },
    widgetPreviews: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: GAP,
        alignItems: 'center',
        paddingBottom: spacing.xxl,
    },
    drawerAddOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderRadius: 24,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 5,
    },
    drawerAddIconBg: {
        backgroundColor: colors.dashboard.primaryFocus,
        padding: 12,
        borderRadius: 30,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6,
    },
    emptyDrawerText: {
        color: colors.dashboard.textMuted,
        fontStyle: 'italic',
        textAlign: 'center',
        padding: spacing.md,
    }
});
