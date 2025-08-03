import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { Text } from '../../atoms/Text/Text';
import { colors, spacing } from '../../../theme';

interface QuickActionProps {
  icon: string;
  label: string;
  onPress: () => void;
  backgroundColor?: string;
}

export const QuickAction: React.FC<QuickActionProps> = ({
  icon,
  label,
  onPress,
  backgroundColor = colors.background.secondary,
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={[styles.iconContainer, { backgroundColor }]}>
        <Text variant="h2">{icon}</Text>
      </View>
      <Text variant="caption" color="secondary" style={styles.label}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  label: {
    textAlign: 'center',
    fontSize: 12,
  },
});