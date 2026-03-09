import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { DashboardWidgetConfig, useDashboard } from '../../../context/DashboardContext';
import { colors } from '../../../theme';

interface Props {
    widget: DashboardWidgetConfig;
    isEditing: boolean;
    children: React.ReactNode;
}

export const DashboardWidgetWrapper: React.FC<Props> = ({ widget: w, isEditing, children }) => {
    const { toggleWidget, resizeWidget } = useDashboard();
    const isSmall = w.size === 'small';

    return (
        <Animated.View
            style={[
                styles.widgetWrapper,
                isSmall ? styles.widgetWrapperSmall : styles.widgetWrapperLarge,
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
                        <TouchableOpacity onPress={() => resizeWidget(w.id, w.size === 'small' ? 'large' : 'small')} style={styles.editBtn}>
                            <Ionicons name={w.size === 'small' ? "expand-outline" : "contract-outline"} size={18} color={colors.dashboard.textPrimary} />
                        </TouchableOpacity>
                    </View>
                </View>
            )}

            <View style={{ flex: 1, opacity: isEditing ? 0.8 : 1 }} pointerEvents={isEditing ? 'none' : 'auto'}>
                {children}
            </View>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
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
    editBtn: {
        backgroundColor: colors.dashboard.background,
        padding: 8,
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
    },
});
