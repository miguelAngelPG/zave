import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface AccountIconProps {
  bankCode: string;
  backgroundColor: string;
  iconColor: string;
}

export const AccountIcon: React.FC<AccountIconProps> = ({
  bankCode,
  backgroundColor,
  iconColor
}) => (
  <View style={[styles.container, { backgroundColor }]}>
    <Text style={[styles.icon, { color: iconColor }]}>🏛️</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    fontSize: 20,
  },
});