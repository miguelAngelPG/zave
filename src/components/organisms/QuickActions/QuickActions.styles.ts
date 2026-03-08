import { StyleSheet } from 'react-native';
import { colors, spacing, typography } from '../../../theme';

export const styles = StyleSheet.create({
    container: {
        marginBottom: spacing.md,
        paddingHorizontal: spacing.md,
    },
    actionsWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        backgroundColor: 'rgba(255,255,255,0.03)',
        borderRadius: 24,
        padding: spacing.md,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.05)',
    },
    actionItem: {
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        flex: 1,
    },
    iconContainer: {
        width: 48,
        height: 48,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.05)',
    },
    label: {
        ...typography.caption,
        fontSize: 11,
        color: colors.text.secondary,
        textAlign: 'center',
        fontWeight: '500',
    },
});
