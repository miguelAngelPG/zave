import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { Text } from '../../../components/atoms/Text/Text';
import { AlertCard } from '../../../components/molecules/AlertCard/AlertCard';
import { QuickAction } from '../../../components/molecules/QuickAction/QuickAction';
import { BalanceSection } from '../../../components/organisms/BalanceSection/BalanceSection';
import { colors, spacing } from '../../../theme';
import { TransactionItem } from '../components/TransactionItem';

// Mock data - En producción vendría de Redux/Context/SWR
const mockData = {
  balance: 45230.50,
  monthlyChange: 2340,
  income: 15000,

  expenses: 12660,
  pendingFixedExpenses: 12500, // Mock for Real Balance calculation

  // New Mock Data for Dynamic Slides
  budget: {
    limit: 20000,
    spent: 8240,
    dailyRemaining: 450,
  },
  mainGoal: {
    currentAmount: 12500,
    targetAmount: 35000,
    deadline: 'Dic 2025',
    name: 'Viaje a Japón',
    percentage: 35,
  },
  creditCard: {
    name: 'Nu',
    available: 8500,
    limit: 12000,
    dueDate: '15 Feb',
    daysUntilDue: 4, // Critical (<5)
  },
  savingsChallenge: {
    name: 'Reto 52 Semanas',
    currentWeek: 12,
    totalWeeks: 52,
    savedAmount: 3450,
  },

  alerts: [
    {
      id: '1',
      type: 'urgent' as const,
      title: 'Pago TC BanCoppel',
      subtitle: 'Vence en 3 días',
    },
    {
      id: '2',
      type: 'warning' as const,
      title: 'Meta ahorro vacaciones 70%',
      subtitle: 'Quedan $3,000 para completar',
    },
  ],
  recentTransactions: [
    {
      id: '1',
      type: 'expense' as const,
      amount: 1250,
      category: 'Supermercado',
      description: 'Walmart Supercenter',
      date: 'Hoy',
      account: 'BBVA',
    },
    {
      id: '2',
      type: 'income' as const,
      amount: 15000,
      category: 'Nómina',
      description: 'Depósito Nómina',
      date: 'Ayer',
      account: 'Santander',
    },
    {
      id: '3',
      type: 'expense' as const,
      amount: 800,
      category: 'Gasolina',
      description: 'Gasolinera Pemex',
      date: '2 días',
      account: 'Banamex',
    },
    {
      id: '4',
      type: 'expense' as const,
      amount: 259,
      category: 'Netflix',
      description: 'Netflix Suscripción',
      date: '3 días',
      account: 'BBVA',
    },
  ],
};

export const DashboardScreen: React.FC = () => {
  const handleQuickAction = (action: string) => {
    console.log(`Quick action pressed: ${action}`);
    // Aquí navegarías a la pantalla correspondiente
  };

  const handleTransactionPress = (transactionId: string) => {
    console.log(`Transaction pressed: ${transactionId}`);
  };

  const handleAlertPress = (alertId: string) => {
    console.log(`Alert pressed: ${alertId}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* <StatusBar style="dark" /> */}

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Text variant="h2">☰</Text>
        </TouchableOpacity>
        <Text variant="h2" weight="800">
          Zave
        </Text>
        <TouchableOpacity>
          <Text variant="h2">🔔</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Balance Section */}
        <BalanceSection
          totalBalance={mockData.balance}
          pendingFixedExpenses={mockData.pendingFixedExpenses}
          // Uncomment to see filled state:
          budget={mockData.budget}
          mainGoal={mockData.mainGoal}
          creditCard={mockData.creditCard}
          savingsChallenge={mockData.savingsChallenge}
          alerts={mockData.alerts}
          onManageModules={() => console.log('Open Module Manager')}
        />

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text variant="h3" weight="600" style={styles.sectionTitle}>
            Acciones Rápidas
          </Text>
          <View style={styles.quickActionsContainer}>
            <QuickAction
              icon="💰"
              label="Gasto"
              onPress={() => handleQuickAction('expense')}
            />
            <QuickAction
              icon="💳"
              label="Ingreso"
              onPress={() => handleQuickAction('income')}
            />
            <QuickAction
              icon="📊"
              label="Reportes"
              onPress={() => handleQuickAction('reports')}
            />
            <QuickAction
              icon="🎯"
              label="Metas"
              onPress={() => handleQuickAction('goals')}
            />
          </View>
        </View>

        {/* Alerts */}
        <View style={styles.section}>
          <Text variant="h3" weight="700" style={styles.sectionTitle}>
            Alertas
          </Text>
          {mockData.alerts.map((alert) => (
            <AlertCard
              key={alert.id}
              type={alert.type}
              title={alert.title}
              subtitle={alert.subtitle}
              onPress={() => handleAlertPress(alert.id)}
            />
          ))}
        </View>

        {/* Recent Transactions */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text variant="h3" weight="600">
              Transacciones Recientes
            </Text>
            <TouchableOpacity>
              <Text variant="caption" style={{ color: colors.primary[500] }}>
                Ver todas
              </Text>
            </TouchableOpacity>
          </View>

          {mockData.recentTransactions.map((transaction) => (
            <TransactionItem
              key={transaction.id}
              transaction={transaction}
              onPress={() => handleTransactionPress(transaction.id)}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.background.primary,
  },
  scrollView: {
    flex: 1,
  },
  section: {
    paddingHorizontal: spacing.md,
    marginVertical: spacing.md,
  },
  sectionTitle: {
    marginBottom: spacing.md,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  quickActionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.sm,
  },
});