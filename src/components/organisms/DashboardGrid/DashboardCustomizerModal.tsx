import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Modal, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useDashboard } from '../../../context/DashboardContext';
import { colors, spacing } from '../../../theme';
import { Text } from '../../atoms/Text/Text';

interface Props {
    visible: boolean;
    onClose: () => void;
}

export const DashboardCustomizerModal: React.FC<Props> = ({ visible, onClose }) => {
    const { widgets, toggleWidget, moveWidget } = useDashboard();

    return (
        <Modal
            visible={visible}
            animationType="slide"
            transparent={true}
            onRequestClose={onClose}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContainer}>
                    <View style={styles.header}>
                        <View>
                            <Text style={styles.title}>Personalizar Panorama</Text>
                            <Text style={styles.subtitle}>Activa, apaga o reordena los bloques.</Text>
                        </View>
                        <TouchableOpacity onPress={onClose} hitSlop={10}>
                            <Ionicons name="close-circle" size={28} color={colors.text.secondary} />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.list}>
                        {widgets.map((widget, index) => (
                            <View key={widget.id} style={[styles.listItem, !widget.visible && styles.listItemDisabled]}>
                                <View style={styles.itemInfo}>
                                    <View style={styles.itemTextContainer}>
                                        <Text style={styles.itemTitle}>{widget.title}</Text>
                                        <Text style={styles.itemDesc}>{widget.description}</Text>
                                    </View>
                                </View>

                                <View style={styles.actions}>
                                    <View style={styles.arrows}>
                                        <TouchableOpacity
                                            onPress={() => moveWidget(widget.id, 'up')}
                                            disabled={index === 0}
                                        >
                                            <Ionicons name="chevron-up" size={24} color={index === 0 ? colors.dashboard.chartInactive : colors.dashboard.textSecondary} />
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={() => moveWidget(widget.id, 'down')}
                                            disabled={index === widgets.length - 1}
                                        >
                                            <Ionicons name="chevron-down" size={24} color={index === widgets.length - 1 ? colors.dashboard.chartInactive : colors.dashboard.textSecondary} />
                                        </TouchableOpacity>
                                    </View>

                                    <TouchableOpacity
                                        style={[styles.toggle, widget.visible ? styles.toggleOn : styles.toggleOff]}
                                        onPress={() => toggleWidget(widget.id)}
                                    >
                                        <View style={[styles.knob, widget.visible ? styles.knobOn : styles.knobOff]} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ))}
                    </View>

                    <TouchableOpacity style={styles.saveBtn} onPress={onClose}>
                        <Text style={styles.saveText}>Ocultar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.6)',
        justifyContent: 'flex-end',
    },
    modalContainer: {
        backgroundColor: colors.dashboard.background,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        padding: spacing.lg,
        paddingBottom: spacing.xl * 1.5,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: spacing.xl,
    },
    title: {
        color: colors.dashboard.textPrimary,
        fontSize: 20,
        fontWeight: '700',
        marginBottom: 4,
    },
    subtitle: {
        color: colors.dashboard.textSecondary,
        fontSize: 14,
    },
    list: {
        gap: spacing.md,
        marginBottom: spacing.xl,
    },
    listItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: colors.dashboard.card,
        padding: spacing.md,
        borderRadius: 16,
        borderWidth: 1.5,
        borderColor: colors.dashboard.border,
    },
    listItemDisabled: {
        opacity: 0.5,
    },
    itemInfo: {
        flexDirection: 'row',
        flex: 1,
    },
    itemTextContainer: {
        flex: 1,
    },
    itemTitle: {
        color: colors.dashboard.textPrimary,
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 2,
    },
    itemDesc: {
        color: colors.dashboard.textSecondary,
        fontSize: 12,
    },
    actions: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    arrows: {
        flexDirection: 'column',
    },
    toggle: {
        width: 44,
        height: 24,
        borderRadius: 12,
        backgroundColor: colors.dashboard.chartInactive,
        padding: 2,
        justifyContent: 'center',
    },
    toggleOn: {
        backgroundColor: colors.dashboard.success,
    },
    toggleOff: {},
    knob: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: colors.text.inverse,
    },
    knobOn: {
        alignSelf: 'flex-end',
    },
    knobOff: {
        alignSelf: 'flex-start',
    },
    saveBtn: {
        backgroundColor: colors.primary[600],
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: 'center',
    },
    saveText: {
        color: colors.text.inverse,
        fontSize: 16,
        fontWeight: '700',
    },
});
