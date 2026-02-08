import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { View } from 'react-native';
import { colors } from '../../../theme';
import { ProgressBar } from '../../atoms/ProgressBar/ProgressBar';
import { Text } from '../../atoms/Text/Text';
import { styles } from './BalanceSection.styles';

interface BudgetSlideProps {
    budget: {
        limit: number;
        spent: number;
        dailyRemaining: number;
    };
    formatCurrency: (amount: number, compact?: boolean) => string;
}

/**
 * BudgetSlide - Budget tracking slide
 */
export const BudgetSlide: React.FC<BudgetSlideProps> = ({ budget, formatCurrency }) => {
    const percentageUsed = (budget.spent / budget.limit) * 100;

    return (
        <>
            <View style={styles.topSection}>
                <View style={styles.labelContainer}>
                    <Ionicons name="wallet-outline" size={16} color={colors.text.tertiary} />
                    <Text style={styles.label}>PRESUPUESTO MENSUAL</Text>
                </View>

                <Text style={[styles.bigAmount, { fontSize: 42 }]}>
                    {formatCurrency(budget.dailyRemaining)}
                </Text>
                <Text style={styles.subLabel}>Disponible hoy</Text>

                <View style={styles.progressContainer}>
                    <Text style={styles.progressLabel}>
                        {formatCurrency(budget.spent)} de {formatCurrency(budget.limit)}
                    </Text>
                    <ProgressBar progress={percentageUsed} height={8} />
                </View>
            </View>
        </>
    );
};
