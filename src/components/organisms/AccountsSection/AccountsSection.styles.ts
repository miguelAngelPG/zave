import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        gap: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    addButton: {
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderRadius: 20,
        width: 36,
        height: 36,
    },
    scrollContent: {
        gap: 16,
        paddingRight: 24,
    },
    scrollStyle: {
        marginHorizontal: -24,
        paddingHorizontal: 24,
    },
    cardContainer: {
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 18,
        elevation: 8,
    },
    card: {
        width: 160,
        height: 210,
        borderRadius: 24,
        padding: 20,
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.15)',
        overflow: 'hidden',
    },
    chip: {
        width: 28,
        height: 20,
        borderRadius: 4,
        backgroundColor: '#fbbf24', // Gold
        opacity: 0.8,
    },
    cardMiddle: {
        gap: 4,
    },
    fieldLabel: {
        color: 'rgba(255,255,255,0.7)',
        fontSize: 12,
        fontWeight: '600',
        textTransform: 'uppercase',
    },
    amount: {
        color: 'white',
        fontSize: 26,
        fontWeight: '800',
        letterSpacing: -1,
    },
    cardNumber: {
        color: 'rgba(255,255,255,0.5)',
        fontSize: 12,
        fontWeight: '500',
        letterSpacing: 2,
        marginTop: 4,
    },
    cardBottom: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    topRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    dateBadge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        backgroundColor: 'rgba(0,0,0,0.2)',
        borderRadius: 6,
    },
    dateText: {
        color: 'white',
        fontSize: 10,
        fontWeight: '600',
    },
    logoContainer: {
        flexDirection: 'row',
    },
    circle: {
        width: 18,
        height: 18,
        borderRadius: 9,
    },
});
