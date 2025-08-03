import { spacing, typography } from '@/src/theme';
import React from 'react';
import { StyleSheet, Text } from 'react-native';

interface SubtitleTextProps {
  children: React.ReactNode;
}

export const SubtitleText: React.FC<SubtitleTextProps> = ({ children }) => (
  <Text style={styles.subtitle}>{children}</Text>
);

const styles = StyleSheet.create({
  subtitle: {
    color: '#9CA3AF', // darkTheme.text.secondary
    fontSize: typography.body.fontSize,
    fontWeight: typography.body.fontWeight,
    textAlign: 'center',
    marginTop: spacing.md,
    marginBottom: spacing.xl,
  },
});