import React from 'react';
import { Text as RNText, TextProps as RNTextProps, StyleSheet } from 'react-native';
import { typography, colors } from '../../../theme';

interface TextProps extends RNTextProps {
  variant?: keyof typeof typography;
  color?: keyof typeof colors.text | keyof typeof colors.semantic | string;
  weight?: '300' | '400' | '500' | '600' | '700' | '800';
  align?: 'left' | 'center' | 'right';
}

export const Text: React.FC<TextProps> = ({
  variant = 'body',
  color = 'primary',
  weight,
  align = 'left',
  style,
  children,
  ...props
}) => {
  // Resolver color
  const resolvedColor = 
    colors.text[color as keyof typeof colors.text] ||
    colors.semantic[color as keyof typeof colors.semantic] ||
    color;

  const textStyle = [
    styles.base,
    typography[variant],
    {
      color: resolvedColor,
      textAlign: align,
    },
    weight && { fontWeight: weight },
    style,
  ];

  return (
    <RNText style={textStyle} {...props}>
      {children}
    </RNText>
  );
};

const styles = StyleSheet.create({
  base: {
    includeFontPadding: false, // Android
  },
});