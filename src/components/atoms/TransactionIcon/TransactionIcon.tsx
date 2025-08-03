import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface TransactionIconProps {
  emoji: string;
  backgroundColor?: string;
}

export const TransactionIcon: React.FC<TransactionIconProps> = ({
  emoji,
  backgroundColor = '#374151'
}) => (
  <View style={[styles.container, { backgroundColor }]}>
    <Text style={styles.emoji}>{emoji}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emoji: {
    fontSize: 18,
  },
});