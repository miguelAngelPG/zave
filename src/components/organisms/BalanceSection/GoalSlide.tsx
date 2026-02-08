import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { View } from 'react-native';
import { colors } from '../../../theme';
import { ProgressBar } from '../../atoms/ProgressBar/ProgressBar';
import { Text } from '../../atoms/Text/Text';
import { styles } from './BalanceSection.styles';

interface GoalSlideProps {
    goal: {
        currentAmount: number;
        targetAmount: number;
        deadline: string;
        name: string;
        percentage: number;
    };
    formatCurrency: (amount: number, compact?: boolean) => string;
}

/**
 * GoalSlide - Savings goal tracking slide
 */
export const GoalSlide: React.FC<GoalSlideProps> = ({ goal, formatCurrency }) => {
    return (
        <>
            <View style={styles.topSection}>
                <View style={styles.labelContainer}>
                    <Ionicons name="flag-outline" size={16} color={colors.text.tertiary} />
                    <Text style={styles.label}>META PRINCIPAL</Text>
                </View>

                <Text style={styles.emptyTitle}>{goal.name}</Text>
                <Text style={[styles.bigAmount, { fontSize: 36 }]}>
                    {formatCurrency(goal.currentAmount)}
                </Text>
                <Text style={styles.subLabel}>
                    de {formatCurrency(goal.targetAmount)} • {goal.deadline}
                </Text>

                <View style={styles.progressContainer}>
                    <ProgressBar progress={goal.percentage} height={8} />
                    <Text style={[styles.progressLabel, { textAlign: 'center', marginTop: 4 }]}>
                        {goal.percentage.toFixed(0)}% completado
                    </Text>
                </View>
            </View>
        </>
    );
};
