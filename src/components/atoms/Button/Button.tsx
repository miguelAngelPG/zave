import React from 'react';
import {
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { Text } from '../Text/Text';
import { colors, spacing, shadows } from '../../../theme';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';
type ButtonSize = 'small' | 'medium' | 'large';

interface ButtonProps extends Omit<TouchableOpacityProps, 'style'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children: React.ReactNode;
  style?: any;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  loading = false,
  disabled = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  children,
  style,
  ...props
}) => {
  const isDisabled = disabled || loading;

  // Estilos por variante
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return {
          backgroundColor: isDisabled ? colors.text.disabled : colors.primary[600],
          borderWidth: 0,
        };
      case 'secondary':
        return {
          backgroundColor: isDisabled ? colors.text.disabled : colors.text.primary,
          borderWidth: 0,
        };
      case 'outline':
        return {
          backgroundColor: 'transparent',
          borderWidth: 1.5,
          borderColor: isDisabled ? colors.text.disabled : colors.primary[600],
        };
      case 'ghost':
        return {
          backgroundColor: isDisabled 
            ? 'transparent' 
            : `${colors.primary[600]}10`, // 10% opacity
          borderWidth: 0,
        };
      case 'destructive':
        return {
          backgroundColor: isDisabled ? colors.text.disabled : colors.semantic.error,
          borderWidth: 0,
        };
      default:
        return {};
    }
  };

  // Estilos por tamaño
  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return {
          paddingHorizontal: spacing.md,
          paddingVertical: spacing.sm,
          borderRadius: 8,
          minHeight: 36,
        };
      case 'medium':
        return {
          paddingHorizontal: spacing.lg,
          paddingVertical: spacing.md,
          borderRadius: 12,
          minHeight: 48,
        };
      case 'large':
        return {
          paddingHorizontal: spacing.xl,
          paddingVertical: spacing.lg,
          borderRadius: 16,
          minHeight: 56,
        };
      default:
        return {};
    }
  };

  // Color del texto según variante
  const getTextColor = () => {
    if (isDisabled) {
      return variant === 'outline' || variant === 'ghost' 
        ? colors.text.disabled 
        : colors.text.inverse;
    }

    switch (variant) {
      case 'primary':
      case 'secondary':
      case 'destructive':
        return colors.text.inverse;
      case 'outline':
      case 'ghost':
        return colors.primary[600];
      default:
        return colors.text.inverse;
    }
  };

  // Tamaño del texto según size del botón
  const getTextVariant = () => {
    switch (size) {
      case 'small':
        return 'bodySmall' as const;
      case 'medium':
        return 'body' as const;
      case 'large':
        return 'body' as const;
      default:
        return 'body' as const;
    }
  };

  const buttonStyles = [
    styles.base,
    getVariantStyles(),
    getSizeStyles(),
    fullWidth && styles.fullWidth,
    (variant === 'primary' || variant === 'secondary') && !isDisabled && shadows.small,
    style,
  ];

  return (
    <TouchableOpacity
      style={buttonStyles}
      disabled={isDisabled}
      activeOpacity={isDisabled ? 1 : 0.8}
      {...props}
    >
      <View style={styles.content}>
        {loading ? (
          <ActivityIndicator 
            size="small" 
            color={getTextColor()} 
            style={styles.loader}
          />
        ) : (
          <>
            {leftIcon && (
              <View style={styles.leftIcon}>
                {leftIcon}
              </View>
            )}
            
            <Text
              variant={getTextVariant()}
              color={getTextColor()}
              weight="600"
              style={styles.text}
            >
              {children}
            </Text>
            
            {rightIcon && (
              <View style={styles.rightIcon}>
                {rightIcon}
              </View>
            )}
          </>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  fullWidth: {
    width: '100%',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
  },
  leftIcon: {
    marginRight: spacing.sm,
  },
  rightIcon: {
    marginLeft: spacing.sm,
  },
  loader: {
    // El ActivityIndicator ya maneja su propio espaciado
  },
});