import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface StatusBadgeProps {
  status: 'DEUDA' | 'PAGADO' | 'PENDIENTE';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const getStatusStyle = () => {
    switch (status) {
      case 'DEUDA':
        return {
          backgroundColor: '#7F1D1D',
          color: '#EF4444',
        };
      case 'PAGADO':
        return {
          backgroundColor: '#064E3B',
          color: '#10B981',
        };
      case 'PENDIENTE':
        return {
          backgroundColor: '#78350F',
          color: '#F59E0B',
        };
      default:
        return {
          backgroundColor: '#374151',
          color: '#9CA3AF',
        };
    }
  };

  const statusStyle = getStatusStyle();

  return (
    <View style={[styles.container, { backgroundColor: statusStyle.backgroundColor }]}>
      <Text style={[styles.text, { color: statusStyle.color }]}>
        {status}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  text: {
    fontSize: 10,
    fontWeight: '500',
    textAlign: 'center',
  },
});