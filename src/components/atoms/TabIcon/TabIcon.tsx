import { Ionicons } from '@expo/vector-icons';
import React from 'react';

interface TabIconProps {
  name: string;
  isActive: boolean;
  size?: number;
}

export const TabIcon: React.FC<TabIconProps> = ({ 
  name, 
  isActive, 
  size = 20 
}) => {
  const getIconName = (name: string): keyof typeof Ionicons.glyphMap => {
    switch (name) {
      case 'Inicio': return 'home';
      case 'Cuentas': return 'card';
      case 'Analisis': return 'pie-chart';
      case 'Metas': return 'accessibility';
      case 'Pagos': return 'calendar';
      default: return 'home';
    }
  };

  return (
    <Ionicons
      name={getIconName(name)}
      size={size}
      color={isActive ? '#FFFFFF' : '#6B7280'}
    />
  );
};