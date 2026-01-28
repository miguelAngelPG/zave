/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,

    // BNA UI / Semantic Colors
    primary: '#0F172A', // Slate 900
    primaryForeground: '#F8FAFC', // Slate 50
    secondary: '#F1F5F9', // Slate 100
    secondaryForeground: '#0F172A',
    destructive: '#EF4444', // Red 500
    destructiveForeground: '#F8FAFC',
    muted: '#F1F5F9',
    mutedForeground: '#64748B',
    accent: '#F1F5F9',
    accentForeground: '#0F172A',
    popover: '#FFFFFF',
    popoverForeground: '#0F172A',
    card: '#FFFFFF',
    cardForeground: '#0F172A',
    border: '#E2E8F0', // Slate 200
    input: '#E2E8F0',
    ring: '#0F172A',

    // Custom utility colors used in Button.tsx
    red: '#EF4444',
    green: '#22C55E',
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,

    // BNA UI / Semantic Colors
    primary: '#F8FAFC', // Slate 50
    primaryForeground: '#0F172A', // Slate 900
    secondary: '#1E293B', // Slate 800
    secondaryForeground: '#F8FAFC',
    destructive: '#7F1D1D', // Red 900
    destructiveForeground: '#F8FAFC',
    muted: '#1E293B',
    mutedForeground: '#94A3B8',
    accent: '#1E293B',
    accentForeground: '#F8FAFC',
    popover: '#020817', // Slate 950
    popoverForeground: '#F8FAFC',
    card: '#020817',
    cardForeground: '#F8FAFC',
    border: '#1E293B', // Slate 800
    input: '#1E293B',
    ring: '#F8FAFC',

    // Custom utility colors used in Button.tsx
    red: '#EF4444',
    green: '#22C55E',
  },
};
