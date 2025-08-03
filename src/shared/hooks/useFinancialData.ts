import { useState, useEffect } from 'react';
import { FinancialSummary, Transaction } from '../types';
import { financialService } from '../services/financialService';

export const useFinancialData = () => {
  const [summary, setSummary] = useState<FinancialSummary | null>(null);
  const [recentTransactions, setRecentTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadFinancialData();
  }, []);

  const loadFinancialData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [summaryData, transactionsData] = await Promise.all([
        financialService.getFinancialSummary(),
        financialService.getRecentTransactions(10),
      ]);
      
      setSummary(summaryData);
      setRecentTransactions(transactionsData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  const addTransaction = async (transaction: Omit<Transaction, 'id'>) => {
    try {
      const newTransaction = await financialService.addTransaction(transaction);
      setRecentTransactions(prev => [newTransaction, ...prev.slice(0, 9)]);
      // Recargar summary para actualizar balances
      const updatedSummary = await financialService.getFinancialSummary();
      setSummary(updatedSummary);
      return newTransaction;
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Error al agregar transacción');
    }
  };

  return {
    summary,
    recentTransactions,
    loading,
    error,
    refetch: loadFinancialData,
    addTransaction,
  };
};