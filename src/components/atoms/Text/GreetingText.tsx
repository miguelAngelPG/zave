import { spacing, typography } from '@/src/theme';
import React from 'react';
import { StyleSheet, Text } from 'react-native';

interface GreetingTextProps {
  children: React.ReactNode;
}

export const GreetingText: React.FC<GreetingTextProps> = ({ children }) => (
  <Text style={styles.greeting}>{children}</Text>
);

const styles = StyleSheet.create({
  greeting: {
    color: '#FFFFFF', // darkTheme.text.primary
    fontSize: typography.h2.fontSize,
    fontWeight: '400' as const,
    textAlign: 'center',
    marginBottom: spacing.xl + spacing.md, // 48px
  },
});