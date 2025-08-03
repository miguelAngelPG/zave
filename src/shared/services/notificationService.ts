import { Alert } from '../hooks/useNotifications';
import { apiClient } from './apiClient';
import { storageService } from './storageService';

class NotificationService {
  async getAlerts(): Promise<Alert[]> {
    try {
      const response = await apiClient.get('/notifications/alerts');
      await storageService.setItem('alerts', response.data);
      return response.data;
    } catch (error) {
      const cachedData = await storageService.getItem('alerts');
      if (cachedData) {
        return cachedData;
      }
      return this.getMockAlerts();
    }
  }

  async markAsRead(alertId: string): Promise<void> {
    try {
      await apiClient.patch(`/notifications/alerts/${alertId}/read`);
    } catch (error) {
      // Manejar offline - marcar en cache local
      const alerts = await storageService.getItem('alerts') || [];
      const updatedAlerts = alerts.map((alert: Alert) =>
        alert.id === alertId ? { ...alert, read: true } : alert
      );
      await storageService.setItem('alerts', updatedAlerts);
    }
  }

  private getMockAlerts(): Alert[] {
    return [
      {
        id: '1',
        type: 'urgent',
        title: 'Pago TC BanCoppel',
        subtitle: 'Vence en 3 días',
        date: new Date().toISOString(),
        read: false,
        actionUrl: '/payments/1',
      },
      {
        id: '2',
        type: 'warning',
        title: 'Meta ahorro vacaciones 70%',
        subtitle: 'Quedan $3,000 para completar',
        date: new Date().toISOString(),
        read: false,
        actionUrl: '/savings/vacation',
      },
    ];
  }
}

export const notificationService = new NotificationService();