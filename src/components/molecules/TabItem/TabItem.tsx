import { spacing } from '@/src/theme';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { TabName } from '../../../types/navigation.types';
import { TabIcon } from '../../atoms/TabIcon/TabIcon';

interface TabItemProps {
  name: TabName;
  isActive: boolean;
  onPress: () => void;
}

export const TabItem: React.FC<TabItemProps> = ({
  name,
  isActive,
  onPress
}) => (
  <TouchableOpacity
    style={styles.container}
    onPress={onPress}
    activeOpacity={0.7}
  >
    <TabIcon name={name} isActive={isActive} size={20} />
    <Text style={[
      styles.label,
      isActive ? styles.activeLabel : styles.inactiveLabel
    ]}>
      {name}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.sm,
  },
  label: {
    fontSize: 12,
    fontWeight: '400',
    marginTop: 4,
    textAlign: 'center',
  },
  activeLabel: {
    color: '#FFFFFF',
  },
  inactiveLabel: {
    color: '#6B7280',
  },
});