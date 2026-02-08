import { StyleSheet } from 'react-native';
import { colors, spacing } from '../../../theme';

export const styles = StyleSheet.create({
    container: {
        marginVertical: 0,
        width: '100%',
        alignItems: 'center',
    },
    carouselContainer: {
        height: 280,
    },
    slideContainer: {
        width: '100%',
        alignItems: 'center',
    },
    topSection: {
        paddingVertical: spacing.md,
        paddingHorizontal: spacing.sm,
        alignItems: 'center',
        width: '100%',
        position: 'relative',
    },
    labelContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: spacing.xs,
        gap: spacing.xs,
    },
    label: {
        fontSize: 11,
        color: colors.text.tertiary,
        fontWeight: '500',
        letterSpacing: 0.5,
        textTransform: 'uppercase',
    },
    indicator: {
        width: 6,
        height: 6,
        borderRadius: 3,
    },
    bigAmount: {
        fontSize: 48,
        fontWeight: '700',
        color: colors.text.inverse,
        textAlign: 'center',
        marginVertical: 2,
        lineHeight: 52,
        width: '90%',
    },
    subLabel: {
        fontSize: 12,
        color: colors.text.tertiary,
        textAlign: 'center',
        marginTop: spacing.xs,
    },
    separator: {
        height: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        width: '50%',
        marginVertical: spacing.md,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: spacing.md,
    },
    statColumn: {
        flex: 1,
        alignItems: 'center',
    },
    iconRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.xs,
        marginBottom: spacing.xs,
    },
    statLabel: {
        fontSize: 11,
        color: colors.text.tertiary,
        fontWeight: '500',
        letterSpacing: 0.5,
        textTransform: 'uppercase',
    },
    statValue: {
        fontSize: 16,
        fontWeight: '600',
        color: colors.text.inverse,
    },
    verticalLine: {
        width: 1,
        height: 40,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
    // Pagination
    paginationContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: spacing.md,
        gap: spacing.xs,
    },
    dot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: colors.text.tertiary,
        opacity: 0.3,
    },
    activeDot: {
        width: 20,
        opacity: 1,
        backgroundColor: colors.text.inverse,
    },
    // Empty States
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: spacing.xl,
        gap: spacing.md,
    },
    emptyIcon: {
        marginBottom: spacing.sm,
    },
    emptyTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: colors.text.inverse,
        textAlign: 'center',
    },
    emptySubtitle: {
        fontSize: 14,
        color: colors.text.tertiary,
        textAlign: 'center',
        marginBottom: spacing.sm,
    },
    addButton: {
        backgroundColor: colors.primary[500],
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.sm,
        borderRadius: 12,
    },
    addButtonText: {
        color: colors.text.inverse,
        fontSize: 14,
        fontWeight: '600',
    },
    // Progress
    progressContainer: {
        marginTop: spacing.md,
        width: '100%',
    },
    progressLabel: {
        fontSize: 12,
        color: colors.text.tertiary,
        marginBottom: spacing.xs,
        textAlign: 'center',
    },
});
