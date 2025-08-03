import React from 'react';
import { StyleSheet, View } from 'react-native';

interface BankIndicatorProps {
  color: string;
}

export const BankIndicator: React.FC<BankIndicatorProps> = ({ color }) => (
  <View style={[styles.dot, { backgroundColor: color }]} />
);

const styles = StyleSheet.create({
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
});