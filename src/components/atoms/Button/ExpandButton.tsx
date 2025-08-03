import { spacing, typography } from '@/src/theme';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

interface ExpandButtonProps {
  onPress: () => void;
  isExpanded?: boolean;
}

export const ExpandButton: React.FC<ExpandButtonProps> = ({ 
  onPress, 
  isExpanded = false 
}) => (
  <TouchableOpacity 
    style={styles.button} 
    onPress={onPress}
    activeOpacity={0.7}
  >
    <Text style={styles.text}>Ver cálculo</Text>
    <Ionicons 
      name={isExpanded ? "chevron-up" : "chevron-down"} 
      size={14} 
      color="#6B7280" // darkTheme.text.tertiary
      style={styles.icon}
    />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xl + spacing.md, // 48px
  },
  text: {
    color: '#6B7280', // darkTheme.text.tertiary
    fontSize: typography.bodySmall.fontSize,
    fontWeight: typography.bodySmall.fontWeight,
  },
  icon: {
    marginLeft: spacing.sm,
  },
});