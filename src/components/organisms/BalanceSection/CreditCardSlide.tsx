import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { View } from 'react-native';
import { colors } from '../../../theme';
import { Text } from '../../atoms/Text/Text';
import { styles } from './BalanceSection.styles';

interface CreditCardSlideProps {
    creditCard: {
        name: string;
        available: number;
        limit: number;
        dueDate: string;
        daysUntilDue: number;
    };
    formatCurrency: (amount: number, compact?: boolean) => string;
}

/**
 * CreditCardSlide - Credit card info slide
 */
export const CreditCardSlide: React.FC<CreditCardSlideProps> = ({ creditCard, formatCurrency }) => {
    const percentageUsed = ((creditCard.limit - creditCard.available) / creditCard.limit) * 100;

    return (
        <>
            <View style={styles.topSection}>
                <View style={styles.labelContainer}>
                    <Ionicons name="card-outline" size={16} color={colors.text.tertiary} />
                    <Text style={styles.label}>{creditCard.name.toUpperCase()}</Text>
                </View>

                <Text style={[styles.bigAmount, { fontSize: 36 }]}>
                    {formatCurrency(creditCard.available)}
                </Text>
                <Text style={styles.subLabel}>Crédito disponible</Text>

                <View style={{ marginTop: 16, alignItems: 'center' }}>
                    <Text style={[styles.progressLabel, { marginBottom: 4 }]}>
                        Vence en {creditCard.daysUntilDue} días • {creditCard.dueDate}
                    </Text>
                    <Text style={[styles.statValue, { fontSize: 12 }]}>
                        {percentageUsed.toFixed(0)}% utilizado
                    </Text>
                </View>
            </View>
        </>
    );
};
