import React from 'react';
import { StyleSheet, View } from 'react-native';

interface UrgencyIndicatorProps {
  urgencyLevel: 'urgent' | 'warning' | 'normal';
}

export const UrgencyIndicator: React.FC<UrgencyIndicatorProps> = ({ urgencyLevel }) => {
  const getColor = () => {
    switch (urgencyLevel) {
      case 'urgent': return '#EF4444';
      case 'warning': return '#F59E0B';
      case 'normal': return '#10B981';
      default: return '#9CA3AF';
    }
  };

  return <View style={[styles.dot, { backgroundColor: getColor() }]} />;
};

const styles = StyleSheet.create({
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
});