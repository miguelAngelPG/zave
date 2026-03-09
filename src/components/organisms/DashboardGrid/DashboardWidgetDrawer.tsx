import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInDown, FadeOutDown } from 'react-native-reanimated';
import { useDashboard } from '../../../context/DashboardContext';
import { colors, spacing, typography } from '../../../theme';
import { Text } from '../../atoms/Text/Text';

export const DashboardWidgetDrawer: React.FC = () => {
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
                {inactiveWidgets.map(w => (
                    <View key={w.id} style={styles.drawerItem}>
                        <View style={styles.drawerItemInfo}>
                            <Ionicons name="grid-outline" size={20} color={colors.dashboard.primary} />
                            <View>
                                <Text style={styles.drawerItemTitle}>{w.title}</Text>
                                <Text style={styles.drawerItemDesc}>{w.description}</Text>
                            </View>
                        </View>
                        <TouchableOpacity
                            style={styles.drawerAddBtn}
                            onPress={() => toggleWidget(w.id)}
                        >
                            <Ionicons name="add-outline" size={20} color={colors.dashboard.background} />
                        </TouchableOpacity>
                    </View>
                ))}
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
    drawerItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: colors.dashboard.card,
        padding: spacing.md,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: colors.dashboard.border,
    },
    drawerItemInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        flex: 1,
    },
    drawerItemTitle: {
        fontWeight: '700',
        color: colors.dashboard.textPrimary,
        fontSize: 15,
    },
    drawerItemDesc: {
        color: colors.dashboard.textSecondary,
        fontSize: 12,
        marginTop: 2,
    },
    drawerAddBtn: {
        backgroundColor: colors.dashboard.primary,
        padding: 8,
        borderRadius: 12,
    },
    emptyDrawerText: {
        color: colors.dashboard.textMuted,
        fontStyle: 'italic',
        textAlign: 'center',
        padding: spacing.md,
    }
});
