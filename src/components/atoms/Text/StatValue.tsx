import React from 'react';
import { StyleSheet, Text, TextStyle } from 'react-native';

interface StatValueProps {
  value: string;
  isPositive?: boolean;
  isRed?: boolean;
  isOrange?: boolean;
}

export const StatValue: React.FC<StatValueProps> = ({ 
  value, 
  isPositive = false,
  isRed = false,
  isOrange = false
}) => (
  <Text style={[
    styles.value, 
    isPositive && styles.positive,
    isRed && styles.red,
    isOrange && styles.orange
  ]}>
    {value}
  </Text>
);

const styles = StyleSheet.create({
  value: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: '400',
    textAlign: 'center',
  } as TextStyle,
  positive: {
    color: '#10B981', // Verde
  } as TextStyle,
  red: {
    color: '#EF4444', // Rojo
  } as TextStyle,
  orange: {
    color: '#F59E0B', // Naranja
  } as TextStyle,
});