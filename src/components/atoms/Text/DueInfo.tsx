import { typography } from '@/src/theme';
import React from 'react';
import { StyleSheet, Text } from 'react-native';

interface DueInfoProps {
  info: string;
  urgencyLevel: 'urgent' | 'warning' | 'normal';
}

export const DueInfo: React.FC<DueInfoProps> = ({ info, urgencyLevel }) => {
  const getColor = () => {
    switch (urgencyLevel) {
      case 'urgent': return '#EF4444';
      case 'warning': return '#F59E0B';
      case 'normal': return '#9CA3AF';
      default: return '#9CA3AF';
    }
  };

  return (
    <Text style={[styles.info, { color: getColor() }]}>
      {info}
    </Text>
  );
};

const styles = StyleSheet.create({
  info: {
    fontSize: typography.bodySmall.fontSize,
    fontWeight: typography.bodySmall.fontWeight,
    textAlign: 'center',
    marginTop: 4,
  },
});