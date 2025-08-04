import { Header } from "@/src/components/molecules/AlertCard/Header";
import { AccountsSection } from "@/src/components/organisms/AccountsSection/AccountsSection";
import { ActivitySection } from "@/src/components/organisms/ActivitySection/ActivitySection";
import { BalanceSection } from "@/src/components/organisms/BalanceSection/BalanceSection";
import { InsightsSection } from "@/src/components/organisms/InsightsSection/InsightsSection";
import { AccountData } from "@/src/types/accounts.types";
import { TransactionData } from "@/src/types/activity.types";
import { StatsData } from "@/src/types/balance.types";
import { InsightData } from "@/src/types/insights.types";
import { ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {

    const statsData: StatsData = {
        spent: "23%",
        credit: "1.7%",
        days: "16",
        goal: "68%"
    };

    const accountsData: AccountData[] = [
        {
            id: '1',
            name: 'BBVA',
            bankCode: 'BBVA',
            amount: 2450,
            dueInfo: 'Vence mañana',
            urgencyLevel: 'urgent',
            backgroundColor: '#3B82F6',
            iconColor: '#FFFFFF',
        },
        {
            id: '2',
            name: 'Santander',
            bankCode: 'SAN',
            amount: 1890,
            dueInfo: 'Vence en 5 días',
            urgencyLevel: 'warning',
            backgroundColor: '#EF4444',
            iconColor: '#FFFFFF',
        },
        {
            id: '3',
            name: 'Nu Bank',
            bankCode: 'NU',
            amount: 5420,
            dueInfo: 'Disponible',
            urgencyLevel: 'normal',
            backgroundColor: '#8B5CF6',
            iconColor: '#FFFFFF',
        },
    ];

    const insightsData: InsightData[] = [
        {
            id: '1',
            message: 'Puedes ahorrar $340 reduciendo gastos en entretenimiento',
            type: 'positive',
        },
        {
            id: '2',
            message: 'Tu meta mensual va 12% adelantada',
            subtitle: 'Tendencia positiva • Sigue así',
            type: 'achievement',
        },
    ];

    const transactionsData: TransactionData[] = [
        {
            id: '1',
            name: 'Walmart',
            amount: 1250,
            date: 'Hoy,',
            time: '14:30',
            status: 'DEUDA',
            type: 'expense',
            emoji: '🛒',
        },
        {
            id: '2',
            name: 'Depósito Nómina',
            amount: 15000,
            date: 'Ayer,',
            time: '09:00',
            status: 'PAGADO',
            type: 'income',
            emoji: '💰',
            bankIndicatorColor: '#3B82F6',
        },
    ];

    const handleTransactionPress = (transactionId: string): void => {
        console.log('Transaction pressed:', transactionId);
    };

    const handleViewAllActivity = (): void => {
        console.log('View all activity');
    };

    const handleViewMoreInsights = (): void => {
        console.log('View more insights pressed');
    };

    const handleInsightPress = (insightId: string): void => {
        console.log('Insight pressed:', insightId);
    };

    const handleExpandPress = (isExpanded: boolean): void => {
        console.log('Balance expanded:', isExpanded);
    };

    const handleAccountPress = (accountId: string): void => {
        console.log('Account pressed:', accountId);
    };

    const handleManagePress = (): void => {
        console.log('Manage accounts pressed');
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#000000' }}>
            <Header
                userName="Carlos"
                // userPhoto="https://..."
                onProfilePress={() => { }}
                onAIPress={() => { }}
                onNotificationsPress={() => { }}
                hasNotifications={true}
            />
            <ScrollView
                style={styles.container}
                showsVerticalScrollIndicator={false}
                bounces={false}
            >
                <BalanceSection
                    greeting="¡Buen día!"
                    amount={5247}
                    subtitle="Tienes disponible para gastar"
                    stats={statsData}
                    onExpandPress={handleExpandPress}
                />
                <AccountsSection
                    accounts={accountsData}
                    onAccountPress={handleAccountPress}
                    onManagePress={handleManagePress}
                />

                <InsightsSection
                    insights={insightsData}
                    onViewMore={handleViewMoreInsights}
                    onInsightPress={handleInsightPress}
                />

                <ActivitySection
                    transactions={transactionsData}
                    onTransactionPress={handleTransactionPress}
                    onViewAll={handleViewAllActivity}
                />
            </ScrollView>
            {/* <DashboardScreen /> */}

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000', // darkTheme.background.primary
    },
});