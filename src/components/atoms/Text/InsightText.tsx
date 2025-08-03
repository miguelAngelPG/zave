import { typography } from '@/src/theme';
import React from 'react';
import { StyleSheet, Text, TextStyle } from 'react-native';

interface InsightTextProps {
  children: React.ReactNode;
  type?: 'primary' | 'secondary';
  highlightColor?: string;
}

export const InsightText: React.FC<InsightTextProps> = ({ 
  children, 
  type = 'primary',
  highlightColor 
}) => (
  <Text style={[
    type === 'primary' ? styles.primary : styles.secondary,
    highlightColor && { color: highlightColor }
  ]}>
    {children}
  </Text>
);

const styles = StyleSheet.create({
  primary: {
    color: '#FFFFFF',
    fontSize: typography.bodySmall.fontSize,
    fontWeight: typography.bodySmall.fontWeight,
    lineHeight: 20,
  } as TextStyle,
  secondary: {
    color: '#9CA3AF',
    fontSize: typography.caption.fontSize,
    fontWeight: typography.caption.fontWeight,
    marginTop: 4,
  } as TextStyle,
});