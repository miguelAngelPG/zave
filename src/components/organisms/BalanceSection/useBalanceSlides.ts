import { useMemo } from 'react';

interface UseBalanceSlidesProps {
    budget?: {
        limit: number;
        spent: number;
        dailyRemaining: number;
    };
    mainGoal?: {
        currentAmount: number;
        targetAmount: number;
        deadline: string;
        name: string;
        percentage: number;
    };
    creditCard?: {
        name: string;
        available: number;
        limit: number;
        dueDate: string;
        daysUntilDue: number;
    };
    savingsChallenge?: {
        name: string;
        currentWeek: number;
        totalWeeks: number;
        savedAmount: number;
    };
    alerts?: {
        type: 'urgent' | 'warning' | 'info';
        title: string;
        subtitle: string;
    }[];
}

export type SlideType =
    | { type: 'balance'; priority: number }
    | { type: 'budget'; priority: number; data: any }
    | { type: 'goal'; priority: number; data: any }
    | { type: 'creditCard'; priority: number; data: any }
    | { type: 'alert'; priority: number; data: any }
    | { type: 'config'; priority: number };

/**
 * useBalanceSlides - Hook to manage slide configuration and priority
 */
export const useBalanceSlides = ({
    budget,
    mainGoal,
    creditCard,
    savingsChallenge,
    alerts = [],
}: UseBalanceSlidesProps) => {
    const slides = useMemo(() => {
        // Analyze context
        const isBudgetCritical = budget && (budget.limit - budget.spent) / budget.limit < 0.2;
        const isGoalClose = mainGoal && mainGoal.percentage >= 90;
        const isCreditCardUrgent = creditCard && creditCard.daysUntilDue <= 5;
        const criticalAlert = alerts.find(a => a.type === 'urgent');

        const rawSlides: SlideType[] = [
            { type: 'balance', priority: 5 }, // Default home
        ];

        // Critical alert
        if (criticalAlert) {
            rawSlides.push({ type: 'alert', priority: 10, data: criticalAlert });
        }

        // Budget
        if (budget) {
            rawSlides.push({
                type: 'budget',
                priority: isBudgetCritical ? 8 : 4,
                data: budget,
            });
        }

        // Goal
        if (mainGoal) {
            rawSlides.push({
                type: 'goal',
                priority: isGoalClose ? 7 : 3,
                data: mainGoal,
            });
        }

        // Credit card
        if (creditCard) {
            rawSlides.push({
                type: 'creditCard',
                priority: isCreditCardUrgent ? 9 : 6,
                data: creditCard,
            });
        }

        // Unified Configuration Slide (If elements are missing)
        if (!budget || !mainGoal) {
            rawSlides.push({ type: 'config', priority: 1 });
        }

        // Sort by priority (highest first)
        return rawSlides.sort((a, b) => b.priority - a.priority);
    }, [budget, mainGoal, creditCard, savingsChallenge, alerts]);

    return { slides };
};
