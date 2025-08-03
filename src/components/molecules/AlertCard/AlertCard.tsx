import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from '../../atoms/Text/Text';
import { colors, spacing } from '../../../theme';

interface AlertCardProps {
  type: 'urgent' | 'warning' | 'info';
  title: string;
  subtitle: string;
  onPress?: () => void;
}

export const AlertCard: React.FC<AlertCardProps> = ({
  type,
  title,
  subtitle,
  onPress,
}) => {
  const getAlertColor = () => {
    switch (type) {
      case 'urgent':
        return colors.error;
      case 'warning':
        return colors.warning;
      case 'info':
        return colors.primary.main;
      default:
        return colors.primary.main;
    }
  };

  const getAlertIcon = () => {
    switch (type) {
      case 'urgent':
        return '🔴';
      case 'warning':
        return '🟡';
      case 'info':
        return '🔵';
      default:
        return '🔵';
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Text variant="body">{getAlertIcon()}</Text>
        </View>
        <View style={styles.textContainer}>
          <Text variant="body" weight="medium" numberOfLines={1}>
            {title}
          </Text>
          <Text variant="caption" color="secondary" numberOfLines={1}>
            {subtitle}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background.card,
    borderRadius: 12,
    marginVertical: spacing.xs,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary.main,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
  },
  iconContainer: {
    marginRight: spacing.md,
  },
  textContainer: {
    flex: 1,
  },
});