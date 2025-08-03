import { useState, useEffect } from 'react';
import { notificationService } from '../services/notificationService';

export interface Alert {
  id: string;
  type: 'urgent' | 'warning' | 'info';
  title: string;
  subtitle: string;
  date: string;
  read: boolean;
  actionUrl?: string;
}

export const useNotifications = () => {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAlerts();
  }, []);

  const loadAlerts = async () => {
    try {
      setLoading(true);
      const alertsData = await notificationService.getAlerts();
      setAlerts(alertsData);
      setUnreadCount(alertsData.filter(alert => !alert.read).length);
    } catch (error) {
      console.error('Error loading alerts:', error);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (alertId: string) => {
    try {
      await notificationService.markAsRead(alertId);
      setAlerts(prev => 
        prev.map(alert => 
          alert.id === alertId ? { ...alert, read: true } : alert
        )
      );
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (error) {
      console.error('Error marking alert as read:', error);
    }
  };

  return {
    alerts,
    unreadCount,
    loading,
    markAsRead,
    refetch: loadAlerts,
  };
};