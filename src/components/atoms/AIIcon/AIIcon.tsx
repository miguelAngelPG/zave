import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export const AIIcon: React.FC = () => (
  <View style={styles.container}>
    <Text style={styles.text}>AI</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    width: 24,
    height: 24,
    borderRadius: 8,
    backgroundColor: '#8B5CF6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
  },
});