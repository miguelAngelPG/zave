import { FinancialSummary, Transaction, Account } from '../types';
import { apiClient } from './apiClient';
import { storageService } from './storageService';

class FinancialService {
  async getFinancialSummary(): Promise<FinancialSummary> {
    try {
      // Intentar obtener datos del servidor
      const response = await apiClient.get('/financial/summary');
      
      // Guardar en cache local
      await storageService.setItem('financial_summary', response.data);
      
      return response.data;
    } catch (error) {
      // Si falla la conexión, usar datos del cache
      const cachedData = await storageService.getItem('financial_summary');
      if (cachedData) {
        return cachedData;
      }
      
      // Fallback a datos mock para desarrollo
      return this.getMockSummary();
    }
  }

  async getRecentTransactions(limit: number = 10): Promise<Transaction[]> {
    try {
      const response = await apiClient.get(`/transactions/recent?limit=${limit}`);
      await storageService.setItem('recent_transactions', response.data);
      return response.data;
    } catch (error) {
      const cachedData = await storageService.getItem('recent_transactions');
      if (cachedData) {
        return cachedData;
      }
      return this.getMockTransactions();
    }
  }

  async addTransaction(transaction: Omit<Transaction, 'id'>): Promise<Transaction> {
    try {
      const response = await apiClient.post('/transactions', transaction);
      return response.data;
    } catch (error) {
      // Para desarrollo offline, generar ID temporal
      const newTransaction: Transaction = {
        ...transaction,
        id: `temp_${Date.now()}`,
      };
      
      // Guardar en queue para sincronizar después
      await this.addToSyncQueue(newTransaction);
      
      return newTransaction;
    }
  }

  async getAccounts(): Promise<Account[]> {
    try {
      const response = await apiClient.get('/accounts');
      await storageService.setItem('accounts', response.data);
      return response.data;
    } catch (error) {
      const cachedData = await storageService.getItem('accounts');
      if (cachedData) {
        return cachedData;
      }
      return this.getMockAccounts();
    }
  }

  private async addToSyncQueue(transaction: Transaction) {
    const queue = await storageService.getItem('sync_queue') || [];
    queue.push(transaction);
    await storageService.setItem('sync_queue', queue);
  }

  // Mock data para desarrollo
  private getMockSummary(): FinancialSummary {
    return {
      totalBalance: 45230.50,
      monthlyIncome: 15000,
      monthlyExpenses: 12660,
      monthlyChange: 2340,
      accounts: this.getMockAccounts(),
    };
  }

  private getMockAccounts(): Account[] {
    return [
      {
        id: '1',
        name: 'Cuenta Santander',
        type: 'debit',
        balance: 25000,
        institution: 'Santander',
        color: '#EC0000',
      },
      {
        id: '2',
        name: 'TC BBVA',
        type: 'credit',
        balance: 15000,
        institution: 'BBVA',
        color: '#004481',
      },
      {
        id: '3',
        name: 'Efectivo',
        type: 'cash',
        balance: 5230.50,
        institution: 'Cash',
        color: '#10B981',
      },
    ];
  }

  private getMockTransactions(): Transaction[] {
    return [
      {
        id: '1',
        type: 'expense',
        amount: 1250,
        category: 'Supermercado',
        description: 'Walmart Supercenter',
        date: new Date().toISOString(),
        accountId: '1',
        account: 'BBVA',
      },
      {
        id: '2',
        type: 'income',
        amount: 15000,
        category: 'Nómina',
        description: 'Depósito Nómina',
        date: new Date(Date.now() - 86400000).toISOString(),
        accountId: '1',
        account: 'Santander',
      },
      {
        id: '3',
        type: 'expense',
        amount: 800,
        category: 'Gasolina',
        description: 'Gasolinera Pemex',
        date: new Date(Date.now() - 172800000).toISOString(),
        accountId: '2',
        account: 'Banamex',
      },
      {
        id: '4',
        type: 'expense',
        amount: 259,
        category: 'Netflix',
        description: 'Netflix Suscripción',
        date: new Date(Date.now() - 259200000).toISOString(),
        accountId: '1',
        account: 'BBVA',
        msi: {
          totalAmount: 259,
          months: 1,
          monthlyPayment: 259,
          remainingMonths: 0,
          nextPaymentDate: new Date().toISOString(),
        },
      },
    ];
  }
}

export const financialService = new FinancialService();